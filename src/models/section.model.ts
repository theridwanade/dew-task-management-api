import { Document, Model, model, Schema } from "mongoose";

interface ISection extends Document {
  title: string;
  description: string;
  project: string;
  tasks: Schema.Types.ObjectId[];
}

const sectionSchema = new Schema<ISection>(
  {
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
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: "Task",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Section: Model<ISection> = model("Section", sectionSchema);

export default Section;
