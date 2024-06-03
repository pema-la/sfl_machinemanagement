import mongoose, { Schema } from "mongoose";

const maintenancetypeSchema = new Schema(
    {
        mtype: String,
        description: String,
    },
    {
        timestamps: true,
    }
);

const Maintenancetype = mongoose.models.Maintenancetype || mongoose.model("Maintenancetype", maintenancetypeSchema);

export default Maintenancetype;