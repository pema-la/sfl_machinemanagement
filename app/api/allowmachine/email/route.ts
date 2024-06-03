import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import allowMachine from "@/app/models/allowmachine";

export async function GET(request) {
  const email = request.nextUrl.searchParams.get("email");
  await connectMongoDB();

  try {
    const user = await allowMachine.findOne({ email: email });
    if (user) {
      return NextResponse.json({ machines: user.machines });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
