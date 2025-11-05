import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import type { User } from "../types";
import { loadJSON } from "../utils/storage";

export function useUsers() {
  const localKey = import.meta.env.VITE_LOCAL_USERS_KEY;
  const deletedKey = import.meta.env.VITE_DELETED_USERS_KEY;
  const [localUsers, setLocalUsers] = useState<User[]>(
    loadJSON<User[]>(import.meta.env.VITE_LOCAL_USERS_KEY)
  );
  const [deletedUsers, setDeletedUsers] = useState<number[]>(
    loadJSON<number[]>(deletedKey)
  );

  const q = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  const mergedUsers = useMemo(() => {
    if (!q.data) return localUsers;
    const all = [...localUsers, ...q.data];
    const unique = all.filter(
      (u, i, arr) => i === arr.findIndex((x) => x.id === u.id)
    );
    return unique.filter((u) => !deletedUsers.includes(u.id));
  }, [localUsers, q.data, deletedUsers]);

  const reloadLocal = () => setLocalUsers(loadJSON<User[]>(localKey));
  const reloadDeleted = () => setDeletedUsers(loadJSON<number[]>(deletedKey));

  return {
    ...q,
    mergedUsers: mergedUsers,
    localUsersKey: import.meta.env.VITE_LOCAL_USERS_KEY,
    reloadLocal,
    reloadDeleted,
  };
}
