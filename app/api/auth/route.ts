import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import connectMongoDB from "@/lib/mongodb";
import User from "@/app/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    await connectMongoDB();
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const sessionToken = uuidv4();
    const sessionExpiry = Date.now() + 15 * 60 * 1000;

    const sessionData = {
      token: sessionToken,
      userId: user._id,
      role: user.role,
      expiresAt: sessionExpiry,
      name: user.name,
      email: user.email,
    };

    return NextResponse.json(sessionData);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
