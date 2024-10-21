export const generateTranslationKey = (
  errorCode: string,
  location: string,
  type: string
): string => {
  return `${type}.${location}.${errorCode}`;
};
