import useLocalStorage from '../hooks/useLocalStorage';
import { Answer, QuizAnswer } from '../types';

export const updateQuizAnswers = (
  answer: {
    quizId: number;
    answer: Answer[];
  },
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
