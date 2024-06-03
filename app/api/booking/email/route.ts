import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import booking from "@/app/models/booking";

export async function GET(request) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "Email parameter is missing" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to the database", error: error.message },
      { status: 500 }
    );
  }

  try {
    const bookings = await booking.find({ userEmail: email });
    if (bookings.length > 0) {
      return NextResponse.json({ bookings: bookings });
    } else {
      return NextResponse.json(
        { message: "No bookings found for this user" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch booking data", error: error.message },
      { status: 500 }
    );
  }
}
