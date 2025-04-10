import { Document, Model, model, Schema } from "mongoose";

interface ISubAdmin {
  userId: Schema.Types.ObjectId;
  role: "member" | "editor" | "admin";
}

interface ITeam extends Document {
  name: string;
  admin: Schema.Types.ObjectId;
  subAdmins: ISubAdmin[];
  tasks: Schema.Types.ObjectId[];
  members: Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const subadminSchema = new Schema<ISubAdmin>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["member", "editor", "admin"],
      required: true,
    },
  },
  {
    _id: false,
  }
);

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subAdmins: {
      type: [subadminSchema],
      default: [],
    },
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: "Task",
      default: [],
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Team: Model<ITeam> = model("Team", teamSchema);

export default Team;
