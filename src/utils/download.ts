import { DownloadFile, QuizAnswer } from '../types';

export const downloadFile = (fileDescription: DownloadFile) => {
  const { data, fileName, fileType } = fileDescription;
  const blob = new Blob([data], { type: fileType });

  const linkElement = document.createElement('a');
  linkElement.download = fileName;
  linkElement.href = URL.createObjectURL(blob);

  linkElement.click();
  linkElement.remove();
  URL.revokeObjectURL(linkElement.href);
};

export const exportToCsv = (quizzes: Array<QuizAnswer>) => {
  const headers = ['Order, Title, Type, Answer'];

  const quizzesCsv = quizzes.map((quiz, index) => {
    const { answer, title, type } = quiz;
    const answerText = answer.map((item) => item.options).join('; ');

    return `${index + 1}, ${title}, ${type}, ${answerText}`;
  });

  downloadFile({
    data: [...headers, ...quizzesCsv].join('\n'),
    fileName: 'quizzes.csv',
    fileType: 'text/csv',
  });
};
