import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import WriteEmailForm from "./form";

export default async function WriteEmailPage() {
  const { userId } = auth();
  const user = await prisma.user.findUnique({
    where: {
      id: userId!,
    },

    select: {
      default_from_email: true,
    },
  });

  return <WriteEmailForm from={user?.default_from_email} />;
}
