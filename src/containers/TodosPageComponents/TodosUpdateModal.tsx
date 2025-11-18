import { useTranslation } from "react-i18next";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import type { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  note: string;
  date: string;
  time: string;
  setNote: (v: string) => void;
  setDate: (v: string) => void;
  setTime: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
  slideDirection: {
    x: number,
    opacity: number,
  };
};

export default function TodosUpdateModal({
  todo,
  note,
  date,
  time,
  setNote,
  setDate,
  setTime,
  onSave,
  onClose,
  slideDirection
}: Props) {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose} slideDirection={slideDirection} className="max-w-2xl">
      <h2 className="text-xl font-bold mb-4 dark:text-white">{todo.text}</h2>

      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        className="border p-2 w-full mb-2 dark:bg-gray-700 dark:text-white rounded"
        placeholder={t("todos.note")}/>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="border p-2 w-full mb-2 dark:bg-gray-700 dark:text-white rounded"/>

      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        className="border p-2 w-full mb-4 dark:bg-gray-700 dark:text-white rounded"/>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>{t("todos.cancel")}</Button>
        <Button variant="primary" onClick={onSave}>{t("todos.save")}</Button>
      </div>
    </Modal>
  );
}
