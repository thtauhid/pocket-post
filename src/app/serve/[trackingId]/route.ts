import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const IMMUTABLE = "public, max-age=31536000, immutable";
const REVALIDATE = "public, s-maxage=59, stale-while-revalidate";

export async function GET(
  req: Request,
  { params }: { params: { trackingId: string } }
) {
  try {
    await prisma.tracking.update({
      where: { id: Number(params.trackingId) },
      data: { opens: { increment: 1 } },
    });

    let url = "https://picsum.photos/200";

    let contentType, contentLength, h;

    const stream = await fetch(url).then((r) => {
      h = r.headers;
      contentType = r.headers.get("content-type");
      contentLength = r.headers.get("content-length");

      const reader = r.body?.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          async function pump() {
            const { done, value } = await reader!.read();
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            return pump();
          }
        },
      });
    });

    const headers = new Headers(h);
    headers.set("Cache-Control", REVALIDATE);
    headers.set("Content-Type", "image/jpeg");

    return new NextResponse(stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
