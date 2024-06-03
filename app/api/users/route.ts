import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { name, email, cid, contact, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  await connectMongoDB();

  const errors = [];

  // Check for unique constraints
  if (await User.findOne({ email })) {
    errors.push("Email is already in use.");
  }
  if (await User.findOne({ cid })) {
    errors.push("CID is already in use.");
  }
  if (await User.findOne({ contact })) {
    errors.push("Contact number is already in use.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  await User.create({ name, email, cid, contact, password: hashedPassword });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find({ role: "user" });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
