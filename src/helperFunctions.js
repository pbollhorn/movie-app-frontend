import languages from "./assets/Languages.json";

export function getLanguageNameFromCode(code) {
  return languages.find((lang) => lang.iso_639_1 == code).english_name;
}
