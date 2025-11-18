import { useTranslation } from "react-i18next";
import Modal from "@/components/Modal";

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function DashboardModalName({ show, onClose }: Props) {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {t("dashboard.setProfileNameTitle")}
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          {t("dashboard.setProfileNameMessage")}
        </p>

        <button
          onClick={onClose}
          className="self-end bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
          {t("dashboard.gotIt")}
        </button>
      </div>
    </Modal>
  );
}
