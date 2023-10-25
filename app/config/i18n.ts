import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en', // Set the default language
  resources: {
      en: {
        translation: require('../locales/en/translation.json'),
      },
      si: {
        translation: require('../locales/si/translation.json'),
      },
      ta: {
        translation: require('../locales/ta/translation.json'),
      },
    },
  });

export default i18n;


