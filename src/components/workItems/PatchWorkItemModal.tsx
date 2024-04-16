import { WorkItem } from "@/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { wessexRateCard } from "@/lib/config/ratecards/wessex";
import { Label } from "../ui/label";
import { buttonVariants, Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchWorkItem } from "@/actions/workItems";
import { useAuth } from "@clerk/clerk-react";

type Props = {
  workItem: WorkItem;
  timesheetId: string;
};

export function PatchWorkItemModal({ workItem, timesheetId }: Props) {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(workItem.name);
  const [quantity, setQuantity] = useState(String(workItem.quantity));
  const [workArea, setWorkArea] = useState(workItem.workArea);
  const [notes, setNotes] = useState(workItem.notes);

  const workItemMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const tId = Number(timesheetId);
      const numQuantity = Number(quantity);
      const newWorkItem = {
        id: workItem.id,
        name,
        quantity: numQuantity,
        workArea,
        notes,
        timesheetId: tId,
      };

      if (token) {
        const res = await patchWorkItem(newWorkItem, token);
        return res;
      }
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Work Item successfully updated");
      queryClient.invalidateQueries({ queryKey: ["timesheet"] });
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    workItemMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>Edit Work Item</DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>Work Item</Label>
            <Select onValueChange={(e) => setName(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={workItem.name} />
              </SelectTrigger>
              <SelectContent>
                {wessexRateCard.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Quantity</Label>
            <Input
              required
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <Label>Work Area</Label>
            <Input
              required
              name="workArea"
              value={workArea}
              onChange={(e) => setWorkArea(e.target.value)}
            />

            <Label>Notes</Label>
            <Textarea
              required
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
