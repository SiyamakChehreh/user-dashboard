import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadJSON, saveJSON } from "../utils/storage";
import type { User } from "../types";
import { motion } from "framer-motion";
import Modal from "../components/Modal";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}

export default function AddUserModal({
  open,
  onClose,
  onAdded,
}: AddUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const local = loadJSON<User[]>(import.meta.env.VITE_LOCAL_USERS_KEY);
    const nextId = (local.reduce((s, u) => Math.max(s, u.id), 999) || 999) + 1;
    const newUser: User = {
      id: nextId,
      name: data.name,
      email: data.email,
      company: data.company || "",
      local: true,
    };
    local.unshift(newUser);
    saveJSON(import.meta.env.VITE_LOCAL_USERS_KEY, local);
    reset();
    onAdded();
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Add User">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm">Name</label>
            <input
              {...register("name")}
              className="w-full mt-1 p-2 rounded border dark:bg-gray-700"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input
              {...register("email")}
              className="w-full mt-1 p-2 rounded border dark:bg-gray-700"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm">Company</label>
            <input
              {...register("company")}
              className="w-full mt-1 p-2 rounded border dark:bg-gray-700"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 rounded bg-blue-600 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}
