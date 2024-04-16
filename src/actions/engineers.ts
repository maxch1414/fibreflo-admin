import { Engineer } from "@/types";
import axios from "axios";

export async function getAllEngineers(token: string) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/engineers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result: Engineer[] = await res.data;
  return result;
}
