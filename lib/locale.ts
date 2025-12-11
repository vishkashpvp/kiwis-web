// default can later be changed to whatever user selects
let currentLocale = "en-IN";

export function getLocale() {
  return currentLocale;
}

export function setLocale(locale: string) {
  currentLocale = locale;
}
