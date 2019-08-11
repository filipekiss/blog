import React from 'react';
import {postTranslatedBy} from '../../../i18n';

interface IProps {
    language: string;
    translation: ITranslator;
}

export const TranslatedBy = (props: IProps) => {
    const {language, translation: translator} = props;
    let authorUrl = translator.name;
    if (translator.github) {
        authorUrl = `https://github.com/${translator.github}`;
    } else if (translator.twitter) {
        authorUrl = `https://twitter.com/${translator.github}`;
    }
    if (authorUrl) {
        authorUrl = `<a href="${authorUrl}" rel="noopener noreferrer">${translator.name}</a>`;
    }
    return (
        <div
            className="m-4"
            dangerouslySetInnerHTML={{
                __html: postTranslatedBy(language, authorUrl),
            }}
        />
    );
};

export default TranslatedBy;
