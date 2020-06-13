export const extractQueryParameter = (
  queryString: string,
  key: string
): string | undefined => {
  const cleanedQueryString = queryString.replace("?", "");
  const splitStrings = cleanedQueryString.split("&&");

  let result: string | undefined = undefined;
  splitStrings.forEach((splitString: string): void => {
    const keyValuePair = splitString.split("=");
    if (keyValuePair[0] === key) {
      result = keyValuePair[1];
    }
  });

  return result;
};
