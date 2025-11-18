import { useState } from "react";
import { useTranslation } from "react-i18next";
import useTheme from "@/hooks/useTheme";
import useLocalStorage from "@/hooks/useLocalStorage";
import { PROFILE_STRINGS } from "@/constants/profileStrings";
import ProfileThemeAccordion from "@/containers/ProfilePageComponents/ProfileThemeAccordion";
import ProfileLanguageAccordion from "@/containers/ProfilePageComponents/ProfileLanguageAccordion";
import ProfilePreviewCard from "@/containers/ProfilePageComponents/ProfilePreviewCard";


export default function Profile() {
  const { theme: currentTheme, setTheme: setAppTheme } = useTheme();
  const [storedName, setStoredName] = useLocalStorage("name", "");
  const [storedLanguage, setStoredLanguage] = useLocalStorage(PROFILE_STRINGS.profileLanguage, "en");
  const { t, i18n } = useTranslation();

  const [name, setName] = useState(storedName);
  const [theme, setTheme] = useState(currentTheme);
  const [language, setLanguage] = useState(storedLanguage);

  const [openAccordion, setOpenAccordion] = useState<"theme" | "language" | null>(null);
  const toggleAccordion = (type: "theme" | "language") => {
    setOpenAccordion(openAccordion === type ? null : type);
  };

  const gradientClass = theme === PROFILE_STRINGS.profileLanguage
    ? "from-pink-300 via-purple-300 to-blue-400"
    : "from-cyan-600 via-slate-400 to-indigo-700";

  const handleSubmit = () => {
    setStoredName(name);
    setStoredLanguage(language);
    setAppTheme(theme);
    i18n.changeLanguage(language);
  };

  const handleThemeSelect = (value: "light" | "dark") => {
    setTheme(value);
    setOpenAccordion(null);
  };

  const handleLanguageSelect = (value: "en" | "fa") => {
    setLanguage(value);
    setOpenAccordion(null);
  };

  return (
    <div className="p-8 flex flex-col gap-2 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold dark:text-white">{t("profile.title")}</h1>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700 dark:text-gray-300">{t("profile.name")}</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={t("profile.namePlaceholder")}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>

      <ProfileThemeAccordion
        open={openAccordion === "theme"}
        gradientClass={gradientClass}
        onToggle={() => toggleAccordion("theme")}
        onSelect={handleThemeSelect}
      />

      <ProfileLanguageAccordion
        open={openAccordion === "language"}
        gradientClass={gradientClass}
        onToggle={() => toggleAccordion("language")}
        onSelect={handleLanguageSelect}
      />

      <ProfilePreviewCard
        name={name}
        theme={theme}
        language={language}
        onSubmit={handleSubmit}
      />
    </div>

  );
}
