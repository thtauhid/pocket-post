import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const REVALIDATE = "public, s-maxage=59, stale-while-revalidate";

export async function GET(
  req: Request,
  { params }: { params: { trackingId: string } }
) {
  const gif = Buffer.from(
    "R0lGODlhBwAHAIAAAP///wAAACH5BAEAAAAALAAAAAAHAAcAAAIPlI+py+0Po5yUFQA7",
    "base64"
  );

  const headers = new Headers();
  headers.set("Cache-Control", REVALIDATE);
  headers.set("Content-Type", "image/gif");
  headers.set("Content-Length", String(gif.length));

  try {
    await prisma.tracking.update({
      where: { id: Number(params.trackingId) },
      data: { opens: { increment: 1 } },
    });

    return new NextResponse(gif, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(gif, {
      status: 500,
      headers,
    });
  }
}
