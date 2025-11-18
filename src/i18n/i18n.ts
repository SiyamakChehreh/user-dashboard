import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fa from "./fa.json";

function loadSavedLanguage() {
  try {
    const raw = localStorage.getItem("language");
    return raw ? JSON.parse(raw) : "en";
  } catch {
    return "en";
  }
}

const savedLanguage = loadSavedLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fa: { translation: fa }
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

document.documentElement.dir = savedLanguage === "fa" ? "rtl" : "ltr";

export default i18n;
