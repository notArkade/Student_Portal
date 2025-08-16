import { useEffect, useState } from "react";

interface Student {
  name: string;
  class: string;
  roll: number;
  gender: string;
}

function StudentRecords() {
  const [students, setStudents] = useState<Student[]>();

  useEffect(() => {
    populateStudentData();
  }, []);

  const studentTable =
    students === undefined ? (
      <p className="text-gray-500 text-lg">Loading . . .</p>
    ) : (
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-center text-gray-600 font-medium">
              Name
            </th>
            <th className="py-3 px-4 text-center text-gray-600 font-medium">
              Roll
            </th>
            <th className="py-3 px-4 text-center text-gray-600 font-medium">
              Class
            </th>
            <th className="py-3 px-4 text-center text-gray-600 font-medium">
              Gender
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.name}
              className="hover:bg-gray-50 transition-all duration-150 text-blue-400 cursor-pointer"
            >
              <td className="py-2 px-4 border-b border-gray-200">
                {student.name}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {student.roll}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {student.class}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {student.gender}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <>
      {/* <div className="min-h-screen flex flex-col items-center justify-center px-4"> */}
        <h1 className="text-[#3674B5] text-4xl md:text-6xl uppercase tracking-[0.3em] font-extralight mt-20 mb-10">
          Student Data
        </h1>
        <div className="w-full max-w-4xl">{studentTable}</div>
      {/* </div> */}
    </>
  );

  async function populateStudentData() {
    const response = await fetch("https://localhost:7230/Student");
    if (response.ok) {
      const data = await response.json();
      // console.log("Fetched: ", data)
      setStudents(data);
    } else {
      console.error("Unable to fetch students data.");
    }
  }
}
export default StudentRecords;
