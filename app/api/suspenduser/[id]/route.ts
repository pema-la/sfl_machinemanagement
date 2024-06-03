import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newStatus: status } = await request.json();
    if (!["Approved", "Suspended"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }
    await connectMongoDB();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: "User status updated successfully",
        machine: updatedUser,
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
