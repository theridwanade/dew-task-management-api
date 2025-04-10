import { Document, Model, model, Schema } from "mongoose";

interface IProject extends Document {
  owner: Schema.Types.ObjectId;
  ownerModel: string;
  title: string;
  description: string;
  tasks: Schema.Types.ObjectId[];
  sections: Schema.Types.ObjectId[];
}

const projectSchema = new Schema<IProject>(
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
  },
  tasks: {
    type: [Schema.Types.ObjectId],
    ref: "Task",
    default: []
  },
  sections: {
    type: [Schema.Types.ObjectId],
    ref: "Section",
    default: []
  }
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> = model("Project", projectSchema);

export default Project;
