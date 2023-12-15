import { Info, Plus } from "lucide-react";
import { Button } from "../ui/ui/button";
import { Input } from "../ui/ui/input";
import Select from "react-select";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { api } from "@/api";
import { useContext, useState } from "react";
import { GENDERS } from "@/constants";
import { userContext } from "@/contexts/UserContext";
import { RotatingLines } from "react-loader-spinner";

export const EnrollSheet = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("Male");
  const { user, userLoading } = useContext(userContext);

  const queryClient = useQueryClient();
  const enrollMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/people/", {
        firstName,
        lastName,
        age,
        gender,
        instructorId: user?.id,
      });
      return data;
    },
    onSuccess: data => {
      console.log(data);
      toast(`${data?.firstName} Successfully Enrolled`, {
        icon: <Info />,
      });
      queryClient.invalidateQueries(["students"]);
    },
    onError: err => {
      console.log(err);
      toast(`Enroll Failed`, {
        icon: <Info />,
      });
    },
  });
  return (
    <div>
      <div className="space-y-3 mb-8">
        <div className="space-y-1">
          <span className="text-[12px] font-logo opacity-70">Firstname</span>
          <Input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            type="email"
            placeholder="Firstname"
            className="py-5"
          />
        </div>
        <div>
          <span className="text-[12px] font-logo opacity-70">Lastname</span>
          <Input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            type="text"
            placeholder="Lastname"
            className="py-5"
          />
        </div>
        <div>
          <span className="text-[12px] font-logo opacity-70">Age</span>
          {/* <Select/> */}
          <Input
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="Student's age"
            className="py-5"
          />
        </div>
        <div className="">
          <span className="text-[12px] font-logo opacity-70">Gender</span>
          <Select
            onChange={({ value, label }) => setGender(value)}
            options={GENDERS}
          />
        </div>

        <div className="w-full py-5 ">
          <Button
            onClick={() => {
              if (
                !firstName ||
                !lastName ||
                !age ||
                !gender
                // typeof age !== "number"
              ) {
                toast(`Some Form Fields are Invalid`, {
                  icon: <Info />,
                });
                return;
              }

              enrollMutation.mutate();
            }}
            className="w-full space-x-2 bg-slate-700"
          >
            {enrollMutation.isLoading ? (
              <RotatingLines strokeColor="white" width="15" />
            ) : (
              <>
                <Plus size={18} />
                <span>Enroll Student</span>
              </>
            )}
          </Button>
        </div>

        <div className="font-logo text-sm space-x-2 opacity-40 justify-center flex items-center">
          <Info size={15} />
          <span className="text-[12px] w-full">
            You can enroll a student by filling the form above
          </span>
        </div>
      </div>
    </div>
  );
};
