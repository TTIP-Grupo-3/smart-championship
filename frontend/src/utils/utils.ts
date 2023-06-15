export const getInitials = (sentence: string): string =>
  sentence.replace(/[A-Za-z]+/g, (match) => match.trim()[0]);
