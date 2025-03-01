import { useCallback } from 'react';

import { QUIZ_LANGUAGE } from '../const';
import { Translations } from '../types';
import useLocalStorage from './useLocalStorage';
import { isValidLanguage } from '../utils/language';

export const useLanguage = () => {
  const { set, get } = useLocalStorage(QUIZ_LANGUAGE, Translations.EN);

  const setLanguage = useCallback((lang: string) => {
    if (isValidLanguage(lang)) {
      set(lang as Translations);
    }
  }, []);

  const language = get();

  return { language, setLanguage };
};
