import { Document, Model, model, Schema } from "mongoose";
import { AssigneeType, TimeString } from "../utils/types/types";

interface ITask extends Document {
  owner: Schema.Types.ObjectId;
  ownerModel: string;
  title: string;
  description: string;
  status: "todo" | "done" | "inprogress";
  date: Date;
  time: TimeString;
  deadline: Date;
  priority: string;
  reminder: boolean;
  assigneeType: AssigneeType;
  assignees: Schema.Types.ObjectId[];
}

const taskSchema = new Schema<ITask>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "ownerModel"
    },
    ownerModel: {
      type: String,
      required: true,
      enum: ["User", "Team"]
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      required: true,
      enum: ["todo", "done", "inprogress"],
      default: "todo"
    },
    date: {
      type: Date,
      default: null
    },
    time: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    priority: {
      type: String,
    },
    reminder: {
      type: Boolean,
      default: false,
    },
    assigneeType: {
      type: String,
      enum: ["automatic", "single", "multiple"],
      default: "automatic"
    },
    assignees: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    }]
  },
  {
    timestamps: true,
  }
);

const Task: Model<ITask> = model("Task", taskSchema);

export default Task;
