import { Translations } from '../types';

export const isValidLanguage = (lang: string | undefined): boolean => {
  return !!lang && Object.values(Translations).includes(lang as Translations);
};
