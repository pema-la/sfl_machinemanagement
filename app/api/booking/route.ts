import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
//import allowMachine from "@/app/models/allowmachine";
import Machine from "@/app/models/machine"; // Import the machine model
import booking from "@/app/models/booking";

export async function POST(request) {
  const { userEmail, machinesId, bookingDate, bookingTime } =
    await request.json();
  await connectMongoDB();

  try {
    await booking.create({
      userEmail,
      machinesId,
      bookingDate,
      bookingTime,
    });
    return NextResponse.json({ message: "booking done" }, { status: 201 });
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const allBookings = await booking.find().populate("machinesId", "name"); // Populate machine names
  return NextResponse.json({ allBookings });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await booking.findByIdAndDelete(id);
  return NextResponse.json({ message: "Booking Deleted" }, { status: 200 });
}
