import connectDB from "@/db/conn";
import { type NextRequest, NextResponse } from "next/server";
import handleErrors from "./errorHandler";
import Playlist from "@/db/models/Playlist";
import { getServerSession } from "next-auth/next";
import options from "../auth/[...nextauth]/options";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  delete body.userId;

  try {
    await connectDB();
    const session = await getServerSession(options);
    if (session) {
      const playlist = await Playlist.create({
        ...body,
        userId: session?.user.id,
      });
      return NextResponse.json(playlist._id);
    } else {
      return NextResponse.json("Session is empty", { status: 400 });
    }
  } catch (err) {
    const errors = handleErrors(err as Record<string, any>);
    return NextResponse.json(errors, { status: 400 });
  }
};

export const GET = async (req: NextRequest) => {
  const type = req.nextUrl.searchParams.get("type");

  try {
    await connectDB();
    const session = await getServerSession(options);
    if (session) {
      const playlists = await Playlist.find({
        userId: session?.user.id,
        type,
      });
      return NextResponse.json(playlists);
    } else {
      return NextResponse.json("Session is empty", { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
};

// Delete or Update if request is send by userId
