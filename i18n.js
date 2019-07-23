// Please keep keys lowercase!
const supportedLanguages = {
    en: 'English',
    'pt-br': 'Português',
    fr: 'French',
    nl: 'Dutch',
};

// Do not edit below this line
const defaultPostsLanguage = 'en';
const languageNameFromCode = (langKey) => supportedLanguages[langKey];

exports.supportedLanguages = supportedLanguages;
exports.defaultPostsLanguage = defaultPostsLanguage;
exports.languageNameFromCode = languageNameFromCode;
