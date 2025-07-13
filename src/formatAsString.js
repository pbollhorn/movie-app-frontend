import languages from "./assets/Languages.json";

function languageAsString(code) {
  const languageName = languages.find(
    (lang) => lang.iso_639_1 == code
  ).english_name;

  return code + " (" + languageName + ")";
}

function scoreAsString(score) {
  if (score === null) {
    return "";
  }
  return score.toFixed(1) + "/10";
}

function genresAsString(genres) {
  return genres.join(", ");
}

function dateAsString(date) {
  const [year, month, day] = date;

  // Pad month and day with leading zeros if needed
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");

  return `${year}-${mm}-${dd}`;
}

function runtimeAsString(runtime) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  let result = "";
  if (hours > 0) {
    result += `${hours}h `;
  }
  result += `${minutes}m`;

  return result;
}

export default {
  languageAsString,
  scoreAsString,
  genresAsString,
  dateAsString,
  runtimeAsString,
};
