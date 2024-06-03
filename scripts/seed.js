"use strict";
// import mongoose from "mongoose";
// import User, { UserDocument } from "../app/models/user"; // Adjust this path as needed
// import * as bcrypt from "bcrypt";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// async function seedUser() {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect("mongodb+srv://12200056gcit:cxzh9gMDF5bU1iui@mms.gv8uzmn.mongodb.net/mms_db");
//     // Seed a user
//     const userData: Partial<UserDocument> = {
//       name: "Pema Dendup",
//       email: "admin@gmail.com",
//       cid: 11504002117,
//       contact: 17665047,
//       password: "admin123",  // Plain text password
//       role: "admin",
//     };
//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(userData.password, 10);
//     userData.password = hashedPassword;
//     // Check if user already exists
//     const existingUser = await User.findOne({ email: userData.email });
//     if (!existingUser) {
//       // Create the user
//       const user = new User(userData);
//       await user.save();
//       console.log("User seeded successfully!");
//     } else {
//       console.log("User already exists!");
//     }
//   } catch (error) {
//     console.error("Error seeding user:", error);
//   } finally {
//     // Close the MongoDB connection
//     await mongoose.disconnect();
//   }
// }
// // Seed the user
// seedUser();
var mongoose_1 = require("mongoose");
var user_1 = require("../app/models/user");
var bcrypt = require("bcrypt");
function seedUser() {
    return __awaiter(this, void 0, void 0, function () {
        var userData, existingUser, hashedPassword, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, 8, 10]);
                    return [4 /*yield*/, mongoose_1.default.connect("mongodb+srv://12200056gcit:cxzh9gMDF5bU1iui@mms.gv8uzmn.mongodb.net/mms_db")];
                case 1:
                    _a.sent();
                    userData = {
                        name: "SFL Admin",
                        email: "admin@gmail.com",
                        cid: 12345678901,
                        contact: 12345678,
                        password: "admin123",
                        role: "admin",
                    };
                    return [4 /*yield*/, user_1.default.findOne({ email: userData.email })];
                case 2:
                    existingUser = _a.sent();
                    if (!!existingUser) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcrypt.hash(userData.password, 10)];
                case 3:
                    hashedPassword = _a.sent();
                    userData.password = hashedPassword;
                    user = new user_1.default(userData);
                    return [4 /*yield*/, user.save()];
                case 4:
                    _a.sent();
                    console.log("User seeded successfully!");
                    return [3 /*break*/, 6];
                case 5:
                    console.log("User already exists!");
                    _a.label = 6;
                case 6: return [3 /*break*/, 10];
                case 7:
                    error_1 = _a.sent();
                    console.error("Error seeding user:", error_1);
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, mongoose_1.default.disconnect()];
                case 9:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
seedUser();
