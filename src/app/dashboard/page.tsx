import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Stats from "./stats";
import { Separator } from "@/components/ui/separator";

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

  const emailsSent = await prisma.sentEmail.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });

  const emailsTracked = await prisma.tracking.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });

  // console.log({ emailsSent, emailsTracked });

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

        {/* Cards */}
        <h2 className="font-bold py-4 text-2xl">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Link href="/dashboard/email/write">
            <Card>
              <CardHeader>
                <CardTitle>Write Email</CardTitle>
                <CardDescription>Write a new email</CardDescription>
              </CardHeader>
              {/* <CardContent>
                <p>Card Content</p>
              </CardContent> */}
            </Card>
          </Link>

          <Link href="/dashboard/email/sent">
            <Card>
              <CardHeader>
                <CardTitle>Emails Sent</CardTitle>
                <CardDescription>
                  View emails sent from your account
                </CardDescription>
              </CardHeader>
              {/* <CardContent>
              <p>Card Content</p>
            </CardContent> */}
            </Card>
          </Link>

          <Link href="/dashboard/tracking">
            <Card>
              <CardHeader>
                <CardTitle>Track New Email</CardTitle>
                <CardDescription>
                  Track the opens of a new email
                </CardDescription>
              </CardHeader>
              {/* <CardContent>
              <p>Card Content</p>
            </CardContent> */}
            </Card>
          </Link>

          <Link href="/dashboard/tracking">
            <Card>
              <CardHeader>
                <CardTitle>Tracked Emails</CardTitle>
                <CardDescription>
                  View emails that have been tracked
                </CardDescription>
              </CardHeader>
              {/* <CardContent>
              <p>Card Content</p>
            </CardContent> */}
            </Card>
          </Link>
        </div>

        <Separator />

        {/* Stats */}
        <Stats emails={emailsSent} tracking={emailsTracked} />
      </div>
    </div>
  );
}
