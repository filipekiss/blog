declare module '*.css';
declare module '*.svg';
declare module '*.png';

declare module '*/i18n' {
    function languageNameFromCode(langKey: string): string;
    const defaultPostsLanguage: string;
    function viewAllPosts(langKey: string): string;
    function postTranslatedBy(langKey: string, name: string): string;
}

interface ISiteMetaData {
    site: {
        siteMetadata: {
            header: {
                links: HeaderLink[];
            };
            title: string;
            titleTemplate: string;
            description: string;
            image: string;
            siteDomain: string;
            twitterId: string;
            protocol: string;
            social: {
                twitter: {
                    url: string;
                    text: string;
                    username: string;
                };
            };
        };
    };
}

interface IHeaderLink {
    href: string;
    text: string;
    isExternalLink?: boolean;
}

interface IPostUpdate {
    date: string;
    reason: string;
}

interface IPost {
    id: string;
    excerpt: string;
    html: string;
    fields: {
        slug: string;
        langKey: string;
    };
    frontmatter: {
        title: string;
        date: string;
        spoiler?: string;
        translation?: ITranslator;
        updates?: IPostUpdate[];
    };
}

interface ITranslator {
    name: string;
    github?: string;
    twitter?: string;
}

interface ISupportedLanguages {
    [langKey: string]: string;
}

interface IPageContext {
    translations: {
        [langKey: string]: string;
    };
}
