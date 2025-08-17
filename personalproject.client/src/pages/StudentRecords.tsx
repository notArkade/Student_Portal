import { useEffect, useState } from "react";

interface Student {
  name: string;
  class: string;
  roll: string;
  gender: string;
}

function StudentRecords() {
  const [students, setStudents] = useState<Student[]>();
  const [newStudent, setNewStudent] = useState<Student>({
    name: "",
    class: "",
    roll: "",
    gender: "",
  });

  useEffect(() => {
    populateStudentData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: name === "roll" || name === "class" ? Number(value) : value,
    });
  };

  const handleAddStudent = async () => {
    const response = await fetch("https://localhost:7230/Student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });

    if (response.ok) {
      alert("Student added!");
      setNewStudent({ name: "", class: "", roll: "", gender: "" });
      populateStudentData(); // refresh table
    } else {
      alert("Error adding student.");
    }
  };

  const studentTable =
    students === undefined ? (
      <p className="text-gray-500 text-lg">Loading . . .</p>
    ) : (
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-center text-gray-600 font-medium">Name</th>
            <th className="py-3 px-4 text-center text-gray-600 font-medium">Roll</th>
            <th className="py-3 px-4 text-center text-gray-600 font-medium">Class</th>
            <th className="py-3 px-4 text-center text-gray-600 font-medium">Gender</th>
            <th className="py-3 px-4 text-center text-gray-600 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition-all duration-150 text-blue-400 cursor-pointer"
            >
              <td className="py-2 px-4 border-b border-gray-200">{student.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{student.roll}</td>
              <td className="py-2 px-4 border-b border-gray-200">{student.class}</td>
              <td className="py-2 px-4 border-b border-gray-200">{student.gender}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-gray-500">—</td>
            </tr>
          ))}

          {/* New Student Row */}
          <tr className="bg-gray-100">
            <td className="py-2 px-4 border-b border-gray-200">
              <input
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleChange}
                placeholder="Name"
                className="border border-gray-400 text-gray-400 p-1 rounded w-full"
              />
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              <input
                type="number"
                name="roll"
                value={newStudent.roll}
                onChange={handleChange}
                placeholder="Roll"
                className="border border-gray-400 text-gray-300 p-1 rounded w-full"
              />
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              <input
                type="number"
                name="class"
                value={newStudent.class}
                onChange={handleChange}
                placeholder="Class"
                className="border border-gray-400 text-gray-300 p-1 rounded w-full"
              />
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              <select
                name="gender"
                value={newStudent.gender}
                onChange={handleChange}
                className="border border-gray-400 text-gray-400 p-1 rounded w-full"
              >
                <option value="">Select {""}</option>
                <option value="Male">M</option>
                <option value="Female">F</option>
              </select>
            </td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">
              <button
                onClick={handleAddStudent}
                className="bg-[#3674B5] text-white px-3 py-1 rounded hover:bg-[#6889ac] transition cursor-pointer"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );

  return (
    <>
      <h1 className="text-[#3674B5] text-4xl md:text-6xl uppercase tracking-[0.3em] font-extralight mt-20 mb-10">
        Student Data
      </h1>
      <div className="w-full max-w-4xl">{studentTable}</div>
    </>
  );

  async function populateStudentData() {
    const response = await fetch("https://localhost:7230/Student");
    if (response.ok) {
      const data = await response.json();
      setStudents(data);
    } else {
      console.error("Unable to fetch students data.");
    }
  }
}

export default StudentRecords;
