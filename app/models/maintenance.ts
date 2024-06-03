import mongoose, { Schema } from "mongoose";

const maintenanceSchema = new Schema(
  {
    name: { type: String, required: true },
    mtype: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    scheduledTime: { type: String },
    mparts: { type: String, required: true },
    technicianemail: { type: String, required: true },
    durationStartDate: { type: Date, required: true },
    durationEndDate: { type: Date, required: true },
    durationStartTime: { type: String, required: true },
    durationEndTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Done", "Failed"],
      default: "Pending",
      required: true,
    },
    deleted: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Maintenance =
  mongoose.models.Maintenance ||
  mongoose.model("Maintenance", maintenanceSchema);

export default Maintenance;
