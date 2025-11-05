import axios from "axios";
import type { User } from "../types";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export async function fetchUsers(): Promise<User[]> {
  const res = await api.get<User[]>("/users");
  return res.data;
}

export async function fetchUsersById(id: number): Promise<User> {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
}
