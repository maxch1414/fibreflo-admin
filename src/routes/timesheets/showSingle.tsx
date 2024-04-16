import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { getTimesheet, patchTimesheet } from "@/actions/timesheets";
import { Timesheet, WorkItem } from "@/types";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { PatchWorkItemModal } from "@/components/workItems/PatchWorkItemModal";

export function ShowTimesheet() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const mutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const token = await getToken();
      const newTimesheet = {
        ...timesheet,
      };
      newTimesheet.status = newStatus;

      if (token) {
        const res = await patchTimesheet(id!, newTimesheet, token);
        return res;
      }
    },
    onSuccess: () => {
      toast.success("Timesheet Successfully updated");
      queryClient.invalidateQueries({ queryKey: ["timesheet"] });
    },
  });

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["timesheet"],
    queryFn: async () => {
      const token = await getToken();
      if (token) {
        const res: Timesheet = await getTimesheet(id!, token);
        return res;
      }
    },
  });

  if (isLoading) return "Loading...";
  if (isError) return error.message;
  if (!data) return null;

  const timesheet = data;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Timesheet</CardTitle>
        <CardDescription>
          Work log for {format(new Date(timesheet.dateOfWork), "dd/MM/yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:gap-2">
          <div className="flex items-center">
            <div className="text-2xl font-semibold">
              {format(new Date(timesheet.dateOfWork), "dd/MM/yyyy")}
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="text-sm w-[100px]">Work Provider</div>
              <div className="font-medium">{timesheet.workProvider}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm w-[100px]">Status</div>
              <Select onValueChange={(e) => mutation.mutate(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={
                      timesheet.status.charAt(0).toUpperCase() +
                      timesheet.status.slice(1)
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="invoiced">Invoiced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm w-[100px]">Engineer(s)</div>
              <div className="font-medium">
                {timesheet.engineers
                  .map(
                    (engineer) => `${engineer.firstName} ${engineer.lastName}`
                  )
                  .join(", ")}
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="overflow-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Work Area</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timesheet.workItems.map((workItem: WorkItem) => (
                <TableRow key={workItem.id}>
                  <TableCell className="text-sm">{workItem.name}</TableCell>
                  <TableCell>{workItem.quantity}</TableCell>
                  <TableCell className="text-sm">{workItem.workArea}</TableCell>
                  <TableCell className="truncate max-w-[150px]">
                    {workItem.notes}
                  </TableCell>
                  <TableCell className="truncate max-w-[150px]">
                    {/* <Dialog>
                      <DialogTrigger className={buttonVariants()}>
                        Edit
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>Edit Work Item</DialogHeader>
                        <form>
                          <div>
                            <Label>Work Item</Label>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={workItem.name} />
                              </SelectTrigger>
                              <SelectContent>
                                {wessexRateCard.map((item) => (
                                  <SelectItem value={item.value}>
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Label>Quantity</Label>
                            <Input
                              required
                              type="number"
                              defaultValue={workItem.quantity}
                            />

                            <Label>Work Area</Label>
                            <Input required defaultValue={workItem.workArea} />

                            <Label>Notes</Label>
                            <Textarea required defaultValue={workItem.notes} />

                            <Button
                              onClick={() => workItemMutation.mutate()}
                              className="mt-4"
                            >
                              Submit
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog> */}
                    <PatchWorkItemModal
                      workItem={workItem}
                      timesheetId={String(timesheet.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
