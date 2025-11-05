import Button from "./Buttons";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}
export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button variant="secondary" onClick={onToggle} aria-label="Toggle theme">
      {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </Button>
  );
}
