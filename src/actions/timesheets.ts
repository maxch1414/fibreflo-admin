import { Timesheet } from "@/types";
import axios from "axios";

export async function getAllTimesheets(token: string) {
  const timesheets = await axios.get(
    `${import.meta.env.VITE_API_URL}/timesheets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result: Timesheet[] = await timesheets.data;
  return result;
}

export async function getTimesheet(id: string, token: string) {
  const timesheets = await axios.get(
    `${import.meta.env.VITE_API_URL}/timesheets/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result: Timesheet = await timesheets.data;
  return result;
}

export async function patchTimesheet(
  id: string,
  timesheet: Timesheet,
  token: string
) {
  try {
    const result = await axios.patch(
      `${import.meta.env.VITE_API_URL}/timesheets/${id}`,
      timesheet,
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
