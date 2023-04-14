import { GenericDictionary } from "@/constant/constant";

export const replaceString = (
  text: string,
  tokenDict: GenericDictionary
): string => {
  Object.keys(tokenDict).forEach((key) => {
    text = text.replace("{" + key + "}", tokenDict[key].toString());
  });
  return text;
};
