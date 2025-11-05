import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersById } from "../api/users";
import { loadJSON } from "../utils/storage";
import Button from "../components/Buttons";
import type { User } from "../types";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  // First check local users
  const localUsers = loadJSON<User[]>("local_users_v1");
  const local = localUsers.find((u) => u.id === numericId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", numericId],
    queryFn: () => fetchUsersById(numericId),
    enabled: !local, // only query remote if not a local user
  });

  const user = local ?? data;

  if (!user && isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!user && isError) {
    return <div>Error loading user</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => navigate(-1)} variant="secondary">
        ← Back
      </Button>
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <div className="text-sm text-gray-400">{user.email}</div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <h4 className="font-medium">Company</h4>
            <div className="text-sm">
              {typeof user.company === "string"
                ? user.company
                : user.company?.name ?? "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
