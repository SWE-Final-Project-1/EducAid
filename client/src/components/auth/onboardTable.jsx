import React, { useState } from "react";
import { useCreatePreviewStore } from "../store/useCreatePreviewStore";
import { Plus, Trash } from "lucide-react";

export const OnboardTable = () => {
  const [students, setStudents] = useState([
    {
      givenName: "",
      surName: "",
      age: "",
      gender: "",
    },
  ]);

  const [tableHtml, setTableHtml] = useState("");
  const { rubricTableHtml, updateRubricTableHtml } = useCreatePreviewStore();

  const addCriteria = () => {
    setStudents([
      ...students,
      {
        givenName: "",
        surName: "",
        age: "",
        gender: "",
      },
    ]);
  };

  const removeCriteria = index => {
    const updatedCriteria = [...students];
    updatedCriteria.splice(index, 1);
    setStudents(updatedCriteria);
  };

  const handleInputChange = (index, field, value) => {
    const updatedCriteria = [...students];
    updatedCriteria[index][field] = value;
    setStudents(updatedCriteria);
  };
  const handleSaveRubric = () => {
    const tableHtmlString = generateTableHtml(); // Function to generate table HTML
    setTableHtml(tableHtmlString);
    updateRubricTableHtml(tableHtmlString);
    console.log(tableHtml);
  };

  const generateTableHtml = () => {
    // Convert the students data to HTML string
    const tableDataHtml = students.map(
      c => `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                 <td class="border px-1 text-center outline-none py-3">${c.givenName}</td>
                 <td class="border px-1 text-center  outline-none py-3">${c.surName}</td>
                 <td class="border px-1 text-center  outline-none py-3">${c.age}</td>
                 <td class="border px-1 text-center  outline-none py-3">${c.gender}</td>
               </tr>`
    );

    return `<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-[0.4rem]">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class=" py-3 px-2 text-center border">
                    Given Name
                  </th>
                  <th  class=" py-3 text-center border">
                    Sur Name
                  </th>
                  <th  class=" py-3 text-center border">
                    Age
                  </th>
                  <th class=" py-3 text-center border">
                    Gender
                  </th>
                </tr>
              </thead>
              <tbody>
                ${tableDataHtml.join("")}
              </tbody>
            </table>`;
  };
  return (
    <>
      <div className="relative overflow-x-auto pb-5">
        <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-[0.4rem]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" py-3 px-2 text-center border">
                GivenName
              </th>
              <th className=" py-3 text-center border">SurName</th>
              <th className=" py-3 text-center border">Age</th>
              <th className=" py-3 text-center border">Gender</th>
              <th className="py-3 text-center border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((c, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className=" font-medium border text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <input
                    value={c.givenName}
                    onChange={e =>
                      handleInputChange(index, "givenName", e.target.value)
                    }
                    className="bg-transparent px-1 border-none text-center outline-none font-normal py-3"
                    placeholder="Givenname"
                  />
                </th>
                <td className="border">
                  <input
                    value={c.surName}
                    onChange={e =>
                      handleInputChange(index, "surName", e.target.value)
                    }
                    placeholder="Surname"
                    className="bg-transparent px-1 text-center border-none outline-none py-3"
                  />
                </td>
                <td className="border">
                  <input
                    value={c.age}
                    onChange={e =>
                      handleInputChange(index, "age", e.target.value)
                    }
                    placeholder="Age"
                    // pattern="[0-9]*"
                    // inputmode="numeric"
                    className="bg-transparent px-1 border-none text-center outline-none py-3"
                  />
                </td>
                <td className="border">
                  <input
                    value={c.gender}
                    onChange={e =>
                      handleInputChange(index, "gender", e.target.value)
                    }
                    placeholder="Male or Female"
                    className="bg-transparent px-1 border-none text-center  outline-none py-3"
                  />
                </td>
                {/* <td className="border">
                  <input
                    value={c.points}
                    onChange={e =>
                      handleInputChange(index, "points", e.target.value)
                    }
                    placeholder="Points"
                    className="bg-transparent px-1 border-none text-center outline-none py-3"
                  />
                </td> */}
                <td className="px-6 border text-center">
                  <button
                    className="flex font-semibold border border-app_tertiary p-1 rounded-[0.4rem] bg-app_tertiary bg-opacity-10 text-app_tertiary items-center"
                    onClick={() => removeCriteria(index)}
                  >
                    {/* <Plus size={18} /> */}
                    <Trash size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center py-4 space-x-5">
        <button
          className="flex  text-app_tertiary items-center"
          onClick={addCriteria}
        >
          <Plus size={18} />
          Student
        </button>
        <form method="dialog">
          <button
            className="flex font-logo border border-app_tertiary px-3 py-2 rounded-[0.4rem] bg-app_tertiary bg-opacity-10 text-app_tertiary items-center"
            onClick={handleSaveRubric}
          >
            Enroll Students
          </button>
        </form>
      </div>
    </>
  );
};
