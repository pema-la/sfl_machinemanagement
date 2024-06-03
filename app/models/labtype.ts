import mongoose, { Schema } from "mongoose";

const labtypeSchema = new Schema(
    {
        name: String,
        description: String,
    },
    {
        timestamps: true,
    }
);

const Labtype = mongoose.models.Labtype || mongoose.model("Labtype", labtypeSchema);

export default Labtype;