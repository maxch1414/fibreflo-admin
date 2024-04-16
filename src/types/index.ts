export type Engineer = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  created_at: string;
  user_id: string;
};

export type WorkItem = {
  id: number;
  name: string;
  quantity: number;
  timesheetId: number;
  workArea: string;
  notes: string;
};

export type Timesheet = {
  createdAt: string;
  dateOfWork: string;
  engineers: Engineer[];
  id: number;
  notes: string;
  status: string;
  workItems: WorkItem[];
  workProvider: string;
};
