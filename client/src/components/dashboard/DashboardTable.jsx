import { CheckSquare } from "lucide-react";
import { Checkbox } from "../ui/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/ui/table";

export const DashboardTable = ({ students }) => {
  //   const hasSubmitted = studentId => {
  //     return submissions?.some(s => s.studentId === studentId);
  //   };
  return (
    <div className=" border rounded-md">
      <Table className="w-full ">
        <TableCaption>All students Enrolled</TableCaption>
        <TableHeader className="w-full bg-app_white">
          <TableRow className="w-full bg-app_white">
            <TableHead>
              <CheckSquare size={15} />
            </TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right">Gender</TableHead>
            <TableHead className="text-right">Avg Score</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students?.map(s => (
            <TableRow key={s.id}>
              <TableCell>
                <Checkbox
                  //   checked={hasSubmitted(s.id)}
                  onCheckedChange={() => {
                    // if (hasSubmitted(s.id)) return;
                    // toggleIsOpen();
                    // updateSelectedStudent(s);
                  }}
                />
              </TableCell>
              <TableCell className="font-medium">{s.firstName}</TableCell>
              <TableCell>{s.lastName}</TableCell>
              <TableCell>{s.age}</TableCell>
              <TableCell className="text-right">{s.gender}</TableCell>
              <TableCell className="text-right">67</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
