import { Document, Model, model, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  isVerified: boolean;
  teams: string[];
  tasks: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    },
    teams: {
      type: [String]
    },
    tasks: {
      type: [String]
    }
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = model("User", userSchema);

export default User;
