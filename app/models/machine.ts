import mongoose, { Schema } from "mongoose";

const machineSchema = new Schema(
    {
        name: { type: String, required: true },
        labtype: String,
        technicianemail: String,
        description: String,
        status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', required: true },
    },
    {
        timestamps: true,
    }
);

const Machine = mongoose.models.Machine || mongoose.model("Machine", machineSchema);

export default Machine;