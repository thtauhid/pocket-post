import { auth } from "@clerk/nextjs";
import SettingsForm from "./form";
import prisma from "@/lib/prisma";

export default async function SettingsPage() {
  const { userId } = auth();
  const user = await prisma.user.findUnique({
    where: {
      id: userId!,
    },
  });

  return <SettingsForm user={user} />;
}
