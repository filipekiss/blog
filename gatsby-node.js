const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const addCollectionField = function(node, getNode, createNodeField) {
  const parent = getNode(node.parent)
  createNodeField({
    node,
    name: "collection",
    value: parent.sourceInstanceName,
  })
}

const addSlugField = function(node, getNode, createNodeField) {
  let slug = createFilePath({ node, getNode })
  slug = slug.substring(0, slug.length - 1)
  slug = `${slug}.html`
  createNodeField({
    node,
    name: `slug`,
    value: `${slug}`,
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    console.log(node.frontmatter)
    addCollectionField(node, getNode, createNodeField)
    addSlugField(node, getNode, createNodeField)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                collection
              }
            }
          }
        }
      }
    `
  ).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let component = path.resolve("./src/templates/GenericPage.tsx")
      if (node.fields.collection === "blog") {
        component = path.resolve("./src/templates/BlogPost.tsx")
      }
      createPage({
        path: node.fields.slug,
        component,
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })
}
