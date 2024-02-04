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

  // Check if user exists in db
  let user = await prisma.user.findUnique({
    where: {
      id: clerk_user.id,
    },
  });

  // If user does not exist, create a new user
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: clerk_user.id,
      },
    });
  }

  // Store the API key
  // Check if the user has existing API key
  const existingApiKey = await prisma.apiKey.findFirst({
    where: {
      userId: user.id,
    },
  });

  // If the user has an existing API key, update it
  if (existingApiKey) {
    await prisma.apiKey.update({
      where: {
        id: existingApiKey.id,
      },
      data: {
        key: data.api_key,
        provider: data.provider,
      },
    });
  } else {
    // If the user does not have an existing API key, create a new one
    await prisma.apiKey.create({
      data: {
        key: data.api_key,
        provider: data.provider,
        userId: user.id,
      },
    });
  }

  // Add reply-to email
  // Check if the user has an existing reply-to email
  const existingReplyTo = await prisma.userSettings.findFirst({
    where: {
      userId: user.id,
    },
  });

  // If the user has an existing reply-to email, update it
  if (existingReplyTo) {
    await prisma.userSettings.update({
      where: {
        id: existingReplyTo.id,
      },
      data: {
        default_reply_to_email: data.default_reply_to,
      },
    });
  } else {
    // If the user does not have an existing reply-to email, create a new one
    await prisma.userSettings.create({
      data: {
        default_reply_to_email: data.default_reply_to,
        userId: user.id,
      },
    });
  }

  return NextResponse.json({ success: true, message: "Updated" });
}
