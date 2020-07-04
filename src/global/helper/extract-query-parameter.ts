import memoizeOne from "memoize-one";
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

export const getMemoizedIdFunction: () => (
  searchString?: string
) => string | undefined = () =>
  memoizeOne((searchString?: string): string => {
    if (!searchString) {
      console.warn("No seach data found in props!");
    }

    return !!searchString
      ? extractQueryParameter(searchString, "id")
      : undefined;
  });
