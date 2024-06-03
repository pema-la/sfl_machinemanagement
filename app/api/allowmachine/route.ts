import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import allowMachine from "@/app/models/allowmachine";

export async function POST(request) {
  const { name, email, cid, contact, password, machines } =
    await request.json();
  await connectMongoDB();

  try {
    await allowMachine.create({
      name,
      email,
      cid,
      contact,
      password,
      machines,
    });
    return NextResponse.json({ message: "User Allowed" }, { status: 201 });
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const allMachines = await allowMachine.find();
  return NextResponse.json({ allMachines });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await allowMachine.findByIdAndDelete(id);
  return NextResponse.json({ message: "User Suspended" }, { status: 200 });
}
// export async function GET_BY_EMAIL(request) {
//   const email = request.nextUrl.searchParams.get("email");
//   await connectMongoDB();

//   try {
//     const user = await allowMachine.findOne({ email: email });
//     if (user) {
//       return NextResponse.json({ machines: user.machines });
//     } else {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//   } catch (error) {
//     return NextResponse.error(error, { status: 500 });
//   }
// }
