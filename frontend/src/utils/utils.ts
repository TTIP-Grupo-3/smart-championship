export const getInitials = (sentence: string): string =>
  sentence.replace(/[A-Za-z]+/g, (match) => match.trim()[0]);

export const containsOnlyNumbers = (str: string) => {
  return /^\d+$/.test(str);
};

export const isStatusMatch = (status: string, statusCompare: string) => {
  return status === statusCompare;
};
export const delay = async (time: number) => new Promise((res) => setTimeout(res, time));

export const onlyText = (text: string) => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(text);
};
