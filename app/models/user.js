"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
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
var User = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = User;
