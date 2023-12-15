import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/ui/table";

export const DashboardTable = () => {
  return (
    <div className="w-full">
      <Table className="w-full">
        <TableCaption>All students Enrolled</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right">Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
