import useLocalStorage from '../hooks/useLocalStorage';
import { QuizAnswer } from '../types';

export const updateQuizAnswers = (
  quizId: number,
  items: string | string[],
  localStorage: ReturnType<typeof useLocalStorage<QuizAnswer[]>>
) => {
  const answers = localStorage.get();
  const answerIndex = answers.findIndex((item) => +item.quizId === +quizId);

  if (answerIndex !== -1) {
    answers[answerIndex].options = items;
  } else {
    answers.push({ quizId, options: items });
  }

  localStorage.set(answers);
};
