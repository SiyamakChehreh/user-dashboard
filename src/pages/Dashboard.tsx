import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import DashboardModalName from "@/containers/DashboardPageComponents/DashboardModalName";
import DashboardGreetingCard from "@/containers/DashboardPageComponents/DashboardGreetingCard";

export default function Dashboard() {
  const [name] = useLocalStorage("name", "");
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      const timer = setTimeout(() => setShowModal(true), 300); 
      return () => clearTimeout(timer);
    }
  }, [name]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeOfDay = useCallback(() => {
  const hour = currentTime.getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}, [currentTime]);

  return (
    <div className="p-8 flex flex-col gap-6 min-h-screen transition-colors duration-300">
      <DashboardModalName show={showModal} onClose={() => setShowModal(false)} />

      <DashboardGreetingCard
        name={name}
        currentTime={currentTime}
        getTimeOfDay={getTimeOfDay}/>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <motion.div
          className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-100 p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          whileHover={{ scale: 1.03 }}
          onClick={() => navigate("/profile")} >
          <h3 className="font-semibold text-xl mb-2">{t("dashboard.quickLinks.profile")}</h3>
          <p className="text-gray-700 dark:text-gray-300">{t("dashboard.quickLinks.profileDesc")}</p>
        </motion.div>

        <motion.div
          className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          whileHover={{ scale: 1.03 }}
          onClick={() => navigate("/todos")} >
          <h3 className="font-semibold text-xl mb-2">{t("dashboard.quickLinks.todos")}</h3>
          <p className="text-gray-700 dark:text-gray-300">{t("dashboard.quickLinks.todosDesc")}</p>
        </motion.div>
      </div>
    </div>
  );
}
