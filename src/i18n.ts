// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from 'locale/en.json';
import bnTranslations from 'locale/bn.json';
import bangla from 'locale/bangla.json';
import english from 'locale/english.json';
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: { ...enTranslations, ...english },
    },
    bn: {
      translation: { ...bnTranslations, ...bangla },
    },


    // Add more languages as needed
  },
  lng: 'bn',
  fallbackLng: 'bn',
  interpolation: {
    escapeValue: false,
  },
});


export default i18n;
