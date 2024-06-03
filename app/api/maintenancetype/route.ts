import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Maintenancetype from "@/app/models/maintenancetype";

export async function POST(request) {
  const { mtype, description } = await request.json();
  await connectMongoDB();
  await Maintenancetype.create({ mtype, description });
  return NextResponse.json(
    { message: "Maintenancetype Created" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const maintenancetypes = await Maintenancetype.find();
  return NextResponse.json({ maintenancetypes });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Maintenancetype.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Maintenance type deleted" },
    { status: 200 }
  );
}
