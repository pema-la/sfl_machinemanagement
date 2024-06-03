import mongoose from "mongoose";
import User from "../app/models/user";
import * as bcrypt from "bcrypt";

async function seedUser() {
  try {
    await mongoose.connect(
      "mongodb+srv://12200056gcit:cxzh9gMDF5bU1iui@mms.gv8uzmn.mongodb.net/mms_db"
    );

    const userData = {
      name: "SFL Admin",
      email: "admin@gmail.com",
      cid: 12345678901,
      contact: 12345678,
      password: "admin123",
      role: "admin",
    };

    const existingUser = await User.findOne({ email: userData.email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      const user = new User(userData);
      await user.save();
      console.log("User seeded successfully!");
    } else {
      console.log("User already exists!");
    }
  } catch (error) {
    console.error("Error seeding user:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedUser();
