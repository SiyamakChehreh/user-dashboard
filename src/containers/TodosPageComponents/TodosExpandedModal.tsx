import { useTranslation } from "react-i18next";
import Modal from "@/components/Modal";
import { X } from "lucide-react";

type TodoWithDetails = {
  note?: string;
  date?: string;
  time?: string;
  id: string
  text: string
  done: boolean;

};  

export default function TodosExpandedModal({
  todo,
  isRTL,
  onClose
}: {
  todo: TodoWithDetails;
  isRTL: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose} className="max-w-2xl">
      <button
        className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} text-gray-600 dark:text-gray-300`}
        onClick={onClose}>
        <X />
      </button>

      <h2 className="font-bold text-xl mb-4 dark:text-white">{todo.text}</h2>

      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {todo.date} {todo.time && `| ${todo.time}`}
      </div>

      <div className="text-gray-800 dark:text-gray-200">
        {todo.note || t("todos.noNote")}
      </div>
    </Modal>
  );
}
