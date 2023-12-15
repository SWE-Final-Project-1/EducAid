import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { useCreatePreviewStore } from "../store/useCreatePreviewStore";

export const RubricTable = () => {
  const [criteria, setCriteria] = useState([
    {
      name: "Introduction",
      rating1: "",
      rating2: "",
      rating3: "",
      points: "/ pts",
    },
  ]);

  const [tableHtml, setTableHtml] = useState("");
  const { rubricTableHtml, updateRubricTableHtml } = useCreatePreviewStore();

  const addCriteria = () => {
    setCriteria([
      ...criteria,
      {
        name: "New Criteria",
        rating1: "",
        rating2: "",
        rating3: "",
        points: "/ pts",
      },
    ]);
  };

  const removeCriteria = index => {
    const updatedCriteria = [...criteria];
    updatedCriteria.splice(index, 1);
    setCriteria(updatedCriteria);
  };

  const handleInputChange = (index, field, value) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index][field] = value;
    setCriteria(updatedCriteria);
  };
  const handleSaveRubric = () => {
    const tableHtmlString = generateTableHtml(); // Function to generate table HTML
    setTableHtml(tableHtmlString);
    updateRubricTableHtml(tableHtmlString);
    console.log(tableHtml);

    // Now, you can send 'tableHtmlString' to your database or perform any other action
    // to save it in the database.
  };

  const generateTableHtml = () => {
    // Convert the criteria data to HTML string
    const tableDataHtml = criteria.map(
      c => `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                 <td class="border px-1 text-center outline-none py-3">${c.name}</td>
                 <td class="border px-1 text-center  outline-none py-3">${c.rating1}</td>
                 <td class="border px-1 text-center  outline-none py-3">${c.rating2}</td>
                 <td class="border px-1 text-center  outline-none py-3">${c.rating3}</td>
                 <td class="border px-1 text-center  outline-none py-3">${c.points}</td>
               </tr>`
    );

    return `<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-[0.4rem]">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class=" py-3 px-2 text-center border">
                    Criteria
                  </th>
                  <th colspan="3" class=" py-3 text-center border">
                    Rating
                  </th>
                  <th colspan="1" class=" py-3 text-center border">
                    Points
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
      <div className="w-full overflow-x-auto pb-5 px-5">
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-[0.4rem]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" py-3 px-2 text-center border">
                Criteria
              </th>
              <th colSpan={3} className=" py-3 text-center border">
                Rating
              </th>
              <th colSpan={1} className=" py-3 text-center border">
                Points
              </th>
              <th className="py-3 text-center border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((c, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className=" font-medium border text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <input
                    value={c.name}
                    onChange={e =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    className="bg-transparent px-1 border-none text-center outline-none py-3"
                    placeholder="New Criteria"
                  />
                </th>
                <td className="border">
                  <input
                    value={c.rating1}
                    onChange={e =>
                      handleInputChange(index, "rating1", e.target.value)
                    }
                    placeholder="Grade Explanation"
                    className="bg-transparent px-1 text-center border-none outline-none py-3"
                  />
                </td>
                <td className="border">
                  <input
                    value={c.rating2}
                    onChange={e =>
                      handleInputChange(index, "rating2", e.target.value)
                    }
                    placeholder="Grade Explanation"
                    className="bg-transparent px-1 border-none text-center outline-none py-3"
                  />
                </td>
                <td className="border">
                  <input
                    value={c.rating3}
                    onChange={e =>
                      handleInputChange(index, "rating3", e.target.value)
                    }
                    placeholder="Grade Explanation"
                    className="bg-transparent px-1 border-none text-center  outline-none py-3"
                  />
                </td>
                <td className="border">
                  <input
                    value={c.points}
                    onChange={e =>
                      handleInputChange(index, "points", e.target.value)
                    }
                    placeholder="Points"
                    className="bg-transparent px-1 border-none text-center outline-none py-3"
                  />
                </td>
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
          Criteria
        </button>
        <form method="dialog">
          <button
            className="flex font-logo border border-app_tertiary px-3 py-2 rounded-[0.4rem] bg-app_tertiary bg-opacity-10 text-app_tertiary items-center"
            onClick={handleSaveRubric}
          >
            Save Rubric
          </button>
        </form>
      </div>
    </>
  );
};
