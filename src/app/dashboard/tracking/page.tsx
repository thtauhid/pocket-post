import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function TrackingPage() {
  const { userId } = auth();
  const data = await prisma.tracking.findMany({
    where: {
      userId: userId!,
    },
    include: {
      email: true,
    },
  });

  return (
    <div>
      <h1 className="font-bold text-2xl border-b border-b-stone-400 p-4">
        Tracking
      </h1>
      <div className="py-4">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Opens</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.email?.subject}</TableCell>
                <TableCell>{item.email?.from}</TableCell>
                <TableCell>{item.email?.to}</TableCell>
                <TableCell>{item.createdAt.toISOString()}</TableCell>
                <TableCell>{item.opens}</TableCell>
                <TableCell className="text-right">
                  <Button>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
