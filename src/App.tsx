import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserDetails from "./pages/UserDetail.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";
import { loadJSON, saveJSON } from "./utils/storage";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    loadJSON(import.meta.env.VITE_THEME_KEY || "light")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    saveJSON(import.meta.env.VITE_THEME_KEY, theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold font-oswald">
          User Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </main>
    </div>
  );
}
