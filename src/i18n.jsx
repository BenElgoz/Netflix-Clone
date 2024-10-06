import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './i18n/en.json';
import translationFR from './i18n/fr.json';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
