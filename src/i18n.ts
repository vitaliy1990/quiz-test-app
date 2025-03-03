import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { QUIZ_LANGUAGE } from './const';
import de from '../locales/de.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';

const lng = localStorage.getItem(QUIZ_LANGUAGE) || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
    fr: { translation: fr },
    es: { translation: es },
  },
  lng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
