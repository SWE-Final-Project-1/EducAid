import { CheckSquare } from "lucide-react";
import { Checkbox } from "../ui/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/ui/table";

export const StudentSheet = ({ students }) => {
  return (
    <Table>
      <TableCaption>A list of all enrolled students.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <CheckSquare size={15} />
          </TableHead>
          <TableHead className="w-[100px]">Firstname</TableHead>
          <TableHead>Lastname</TableHead>
          <TableHead>Age</TableHead>
          <TableHead className="text-right">Gender</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map(s => (
          <TableRow key={s.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">{s.firstName}</TableCell>
            <TableCell>{s.lastName}</TableCell>
            <TableCell>{s.age}</TableCell>
            <TableCell className="text-right">{s.gender}</TableCell>
            <TableCell className="text-right">Graded</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
};
