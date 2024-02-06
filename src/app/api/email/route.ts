import prisma from "@/lib/prisma";
import { send_resend } from "@/lib/resend";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      id: userId!,
    },
  });

  // Check if user has an API key
  if (!user?.api_key) {
    return NextResponse.json({
      message: "User does not have an API key",
    });
  }

  const resend_email = await send_resend({
    apiKey: user.api_key!,
    from: body.from_address,
    to: body.to_address,
    subject: body.subject,
    text: body.body,
  });

  // Check if email was sent
  if (!resend_email.data?.id) {
    return NextResponse.json({
      message: "Failed to send email",
      error: resend_email.error,
    });
  }

  const emailRes = await prisma.sentEmail.create({
    data: {
      userId: userId!,
      from: body.from_address,
      to: body.to_address,
      subject: body.subject,
      body: body.body,
      provider_email_id: resend_email.data.id,
    },
  });

  const trackingRes = await prisma.tracking.create({
    data: {
      userId: userId!,
      emailId: emailRes.id,
    },
  });

  return NextResponse.json({
    message: "Email sent",
    data: {
      email: emailRes,
      tracking: trackingRes,
      resend_email,
    },
  });
}
