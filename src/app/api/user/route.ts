import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // provider: "resend",
  //   api_key: "",
  //   default_reply_to: "",

  // Get the current user
  const clerk_user = await currentUser();

  // If the user is not logged in, return an error
  if (!clerk_user) {
    // TODO: Return an error with useful data
    return NextResponse.error();
  }

  // Get incoming data
  const data = await req.json();

  const user = await prisma.user.upsert({
    where: {
      id: clerk_user.id,
    },

    create: {
      id: clerk_user.id,
      provider: data.provider,
      api_key: data.api_key,
      default_reply_to_email: data.default_reply_to,
    },

    update: {
      provider: data.provider,
      api_key: data.api_key,
      default_reply_to_email: data.default_reply_to,
    },
  });

  // Return a success message
  if (user) {
    return NextResponse.json({ message: "User updated" });
  } else {
    return NextResponse.error();
  }
}
