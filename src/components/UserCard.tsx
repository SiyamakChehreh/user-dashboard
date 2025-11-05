import { useState } from "react";
import type { User } from "../types";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Button from "./Buttons";

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    onDelete(user.id);
    setConfirmOpen(false);
  };

  return (
    <>
      <div className="p-4 bg-white dark:bg-gray-800 border-2 border-cyan-800 hover:scale-[1.03] transition-transform duration-100 rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between gap-2">
        <div>
          <Link
            to={`/user/${user.id}`}
            className="font-semibold hover:underline"
          >
            {user.name}
          </Link>
          <div className="text-sm text-gray-500 dark:text-gray-300 font-nunito font-semibold">
            {user.email}
          </div>
          <div className="text-xs text-gray-400">
            {typeof user.company === "string"
              ? user.company
              : user.company?.name}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setConfirmOpen(true)} variant="danger">
            Delete
          </Button>
        </div>
      </div>
      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Deletion"
      >
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Are you sure you want to delete this user?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
