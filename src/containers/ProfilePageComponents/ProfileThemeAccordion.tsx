import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useTranslation } from "react-i18next";
import { PROFILE_STRINGS } from "@/constants/profileStrings";

interface Props {
  open: boolean;
  gradientClass: string;
  onToggle: () => void;
  onSelect: (value: "light" | "dark") => void;
}

export default function ProfileThemeAccordion({
  open,
  gradientClass,
  onToggle,
  onSelect,
}: Props) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden cursor-pointer",
        `bg-gradient-to-r ${gradientClass} bg-[length:200%_200%] animate-gradient-x`
      )}>
      <div className="flex justify-between items-center p-4" onClick={onToggle}>
        <span className="font-medium text-black">{t("profile.theme")}</span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block text-white hover:translate-y-1">
          ▼
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={PROFILE_STRINGS.profileTheme}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col px-4 pb-4 gap-2">
            <button
              className="text-black p-2 rounded hover:bg-white/20"
              onClick={() => onSelect("light")}>
              {t("profile.light")}
            </button>

            <button
              className="text-black p-2 rounded hover:bg-white/20"
              onClick={() => onSelect("dark")}>
              {t("profile.dark")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
