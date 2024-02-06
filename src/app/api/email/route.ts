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

  const resend_email = await send_resend({
    apiKey: user?.api_key!,
    from: body.from_address,
    to: body.to_address,
    subject: body.subject,
    text: body.body,
  });

  const emailRes = await prisma.sentEmail.create({
    data: {
      userId: userId!,
      from: body.from_address,
      to: body.to_address,
      subject: body.subject,
      body: body.body,
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
