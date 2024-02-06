import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

const datax = [
  {
    id: "E01",
    title: "Hello",
    from: "thtauhid.71@gmail.com",
    to: "tht@hy.com",
    views: 1,
    time: "10:00 AM",
  },
  {
    id: "E02",
    title: "Project",
    from: "dssf@fd.vov",
    to: "sf@fff.com",
    views: 0,
    time: "11:00 AM",
  },
];

export default async function SentBox() {
  const { userId } = auth();
  const data = await prisma.sentEmail.findMany({
    where: {
      userId: userId!,
    },
    include: {
      Tracking: true,
    },
  });

  console.log({ data });

  return (
    <div className="">
      <h1 className="font-bold text-2xl border-b border-b-stone-400 p-4">
        Sent Emails
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
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.from}</TableCell>
                <TableCell>{item.to}</TableCell>
                <TableCell>{item.createdAt.toISOString()}</TableCell>
                <TableCell>
                  {item.Tracking.length > 0 ? item.Tracking[0].opens : "-"}
                </TableCell>
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
