import type { User } from "../types";
import { Link } from "react-router-dom";

export default function UserCard({
  user,
  onDelete,
}: {
  user: User;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-2 border-cyan-800 hover:scale-[1.03] transition-transform duration-100 rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between gap-2">
      <div>
        <Link to={`/user/${user.id}`} className="font-semibold hover:underline">
          {user.name}
        </Link>
        <div className="text-sm text-gray-500 dark:text-gray-300 font-nunito font-semibold">
          {user.email}
        </div>
        <div className="text-xs text-gray-400">
          {typeof user.company === "string" ? user.company : user.company?.name}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDelete(user.id)}
          className="text-sm px-3 py-1 border-2 rounded-md hover:bg-red-50 hover:scale-[1.1] duration-500 transition-transform font-oswald dark:hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
