import languages from "./assets/Languages.json";

export function getLanguageNameFromCode(code) {
  return languages.find((lang) => lang.iso_639_1 == code).english_name;
}

export function scoreAsString(score) {
  if (score === null) {
    return "";
  }
  return score.toFixed(1) + "/10";
}

export function genresAsString(genres) {
  return genres.join(", ");
}
