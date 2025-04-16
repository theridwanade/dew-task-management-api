import { Document, Model, model, Schema } from "mongoose";

interface IActivityLog extends Document {
  user: Schema.Types.ObjectId; // who performed it
  type: string; // e.g., "create", "update", "delete", "revert"
  itemId: Schema.Types.ObjectId; // what item was affected
  itemModel: string;
  dataBefore?: any; // optional previous state (for revert)
  dataAfter?: any; // new state after action
  timestamp: Date;
  meta?: Record<string, any>; // optional metadata
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["create", "update", "delete", "revert", "assign", "unassign", "comment"],
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "itemModel"
    },
    itemModel: {
      type: String,
      default: "Task",
      required: true,
      enum: ["User", "Team", "Task"]
    },
    dataBefore: {
      type: Schema.Types.Mixed,
      default: null,
    },
    dataAfter: {
      type: Schema.Types.Mixed,
      default: null,
    },
    meta: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog: Model<IActivityLog> = model("ActivityLog", activityLogSchema);

export default ActivityLog;
