import {Link} from 'gatsby';
import React, {Fragment, ReactElement} from 'react';
import {defaultPostsLanguage, languageNameFromCode} from '../../../i18n';

interface IProps {
    post: IPost;
    translations: {
        [langKey: string]: string;
    };
}

const createTranslationLink = (
    languageCode: string,
    url: string,
    showSeparator: boolean
) => {
    return (
        <Fragment key={languageCode}>
            <Link className="ml-2" to={url}>
                {languageNameFromCode(languageCode)}
            </Link>{' '}
            {showSeparator && '·'}
        </Fragment>
    );
};

const translationDisclaimer = (originalPost: string, langKey: string) => (
    <div className="m-4">
        <Link to={originalPost}>Read the original</Link> &middot;{' '}
        <Link to={`/${langKey}/`}>
            View all posts available in {languageNameFromCode(langKey)}
        </Link>
    </div>
);

export const TranslationList = (props: IProps): ReactElement | null => {
    const {translations, post} = props;
    const isDefaultLanguage = post.fields.langKey === defaultPostsLanguage;
    const otherLanguages = Object.entries(translations).filter(
        ([langKey]) => langKey !== defaultPostsLanguage
    );
    // If no other languages are available, show nothing
    if (otherLanguages.length < 1) {
        return null;
    }
    const enabledTranslations = Object.fromEntries(otherLanguages);
    return (
        <div className="rounded bg-gray-100 p-4 my-8">
            <div className="m-4">
                Translations Available:{' '}
                {Object.entries(enabledTranslations).map(
                    ([languageCode, url], index: number) => {
                        return createTranslationLink(
                            languageCode,
                            url,
                            index !== Object.keys(otherLanguages).length - 1
                        );
                    }
                )}
            </div>
            <div>
                {' '}
                {!isDefaultLanguage &&
                    translationDisclaimer(
                        translations[defaultPostsLanguage],
                        post.fields.langKey
                    )}
            </div>
        </div>
    );
};
