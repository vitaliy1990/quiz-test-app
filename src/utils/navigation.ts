import { QuizAnswer } from '../types';

export const getNextQuizId = (
  answeredQuiz: QuizAnswer[],
  quizId: number,
  quizCount: number
) => {
  const lastQuizId =
    answeredQuiz.length > 0 ? answeredQuiz[answeredQuiz.length - 1].quizId : 0;

  if (quizId <= lastQuizId) {
    return quizId || 1;
  }

  return Math.min(lastQuizId + 1 || 1, quizCount);
};
