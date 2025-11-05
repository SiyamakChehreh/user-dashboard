import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUsers } from "../hooks/useUsers";
import UserCard from "../components/UserCard";
import AddUserModal from "../components/AddUserModal";
import Buttun from "../components/Buttons";
import { loadJSON, saveJSON } from "../utils/storage";
import type { User } from "../types";

export default function UserList() {
  const {
    mergedUsers,
    isLoading,
    isError,
    localUsersKey,
    reloadLocal,
    reloadDeleted,
  } = useUsers();
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [delayedLoading, setDelayedLoading] = useState(isLoading);

  useEffect(() => {
    console.log("isLoadding changed to:", isLoading);

    if (isLoading) {
      setDelayedLoading(true);
    } else {
      const delay = import.meta.env.DEV ? 2000 : 0;
      const timer = setTimeout(() => {
        console.log("stopping delayed working...");

        setDelayedLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return mergedUsers;
    return mergedUsers.filter(
      (u) =>
        (u.name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q)
    );
  }, [mergedUsers, query]);

  const handleDelete = (id: number) => {
    const local = loadJSON<User[]>(localUsersKey);
    const remaining = Array.isArray(local)
      ? local.filter((u) => u.id !== id)
      : [];
    saveJSON(localUsersKey, remaining);

    const deletedKey = import.meta.env.VITE_DELETED_USERS_KEY;
    const deleted = loadJSON<number[]>(deletedKey);
    if (!deleted.includes(id)) {
      deleted.push(id);
      saveJSON(deletedKey, deleted);
    }

    reloadLocal();
    reloadDeleted();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex gap-4 items-center">
          <Buttun onClick={() => setShowModal(true)}>Add User</Buttun>
          <Buttun onClick={() => setShowSearch((prev) => !prev)}>
            {showSearch ? "Close Search" : "Search Users"}
          </Buttun>
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="p-2 mt-3 sm:mt-0 rounded-md border-2 border-gray-500 w-full sm:w-80 dark:bg-gray-700 focus:outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {delayedLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      ) : isError ? (
        <div>Error loading users</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((user) => (
            <UserCard key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <AddUserModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdded={() => reloadLocal()}
      />
    </div>
  );
}
