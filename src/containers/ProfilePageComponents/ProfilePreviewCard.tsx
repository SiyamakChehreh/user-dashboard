import Button from "@/components/Button";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  theme: string;
  language: string;
  onSubmit: () => void;
}

export default function ProfilePreviewCard({
  name,
  theme,
  language,
  onSubmit,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
      <h2 className="text-xl font-semibold dark:text-white">
        {t("profile.title")}
      </h2>

      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-medium">{t("profile.name")}:</span>{" "}
        {name || t("profile.namePlaceholder")}
      </p>

      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-medium">{t("profile.theme")}:</span> {theme}
      </p>

      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-medium">{t("profile.language")}:</span> {language}
      </p>

      <p className="text-md text-red-800 dark:text-yellow-400 mt-2">
        {t("profile.pendingChangesNotice")}
      </p>

      <Button
        variant="primary"
        onClick={onSubmit}
        className="self-start px-3 py-2 mt-3 bg-cyan-500 text-white text-sm rounded-lg font-medium hover:bg-cyan-600 transition">
        {t("profile.saveChanges")}
      </Button>
    </div>
  );
}
