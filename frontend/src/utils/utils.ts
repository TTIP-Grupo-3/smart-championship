export const getInitials = (sentence: string): string =>
  sentence.replace(/[A-Za-z]+/g, (match) => match.trim()[0]);

export const containsOnlyNumbers = (str: string) => {
  return /^\d+$/.test(str);
};

export const isStatusMatch = (status: string, statusCompare: string) => {
  return status === statusCompare;
};
