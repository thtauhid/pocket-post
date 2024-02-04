import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return (
    <div className="">
      <h1 className="font-bold text-2xl border-b border-b-stone-400 p-4">
        Dashboard
      </h1>

      <div className="p-4">
        {!user && (
          <Alert variant="destructive">
            {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}
            <AlertTitle>API not configured</AlertTitle>
            <AlertDescription>
              <p className="mb-4">
                You have not configured the email provider & API.
              </p>
              <Link href="/dashboard/settings">
                <Button>Configure now</Button>
              </Link>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
