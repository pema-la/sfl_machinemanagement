import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Machine from "@/app/models/machine";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newStatus: status } = await request.json();
    if (!["Active", "Inactive"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }
    await connectMongoDB();
    const updatedMachine = await Machine.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedMachine) {
      return NextResponse.json(
        { message: "Machine not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Machine status updated successfully",
        machine: updatedMachine,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating machine status", error: error.message },
      { status: 500 }
    );
  }
}
