import { QUIZ_LANGUAGE } from '../const';
import useLocalStorage from '../hooks/useLocalStorage';
import { Answer, QuizAnswer, QuizData, Translations } from '../types';

export const updateQuizAnswers = (
  answer: QuizAnswer,
  localStorage: ReturnType<typeof useLocalStorage<QuizAnswer[]>>
) => {
  const answers = localStorage.get();
  const answerIndex = answers.findIndex(
    (item) => +item.quizId === +answer.quizId
  );

  if (answerIndex !== -1) {
    answers[answerIndex] = answer;
  } else {
    answers.push(answer);
  }

  localStorage.set(answers);
};

export const createQuizAnswers = (answer: string, id: string): Answer => ({
  id,
  options: answer,
});

export const createQuizAnswerData = (
  quizData: QuizData,
  answer: Answer[]
): QuizAnswer => {
  const languageStore = localStorage.getItem(QUIZ_LANGUAGE) || '';
  const language = JSON.parse(languageStore) || Translations.EN;

  const { quizId, type, translations } = quizData;
  const { title } = translations[language as Translations];

  const quizAnswer: QuizAnswer = {
    quizId,
    type,
    title,
    answer,
  };

  if (quizId === 1) {
    const lng = answer[0].id as Translations;
    const currentTranslations = translations[lng];

    quizAnswer.title = currentTranslations?.title || title;

    const label = currentTranslations?.options.find(
      (item) => item.id === lng
    )?.label;

    const currentLabel = label || quizAnswer.answer[0].options;

    quizAnswer.answer[0].options = currentLabel;
  }

  return quizAnswer;
};
