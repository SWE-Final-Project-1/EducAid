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
import { useUploadStore } from "../store/useUploadStore";
import { Button } from "../ui/ui/button";

export const StudentSheet = ({
  students,
  submissions,
  studentsLoading,
  submissionLoading,
  notSheet,
  heading,
}) => {
  const {
    toggleIsOpen,
    isOpen,
    updateSelectedStudent,
    updateSelectedAssignment,
  } = useUploadStore();
  const hasSubmitted = studentId => {
    return submissions?.some(s => s.studentId === studentId);
  };
  return (
    <>
      {notSheet && <divi className="font-logo text-[20px]">{heading}</divi>}
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
          {students?.map(s => (
            <TableRow key={s.id}>
              <TableCell>
                <Checkbox
                  checked={hasSubmitted(s.id)}
                  onCheckedChange={() => {
                    if (hasSubmitted(s.id)) return;
                    toggleIsOpen();
                    updateSelectedStudent(s);
                  }}
                />
              </TableCell>
              <TableCell className="font-medium">{s.firstName}</TableCell>
              <TableCell>{s.lastName}</TableCell>
              <TableCell>{s.age}</TableCell>
              <TableCell className="text-right">{s.gender}</TableCell>
              <TableCell className="text-right">
                {hasSubmitted(s.id) ? "Graded" : "Ungraded"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
      {!notSheet ? (
        <Button
          onClick={() => {
            toggleIsOpen();
            updateSelectedStudent(null);
            updateSelectedAssignment(null);
          }}
          className="w-full mt-5 sticky bottom-3"
        >
          Cancel
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};
