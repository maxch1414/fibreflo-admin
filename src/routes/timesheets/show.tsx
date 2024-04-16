import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { TimesheetsTable } from "@/components/timesheets/table";
import { getAllTimesheets } from "@/actions/timesheets";
import { Timesheet } from "@/types";

export function ShowTimesheets() {
  const { getToken } = useAuth();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["timesheets"],
    queryFn: async () => {
      const token = await getToken();
      if (token) {
        const res: Timesheet[] = await getAllTimesheets(token);
        return res;
      }
    },
  });

  if (isLoading) return "Loading...";
  if (isError) return error.message;
  if (!data) return null;

  return (
    <div className="p-10">
      <h1>Show Timesheets</h1>
      <div>
        <TimesheetsTable data={data} />
      </div>
    </div>
  );
}
