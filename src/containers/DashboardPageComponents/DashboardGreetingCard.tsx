// src/containers/DashboardPageComponents/DashboardGreetingCard.tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  currentTime: Date;
  getTimeOfDay: () => string;
}

export default function DashboardGreetingCard({
  name,
  currentTime,
  getTimeOfDay,
}: Props) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-3xl w-full mx-auto border border-gray-200 dark:border-gray-700">
      <h1 className="text-4xl font-extrabold mb-4 dark:text-white">
        {t("welcome", {
           timeOfDay: t(`timeOfDay.${getTimeOfDay()}`),
           name: name || t("dashboard.user"),
        })}
      </h1>


      <p className="text-gray-500 dark:text-gray-400 text-lg">
        {t("dashboard.currentTime")}{" "}
        <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
      </p>
    </motion.div>
  );
}
