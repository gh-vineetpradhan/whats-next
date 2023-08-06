import connectDB from "@/db/conn";
import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import options from "../../auth/[...nextauth]/options";
import handleErrors from "../errorHandler";
import Item from "@/db/models/Item";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const itemId = params.id;
  const body = await req.json();
  delete body.userId;
  delete body._id;

  try {
    await connectDB();
    const session = await getServerSession(options);
    if (session) {
      const item = await Item.findById(itemId);
      if (item.userId === session.user.id) {
        await Item.findByIdAndUpdate(itemId, body, {
          runValidators: true,
        });
        return NextResponse.json(item._id);
      } else {
        return NextResponse.json(
          "You are not authorized to update this account",
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json("Session is empty", { status: 400 });
    }
  } catch (err) {
    const errors = handleErrors(err as Record<string, any>);
    return NextResponse.json(errors, { status: 400 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const itemId = params.id;
  try {
    await connectDB();
    const session = await getServerSession(options);
    if (session) {
      const item = await Item.findById(itemId);
      if (item.userId === session.user.id) {
        await Item.findByIdAndDelete(itemId);
        return NextResponse.json(item._id);
      } else {
        return NextResponse.json(
          "You are not authorized to update this account",
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json("Session is empty", { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
