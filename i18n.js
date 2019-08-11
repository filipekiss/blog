// Please keep keys lowercase!
const supportedLanguages = {
    en: 'English',
    'pt-br': 'Português',
};

const viewAllPostsFormats = {
    en: 'View all posts available in :language',
    'pt-br': 'Ver todos os posts disponíveis em :language',
};

const postTranslatedByFormats = {
    en: 'This post was translated by :name',
    'pt-br': 'Esse post foi traduzido por :name',
};

const postTranslatedBy = (langKey, name) => {
    const languageString = postTranslatedByFormats[langKey];
    if (languageString === undefined) {
        throw new Error(`Invalid translation author language: ${langKey}`);
    }
    return languageString.replace(':name', name);
};

const viewAllPosts = (langKey) => {
    const languageString = viewAllPostsFormats[langKey];
    if (languageString === undefined) {
        throw new Error(`Invalid translation language: ${langKey}`);
    }
    return languageString.replace(':language', languageNameFromCode(langKey));
};

// Do not edit below this line
const defaultPostsLanguage = 'en';
const languageNameFromCode = (langKey) => supportedLanguages[langKey];

exports.supportedLanguages = supportedLanguages;
exports.defaultPostsLanguage = defaultPostsLanguage;
exports.languageNameFromCode = languageNameFromCode;
exports.viewAllPosts = viewAllPosts;
exports.postTranslatedBy = postTranslatedBy;
