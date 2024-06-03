import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import booking from "@/app/models/booking";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newUserEmail: userEmail,
    newMachinesId: machinesId,
    newBookingDate: bookingDate,
    newBookingTime: bookingTime,
  } = await request.json();
  await connectMongoDB();

  const updateData = { userEmail, machinesId, bookingDate, bookingTime };

  try {
    await booking.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ message: "Booking Update" }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}

export async function GET(request) {
  const userEmail = request.query.email; // Get user email from query parameters
  await connectMongoDB();
  try {
    const userBookings = await booking.find({ userEmail }); // Find bookings by user's email
    return NextResponse.json({ userBookings });
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
