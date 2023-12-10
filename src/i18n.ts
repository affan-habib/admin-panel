import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from 'locale/en.json';
import bnTranslations from 'locale/bn.json';
import bangla from 'locale/bangla.json';
import english from 'locale/english.json';

const changeLanguage = (newLanguage:any) => {
  i18n.changeLanguage(newLanguage, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
  });
};

i18n
  .use(initReactI18next)
  .init({
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

// Add useEffect to handle language change
i18n.on('languageChanged', (newLang) => {
  // You can perform additional actions when the language changes
  console.log(`Language changed to ${newLang}`);
});

export { changeLanguage };
