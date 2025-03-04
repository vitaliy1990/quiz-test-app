import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { QUIZ_LANGUAGE } from '../const';
import { Translations } from '../types';
import useLocalStorage from './useLocalStorage';
import { isValidLanguage } from '../utils/language';

export const useLanguage = () => {
  const { set, get } = useLocalStorage(QUIZ_LANGUAGE, Translations.EN);
  const { i18n } = useTranslation();

  const setLanguage = useCallback(
    (lang: string) => {
      if (isValidLanguage(lang)) {
        set(lang as Translations);
        i18n.changeLanguage(lang);
      }
    },
    [i18n, set]
  );

  const language = get();

  return { language, setLanguage };
};
