import { Document, Model, model, Schema } from "mongoose";
import { AssigneeType, TimeString } from "../utils/types/types";

interface ITask extends Document {
  owner: Schema.Types.ObjectId;
  ownerModel: string;
  title: string;
  description: string;
  project: string;
  section: string;
  status: "todo" | "done" | "inprogress";
  date: Date;
  time: TimeString;
  deadline: Date;
  priority: string;
  reminder: boolean;
  assigneeType: AssigneeType;
  assignees: Schema.Types.ObjectId[];
  isLinked: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "ownerModel",
    },
    ownerModel: {
      type: String,
      required: true,
      default: "User",
      enum: ["User", "Team"],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    project: {
      type: String,
      ref: "Project",
    },
    section: {
      type: String,
      ref: "Section",
    },
    status: {
      type: String,
      required: true,
      enum: ["todo", "done", "inprogress"],
      default: "todo",
    },
    date: {
      type: Date,
      default: null,
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
      default: "automatic",
    },
    assignees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    isLinked: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

const Task: Model<ITask> = model("Task", taskSchema);

export default Task;
