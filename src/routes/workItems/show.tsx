import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { WorkItem } from "@/types";
import { WorkItemsTable } from "@/components/workItems/table";

export function ShowTimesheets() {
  const { getToken } = useAuth();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["workItems"],
    queryFn: async () => {
      const token = await getToken();
      if (token) {
        const res: WorkItem[] = await getAllWorkItems(token);
        return res;
      }
    },
  });

  if (isLoading) return "Loading...";
  if (isError) return error.message;
  if (!data) return null;

  return (
    <div className="p-10">
      <h1>Show Work Items</h1>
      <div>
        <WorkItemsTable data={data} />
      </div>
    </div>
  );
}
