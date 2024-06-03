import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newName: name,
    newEmail: email,
    newCid: cid,
    newContact: contact,
    newPassword: password,
  } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, { name, email, cid, contact, password });
  return NextResponse.json({ message: "User Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}
