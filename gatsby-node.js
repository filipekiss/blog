const path = require('path');
const {
    supportedLanguages,
    defaultPostsLanguage,
    languageNameFromCode,
} = require('./i18n');
const _ = require('lodash');

function addCollectionField(node, getNode, createNodeField) {
    const parent = getNode(node.parent);
    createNodeField({
        node,
        name: 'collection',
        value: parent.sourceInstanceName,
    });
}

function addDirectoryField(node, createNodeField) {
    createNodeField({
        node,
        name: 'directoryName',
        value: path.basename(path.dirname(_.get(node, 'fileAbsolutePath'))),
    });
}

function createIndexPages(createPage) {
    Object.keys(supportedLanguages).forEach((langKey) => {
        const pageDetails = {
            path: langKey === 'en' ? '/' : `/${langKey}/`,
            component: path.resolve('./src/templates/post-list.tsx'),
            context: {
                langKey,
            },
        };
        createPage(pageDetails);
    });
}

function addMaybeAbsoluteLinksField(node, createNodeField) {
    const markdown = node.internal.content;
    let maybeAbsoluteLinks = [];
    let linkRe = /\]\((\/[^\)]+)\)/g;
    let match = linkRe.exec(markdown);
    while (match != null) {
        maybeAbsoluteLinks.push(match[1]);
        match = linkRe.exec(markdown);
    }
    const foundLinks = _.uniq(maybeAbsoluteLinks);
    createNodeField({
        node,
        name: 'maybeAbsoluteLinks',
        value: foundLinks.length > 0 ? foundLinks : [''],
    });
}

function getTranslations(post, allTranslations) {
    const availableTranslations =
        allTranslations[_.get(post, 'node.fields.directoryName')] || [];

    availableTranslations.sort((a, b) =>
        languageNameFromCode(a) < languageNameFromCode(b) ? -1 : 1
    );

    availableTranslations.push(defaultPostsLanguage);

    const translations = availableTranslations.reduce((result, translation) => {
        const postSlug = post.node.fields.slug;
        const postLang = post.node.fields.langKey;
        const rawSlug = postSlug.replace(`/${postLang}`, '');
        if (translation === defaultPostsLanguage) {
            result[translation] = rawSlug;
            return result;
        }
        result[translation] = `/${translation}${rawSlug}`;
        return result;
    }, {});

    return translations;
}

exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions;
    if (_.get(node, 'internal.type') === 'MarkdownRemark') {
        addCollectionField(node, getNode, createNodeField);
        addDirectoryField(node, createNodeField);
        addMaybeAbsoluteLinksField(node, createNodeField);
    }
};

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;

    return new Promise((resolve, reject) => {
        createIndexPages(createPage);

        resolve(
            graphql(
                `
                    {
                        allMarkdownRemark(
                            filter: {frontmatter: {published: {eq: true}}}
                            sort: {fields: [frontmatter___date], order: DESC}
                            limit: 1000
                        ) {
                            edges {
                                node {
                                    fields {
                                        slug
                                        langKey
                                        directoryName
                                        collection
                                    }
                                    frontmatter {
                                        title
                                    }
                                }
                            }
                        }
                    }
                `
            ).then((result) => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                    return;
                }

                // Create blog posts pages.
                const blogPostTemplate = path.resolve(
                    './src/templates/post-single.tsx'
                );
                const posts = _.get(result, 'data.allMarkdownRemark.edges');

                const allTranslations = _.reduce(
                    posts,
                    (result, post) => {
                        const directoryName = _.get(
                            post,
                            'node.fields.directoryName'
                        );
                        const langKey = _.get(post, 'node.fields.langKey');

                        if (directoryName && langKey && langKey !== 'en') {
                            (
                                result[directoryName] ||
                                (result[directoryName] = [])
                            ).push(langKey);
                        }

                        return result;
                    },
                    {}
                );

                const defaultLangPosts = posts.filter(
                    ({node}) => node.fields.langKey === 'en'
                );
                _.each(defaultLangPosts, (post, index) => {
                    const previousPost =
                        index === defaultLangPosts.length - 1
                            ? null
                            : defaultLangPosts[index + 1].node;
                    const nextPost =
                        index === 0 ? null : defaultLangPosts[index - 1].node;

                    createPage({
                        path: _.get(post, 'node.fields.slug'),
                        component: blogPostTemplate,
                        context: {
                            slug: post.node.fields.slug,
                            previousPost,
                            nextPost,
                            translations: getTranslations(
                                post,
                                allTranslations
                            ),
                        },
                    });
                });

                const otherLangPosts = posts.filter(
                    ({node}) => node.fields.langKey !== 'en'
                );

                _.each(otherLangPosts, (post) => {
                    createPage({
                        path: post.node.fields.slug,
                        component: blogPostTemplate,
                        context: {
                            slug: post.node.fields.slug,
                            translations: getTranslations(
                                post,
                                allTranslations
                            ),
                        },
                    });
                });
            })
        );
    });
};
