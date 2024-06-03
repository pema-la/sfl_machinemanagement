import mongoose, { Schema } from "mongoose";

const allowMachineSchema = new Schema(
  {
    name: String,
    email: String,
    cid: Number,
    contact: Number,
    password: String,
    machines: [String],
  },
  {
    timestamps: true,
  }
);

const allowMachine =
  mongoose.models.allowMachine ||
  mongoose.model("allowMachine", allowMachineSchema);

export default allowMachine;
