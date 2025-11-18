import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/SideBar.tsx';
import Dashboard from '@/pages/Dashboard';
import Todos from '@/pages/Todos';
import Weather from '@/pages/Weather';
import Profile from '@/pages/Profile';
import useTheme from '@/hooks/useTheme';
import {APP_STRINGS} from '@/constants/appString.tsx'
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function App() {
  useTheme();

  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;


    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);


  return (
    <Router>
      <div className="flex bg-fuchsia-100 dark:bg-cyan-800">
        <Sidebar />
        <div className="flex-1 min-h-screen">
          <Routes>
            <Route path={APP_STRINGS.dashboardPath} element={<Dashboard />} />
            <Route path={APP_STRINGS.TodosPath} element={<Todos />} />
            <Route path={APP_STRINGS.weatherPath} element={<Weather />} />
            <Route path={APP_STRINGS.profilePath} element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
