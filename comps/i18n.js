import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import TranslationEN from "../pages/locale/en.json";
import TranslationAR from "../pages/locale/ar.json";

const resources = {
  en: {
    translation: TranslationEN,
  },
  ar: {
    translation: TranslationAR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

module.exports = {
  i18n,
};

// export default i18n;
