export default function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="px-2 py-1 font-oswald font-bold rounded-md border-2 border-gray-500 dark:border-amber-300 hover:scale-[1.15] transition-transform duration-600"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
