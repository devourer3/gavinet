import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../lang/en.json';
import ko from '../lang/ko.json';

const resources = {
  en: {
    translation: en
  },
  ko: {
    translation: ko
  }
};

i18next.use(initReactI18next)
  .init({
    resources: resources,
    lng: "ko",
    fallbackLng: 'ko',
    // ns: ['translation'],
    // defaultNS: "translation",
    debug: true,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false
    } // react already safes from xss
  });

export default i18next;
