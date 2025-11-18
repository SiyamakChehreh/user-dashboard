import { useTranslation } from "react-i18next";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

type Props = {
  onCancel: () => void;
  onDelete: () => void;
  slideDirection: {
    x: number,
    opacity: number,
  };
};

export default function TodosDeleteModal({ onCancel, onDelete, slideDirection }: Props) {
  const { t } = useTranslation();

  return (
    <Modal onClose={onCancel} slideDirection={slideDirection} className="max-w-md">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        {t("todos.confirmDelete")}
      </h2>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>{t("todos.cancel")}</Button>
        <Button variant="danger" onClick={onDelete}>{t("todos.delete")}</Button>
      </div>
    </Modal>
  );
}
