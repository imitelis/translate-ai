// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export const languages = ["en", "es"];

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

export interface LanguageDetectionInput {
  path: string;
}

export const detectLanguage = ({ path }: LanguageDetectionInput) => {
  const parts = path.split("/");
  let htmlLang = parts[parts.length - 1];
  htmlLang = htmlLang === "" ? parts[parts.length - 2] : htmlLang;

  let language;
  if (languages.includes(htmlLang)) {
    language = htmlLang;
    i18n.changeLanguage(language);
  } else {
    language = "en";
  }

  return language;
};

export interface LanguageLocationInput {
  path: string;
  location: string;
}

export const isLocated = ({ path, location }: LanguageLocationInput) => {
  return (
    path === `${location}` ||
    path === `${location}/` ||
    languages.some((lang) => path === `${location}/${lang}`) ||
    languages.some((lang) => path === `${location}/${lang}/`)
  );
};

export default i18n;
