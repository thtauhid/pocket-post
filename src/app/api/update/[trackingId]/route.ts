import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { trackingId: string } }
) {
  await prisma.tracking.update({
    where: { id: Number(params.trackingId) },
    data: { opens: { increment: 1 } },
  });

  return Response.json({ message: "Tracking updated" });
}
