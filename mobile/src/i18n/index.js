import i18n from 'i18n-js';

import en from './en.json';
import tr from './tr.json';


const availableTranslations = {
    tr,
    en
};


i18n.locale = 'tr';
i18n.fallbacks = true;
i18n.translations = availableTranslations;

export default i18n;

export const setLanguage = (lang) => {
    if (availableTranslations[lang]) i18n.locale = lang;
}
