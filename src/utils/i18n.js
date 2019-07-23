import {supportedLanguages} from '../../i18n';

export const defaultLanguage = 'en';
export const languageNameFromCode = (code) =>
    supportedLanguages[code].replace(/ /g, ' ');
