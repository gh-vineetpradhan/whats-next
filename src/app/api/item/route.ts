import connectDB from "@/db/conn";
import { type NextRequest, NextResponse } from "next/server";
import handleErrors from "./errorHandler";
import { getServerSession } from "next-auth/next";
import options from "../auth/[...nextauth]/options";
import Item from "@/db/models/Item";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  delete body.userId;
  delete body._id;

  try {
    await connectDB();
    const session = await getServerSession(options);
    if (session) {
      const item = await Item.create({
        ...body,
        userId: session?.user.id,
      });
      return NextResponse.json(item._id);
    } else {
      return NextResponse.json("Session is empty", { status: 400 });
    }
  } catch (err) {
    const errors = handleErrors(err as Record<string, any>);
    return NextResponse.json(errors, { status: 400 });
  }
};

export const GET = async (req: NextRequest) => {
  const playlistId = req.nextUrl.searchParams.get("playlistId");

  try {
    await connectDB();
    const session = await getServerSession(options);
    if (session) {
      const items = await Item.find({
        playlistId,
      });
      return NextResponse.json(items);
    } else {
      return NextResponse.json("Session is empty", { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
};
