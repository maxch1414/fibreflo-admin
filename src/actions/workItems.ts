import { WorkItem } from "@/types";
import axios from "axios";

export async function patchWorkItem(workItem: WorkItem, token: string) {
  try {
    const result = await axios.patch(
      `${import.meta.env.VITE_API_URL}/workitems/${workItem.id}`,
      workItem,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error patching timesheet:", error);
    throw error;
  }
}
