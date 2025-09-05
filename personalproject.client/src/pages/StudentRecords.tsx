import { useEffect, useState } from "react";

interface Student {
  id?: number; // required for Update/Delete
  name: string;
  class?: number;
  roll?: number;
  gender: string;
}

function StudentRecords() {
  const [students, setStudents] = useState<Student[]>();
  const [newStudent, setNewStudent] = useState<Student>({
    name: "",
    class: undefined,
    roll: undefined,
    gender: "",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);

  useEffect(() => {
    populateStudentData();
  }, []);

  // Handle new student input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]:
        name === "roll" || name === "class"
          ? value === "" ? undefined : Number(value)
          : value,
    });
  };

  // Add student
  const handleAddStudent = async () => {
    const response = await fetch("https://localhost:7230/Student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });

    if (response.ok) {
      alert("Student added!");
      setNewStudent({ name: "", class: undefined, roll: undefined, gender: "" });
      populateStudentData();
    } else {
      alert("Error adding student.");
    }
  };

  // Start editing
  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditedStudent(students ? { ...students[index] } : null);
  };

  // Handle edit change
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editedStudent) return;
    const { name, value } = e.target;
    setEditedStudent({
      ...editedStudent,
      [name]:
        name === "roll" || name === "class"
          ? value === "" ? undefined : Number(value)
          : value,
    });
  };

  // Update student
  const handleUpdateStudent = async () => {
    if (!editedStudent || !editedStudent.id) return;

    const response = await fetch(
      `https://localhost:7230/Student?id=${editedStudent.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedStudent),
      }
    );

    if (response.ok) {
      alert("Student updated!");
      setEditingIndex(null);
      setEditedStudent(null);
      populateStudentData();
    } else {
      alert("Error updating student.");
    }
  };

  // Delete student
  const handleDeleteStudent = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    const response = await fetch(`https://localhost:7230/Student?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Student deleted!");
      populateStudentData();
    } else {
      alert("Error deleting student.");
    }
  };

  const studentTable =
    students === undefined ? (
      <p className="text-gray-500 text-lg mt-20">Loading . . .</p>
    ) : (
      <div className="w-full bg-white overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 bg-gray-100 font-medium text-gray-600">
          <div className="py-3 px-4 text-center">Name</div>
          <div className="py-3 px-4 text-center">Roll</div>
          <div className="py-3 px-4 text-center">Class</div>
          <div className="py-3 px-4 text-center">Gender</div>
          <div className="py-3 px-4 text-center">Actions</div>
        </div>

        {/* Data Rows */}
        {students.map((student, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 border-b border-gray-300 hover:bg-gray-50 transition text-blue-400"
          >
            {editingIndex === idx ? (
              <>
                <div className="py-2 px-4">
                  <input
                    type="text"
                    name="name"
                    value={editedStudent?.name ?? ""}
                    onChange={handleEditChange}
                    className="border border-gray-400 p-1 rounded w-full"
                  />
                </div>
                <div className="py-2 px-4">
                  <input
                    type="number"
                    name="roll"
                    value={editedStudent?.roll ?? ""}
                    onChange={handleEditChange}
                    className="border border-gray-400 p-1 rounded w-full"
                  />
                </div>
                <div className="py-2 px-4">
                  <input
                    type="number"
                    name="class"
                    value={editedStudent?.class ?? ""}
                    onChange={handleEditChange}
                    className="border border-gray-400 p-1 rounded w-full"
                  />
                </div>
                <div className="py-2 px-4">
                  <select
                    name="gender"
                    value={editedStudent?.gender ?? ""}
                    onChange={handleEditChange}
                    className="border border-gray-400 p-1 rounded w-full"
                  >
                    <option value="">Select</option>
                    <option value="Male">M</option>
                    <option value="Female">F</option>
                  </select>
                </div>
                <div className="py-2 px-4 flex justify-center space-x-4">
                  <button
                    onClick={handleUpdateStudent}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="py-2 px-4">{student.name}</div>
                <div className="py-2 px-4">{student.roll}</div>
                <div className="py-2 px-4">{student.class}</div>
                <div className="py-2 px-4">{student.gender}</div>
                <div className="py-2 px-4 flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditClick(idx)}
                    className="border border-blue-300 text-blue-300 px-3 py-1 rounded hover:bg-blue-300 hover:text-white cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="border border-red-300 text-red-300 px-3 py-1 rounded hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {/* New Student Row */}
        <div className="grid grid-cols-5 py-2 bg-gray-100">
          <div className="py-2 px-4">
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleChange}
              placeholder="Name"
              className="border border-gray-400 text-gray-600 p-1 rounded w-full"
            />
          </div>
          <div className="py-2 px-4">
            <input
              type="number"
              name="roll"
              value={newStudent.roll ?? ""}
              onChange={handleChange}
              placeholder="Roll"
              className="border border-gray-400 text-gray-600 p-1 rounded w-full"
            />
          </div>
          <div className="py-2 px-4">
            <input
              type="number"
              name="class"
              value={newStudent.class ?? ""}
              onChange={handleChange}
              placeholder="Class"
              className="border border-gray-400 text-gray-600 p-1 rounded w-full"
              required
            />
          </div>
          <div className="py-2 px-4">
            <select
              name="gender"
              value={newStudent.gender}
              onChange={handleChange}
              className="border border-gray-400 text-gray-400 p-1 rounded w-full"
            >
              <option value="">Select</option>
              <option value="Male">M</option>
              <option value="Female">F</option>
            </select>
          </div>
          <div className="py-2 px-4 flex justify-center">
            <button
              onClick={handleAddStudent}
              className="bg-blue-300 text-white w-full px-3 py-1 rounded hover:bg-blue-400 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-[calc(100vw-16rem)]">
      <h1 className="text-[#3674B5] text-4xl md:text-6xl uppercase tracking-[0.3em] font-extralight my-10">
        Student Data
      </h1>
      <div className="w-full">{studentTable}</div>
    </div>
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
