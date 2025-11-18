import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { SIDEBAR_STRINGS } from '@/constants/sideBarStrings';
import { motion, AnimatePresence } from 'framer-motion';
import {ChevronRight, ChevronLeft, Home, ListTodo, CloudSun, User } from 'lucide-react';

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const links = [
    { name: "dashboard.title", path: SIDEBAR_STRINGS.sidebarDashboardPath , icon: <Home size={25} /> },
    { name: "todos.title", path: SIDEBAR_STRINGS.sidebarTodosPath , icon: <ListTodo size={25} /> },
    { name: "weather.title", path: SIDEBAR_STRINGS.sidebarWeatherPath , icon: <CloudSun size={25} /> },
    { name: "profile.title", path: SIDEBAR_STRINGS.sidebarProfilePath, icon: <User size={25} /> },
  ];

  const isRTL = i18n.language === "fa";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setOpen(false);
      else setOpen(true);
    };

    window.addEventListener(SIDEBAR_STRINGS.sidebarResize, handleResize);
    handleResize();
    return () => window.removeEventListener(SIDEBAR_STRINGS.sidebarResize, handleResize);
  }, []);

  return (
    <div className="relative z-10">

      {!isMobile && (
        <div
          onClick={() => setOpen(!open)}
          className={`
            absolute top-1/2 -translate-y-1/2 h-36 w-5 z-30 cursor-pointer
            bg-cyan-600 hover:bg-cyan-700 dark:bg-slate-400 rounded-full flex items-center justify-center shadow-md
            ${isRTL ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"}
          `}
        >
          {isRTL
            ? (open ? <ChevronRight size={20} className="text-white" /> : <ChevronLeft size={20} className="text-white" />)
            : (open ? <ChevronLeft size={20} className="text-white" /> : <ChevronRight size={20} className="text-white" />)
          }
        </div>
      )}

      <motion.div
        animate={{ width: open ? 240 : 70 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-slate-200 dark:bg-slate-800 dark:text-white rounded-2xl m-4 border-2 border-cyan-600 p-4 flex flex-col gap-4 relative overflow-visible">
        {links.map((link) => (
          <div
            key={link.name}
            className="relative"
            onMouseEnter={() => !open && setHovered(link.name)}
            onMouseLeave={() => setHovered(null)}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded transition
                hover:bg-gray-300 dark:hover:bg-gray-700
                ${isActive ? "bg-gray-300 dark:bg-gray-700 font-bold" : ""}`
              }>
              <span className="min-w-[24px] text-center">{link.icon}</span>
              {open && <span className="text-xl">{t(link.name)}</span>}
            </NavLink>

            <AnimatePresence>
              {!open && hovered === link.name && (
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    absolute top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl shadow-lg
                    bg-gray-900 text-white text-md z-50
                    w-40 text-center
                    ${isRTL ? "right-full mr-2" : "left-full ml-2"}
                  `}>
                  {t(link.name)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
