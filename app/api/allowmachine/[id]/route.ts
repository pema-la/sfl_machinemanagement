import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import allowMachine from "@/app/models/allowmachine";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newName: name,
    newEmail: email,
    newCid: cid,
    newContact: contact,
    newPassword: password,
    newMachines: machines,
  } = await request.json();
  await connectMongoDB();

  const updateData = { name, email, cid, contact, password, machines };

  try {
    await allowMachine.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ message: "User Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const machine = await allowMachine.findById(id);
  return NextResponse.json({ machine }, { status: 200 });
}
