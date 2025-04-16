import { JwtPayload } from "jsonwebtoken";
import { AssigneeType, TimeString } from "./types";

export interface TaskType {
  title: string;
  ownerModel?: string;
  description?: string;
  project?: string;
  section?: string;
  date?: Date;
  time?: TimeString;
  deadline?: Date;
  priority?: string;
  reminder?: boolean;
  assigneeType?: AssigneeType;
  assignees?: string[];
}

export interface JwtUserPayload extends JwtPayload {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}
