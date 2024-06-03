import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    machinesId: [String],
    bookingDate: { type: String, required: true },
    bookingTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  }
);

const booking =
  mongoose.models.booking || mongoose.model("booking", bookingSchema);

export default booking;
