import connectDB from "@/db/conn";
import User from "@/db/models/User";
import { type NextRequest, NextResponse } from "next/server";
import handleErrors from "./errorHandler";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    await connectDB();
    const user = await User.create(body);
    return NextResponse.json(user);
  } catch (err) {
    const errors = handleErrors(err as Record<string, any>);
    return NextResponse.json(errors, { status: 400 });
  }
};
