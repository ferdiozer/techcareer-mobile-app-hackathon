import i18n from 'i18n-js';

import { NativeModules, Platform } from 'react-native';

import en from './en.json';
import tr from './tr.json';

import moment from 'moment'



const availableTranslations = {
    tr,
    en
};


//i18n.locale = 'tr';
i18n.fallbacks = true;
i18n.translations = availableTranslations;


const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
console.log("locale:",locale.substring(0, 2));
      i18n.locale = locale

      if(locale.substring(0, 2)=="tr"){
        moment.locale('tr')
      }else{
        moment.locale('en')
      }






export const setLanguage = (lang) => {
    console.log("setLanguage: ",lang)
    if (availableTranslations[lang]){
        i18n.translations = {
            [lang]: availableTranslations[lang]
        };
        i18n.locale = lang;
    } 
}
export default i18n;
