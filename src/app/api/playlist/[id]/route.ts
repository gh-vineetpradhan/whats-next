import connectDB from "@/db/conn";
import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import options from "../../auth/[...nextauth]/options";
import Playlist from "@/db/models/Playlist";
import handleErrors from "../errorHandler";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const playlistId = params.id;
  const body = await req.json();
  delete body.userId;
  try {
    await connectDB();
    const session = await getServerSession(options);
    if (session) {
      const playlist = await Playlist.findById(playlistId);
      if (playlist.userId === session.user.id) {
        await Playlist.findByIdAndUpdate(playlistId, body, {
          runValidators: true,
        });
        return NextResponse.json(playlist._id);
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
  const playlistId = params.id;
  try {
    await connectDB();
    const session = await getServerSession(options);
    if (session) {
      const playlist = await Playlist.findById(playlistId);
      if (playlist.userId === session.user.id) {
        await Playlist.findByIdAndDelete(playlistId);
        return NextResponse.json(playlist._id);
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
