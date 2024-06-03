import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Machine from "@/app/models/machine";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newName: name,
    newLabtype: labtype,
    newTechnicianemail: technicianemail,
    newDescription: description,
  } = await request.json();
  await connectMongoDB();
  await Machine.findByIdAndUpdate(id, {
    name,
    labtype,
    technicianemail,
    description,
  });
  return NextResponse.json({ message: "Machine Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const machine = await Machine.findOne({ _id: id });
  return NextResponse.json({ machine }, { status: 200 });
}
