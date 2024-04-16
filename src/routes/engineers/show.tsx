import { getAllEngineers } from "@/actions/engineers";
import { useQuery } from "@tanstack/react-query";
import { EngineersTable } from "@/components/engineers/table";
import { useAuth } from "@clerk/clerk-react";

export function ShowEngineers() {
  const { getToken } = useAuth();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["engineers"],
    queryFn: async () => {
      const token = await getToken();
      if (token) {
        const res = await getAllEngineers(token);
        return res;
      }
    },
  });

  if (isLoading) return "Loading...";
  if (isError) return error.message;
  if (!data) return null;

  return (
    <div className="p-10">
      <h1>Show Engineers</h1>
      <div>
        <EngineersTable data={data} />
      </div>
    </div>
  );
}
