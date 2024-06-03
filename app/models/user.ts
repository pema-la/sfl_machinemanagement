import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ["Approved", "Suspended"],
    default: "Approved",
    required: true,
  },
  cid: { type: Number, required: true, unique: true },
  contact: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
