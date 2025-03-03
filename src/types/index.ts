export type QuizAnswer = {
  quizId: number;
  title: string;
  type: QuizType;
  answer: Answer[];
};

export type Answer = {
  id: string;
  options: string;
};

export type QuizData = {
  quizId: number;
  type: QuizType;
  translations: Record<Translations, TranslationData>;
};

export type TranslationData = {
  title: string;
  description: string;
  options: QuizOption[];
};

export type QuizOption = {
  id: string;
  label: string;
  image: string;
};

export type DownloadFile = {
  data: string;
  fileName: string;
  fileType: string;
};

export enum Translations {
  EN = 'en',
  FR = 'fr',
  DE = 'de',
  ES = 'es',
}

export enum QuizType {
  SINGLE_SELECT = 'single-select',
  SINGLE_SELECT_IMAGE = 'single-select-image',
  MULTIPLE_SELECT = 'multiple-select',
  BUBBLE = 'bubble',
}

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonSize = 'small' | 'medium' | 'large' | 'default';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'transparent'
  | 'ghost';
