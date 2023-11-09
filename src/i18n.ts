// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcomeMessage: 'Welcome to CLMS',
        login: 'Login',
        // Add more translation key-value pairs as needed
      },
    },
    it: {
      translation: {
        welcomeMessage: 'Benvenuto in CLMS',
        login: 'Accesso',
        // Add Italian translations here
      },
    },
    // Add more languages as needed
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
