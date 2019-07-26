const path = require("path")
const fs = require("fs")
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
  if (node.fields.collection) {
    slug = `/${node.fields.collection}${slug}`
  }
  createNodeField({
    node,
    name: `slug`,
    value: `${slug}`,
  })
}

const resolveComponentFilePath = node => {
  const defaultComponent = path.resolve("./src/templates/index.tsx")
  const collectionName = node.fields.collection
  const customComponent = path.resolve(
    `./src/templates/collection-${collectionName}.tsx`
  )
  if (fs.existsSync(customComponent)) {
    return customComponent
  }
  return defaultComponent
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    addCollectionField(node, getNode, createNodeField)
    addSlugField(node, getNode, createNodeField)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      query {
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
      const component = resolveComponentFilePath(node)
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
