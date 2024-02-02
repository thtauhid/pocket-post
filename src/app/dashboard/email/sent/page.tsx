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

const data = [
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

export default function SentBox() {
  return (
    <div className="">
      <h1 className="font-bold text-2xl border-b border-b-stone-400 p-4">
        Email {">"} Sent Box
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
              <TableHead>Viewed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.from}</TableCell>
                <TableCell>{item.to}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.views > 0 ? "✔️" : "❌"}</TableCell>
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
