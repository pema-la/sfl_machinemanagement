import connectMongoDB from "@/lib/mongodb"; // Ensure this points to the correct location
import { NextResponse } from "next/server";
import Machine from "@/app/models/machine";

export async function POST(request) {
  try {
    const { name, labtype, technicianemail, description } =
      await request.json();
    await connectMongoDB();
    await Machine.create({ name, labtype, technicianemail, description });
    return NextResponse.json({ message: "Machine Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.error(new Error("Failed to create machine"), {
      status: 500,
    });
  }
}

export async function GET() {
  await connectMongoDB();
  try {
    const machines = await Machine.find();
    return NextResponse.json({ machines }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

// Named export for DELETE method
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    await connectMongoDB();
    await Machine.findByIdAndDelete(id);
    return NextResponse.json({ message: "Machine deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete machine", error: error.message },
      { status: 500 }
    );
  }
}

// export async function GET() {
//     try {
//         await connectMongoDB();
//         const machines = await Machine.find();
//         return NextResponse.json({ machines });
//     } catch (error) {
//         return NextResponse.error(new Error("Failed to fetch machines"), { status: 500 });
//     }
// }

// export async function DELETE(request) {
//     try {
//         const id = request.nextUrl.searchParams.get("id");
//         await connectMongoDB();
//         await Machine.findByIdAndDelete(id);
//         return NextResponse.json({ message: "Machine deleted" }, { status: 200 });
//     } catch (error) {
//         return NextResponse.error(new Error("Failed to delete machine"), { status: 500 });
//     }
// }
