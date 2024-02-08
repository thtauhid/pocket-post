import { ImageResponse } from "next/og";
import Dot from "./dot";
import prisma from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: { trackingId: string } }
) {
  await prisma.tracking.update({
    where: { id: Number(params.trackingId) },
    data: { opens: { increment: 1 } },
  });

  return new ImageResponse(Dot(), {
    width: 1,
    height: 1,
    headers: {
      "Content-Type": "image/gif",
    },
  });
}
