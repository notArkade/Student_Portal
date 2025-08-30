import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Attendance {
  studentId: number;
  studentName: string;
  studentRoll: number;
  attendanceDate: string;
}

const AddAttendance = () => {
  const [addAttendance, setAddAttendance] = useState<Attendance>({
    studentId: 0,
    studentName: "",
    studentRoll: 0,
    attendanceDate: "",
  });

  useEffect(() => {
    populateAttendanceData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddAttendance({
      ...addAttendance,
      [name]:
        name === "studentId" || name === "studentRoll"
          ? value === ""
            ? 0
            : Number(value)
          : value,
    });
  };

  const handleAddAttendance = async () => {
    const response = await fetch("https://localhost:7230/api/Attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addAttendance),
    });

    if (response.ok) {
      alert("Attendance added!");
      setAddAttendance({
        studentId: 0,
        studentName: "",
        studentRoll: 0,
        attendanceDate: "",
      });
      populateAttendanceData();
    } else {
      alert("Error adding attendance.");
    }
  };

  const attendanceForm =
    addAttendance === undefined ? (
      <p className="text-gray-500 text-lg mt-20">Loading . . .</p>
    ) : (
      <div className="w-full bg-white overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-gray-100 font-medium text-gray-600">
          <div className="py-3 px-4 text-center">Id</div>
          <div className="py-3 px-4 text-center">Name</div>
          <div className="py-3 px-4 text-center">Roll</div>
          <div className="py-3 px-4 text-center">Date</div>
          {/* <div className="py-3 px-4 text-center">Actions</div> */}
        </div>
        <div className="grid grid-cols-5 border-b border-gray-300 hover:bg-gray-50 transition text-blue-400">
          <div className="py-2 px-4">
            <input
              type="number"
              name="studentId" // ✅ matches state
              value={addAttendance.studentId ?? ""} // ✅ never undefined
              onChange={handleChange}
              placeholder="Id"
              className="border border-gray-400 text-gray-600 p-1 rounded w-full"
            />
          </div>
          <div className="py-2 px-4">
            <input
              type="text"
              name="studentName"
              value={addAttendance.studentName || ""}
              onChange={handleChange}
              placeholder="Name"
              className="border border-gray-400 text-gray-600 p-1 rounded w-full"
            />
          </div>
          <div className="py-2 px-4">
            <input
              type="number"
              name="studentRoll"
              value={addAttendance.studentRoll ?? ""}
              onChange={handleChange}
              placeholder="Roll"
              className="border border-gray-400 text-gray-600 p-1 rounded w-full"
            />
          </div>
          <div className="py-2 px-4">
            <DatePicker
              selected={
                addAttendance.attendanceDate
                  ? new Date(addAttendance.attendanceDate)
                  : null
              }
              onChange={(date: Date | null) =>
                setAddAttendance({
                  ...addAttendance,
                  attendanceDate: date ? date.toISOString().split("T")[0] : "",
                })
              }
              placeholderText="Select Date"
              className="border border-gray-400 text-gray-600 p-1 rounded w-full"
            />
          </div>
          <div className="py-2 px-4 flex justify-center">
            <button
              className="bg-blue-300 text-white w-full px-3 py-1 rounded hover:bg-blue-400 cursor-pointer"
              onClick={handleAddAttendance}
            >
              Add Attendance
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="w-[calc(100vw-16rem)]">
        <h1 className="text-[#3674B5] text-4xl md:text-6xl uppercase tracking-[0.3em] font-extralight my-10">
          Add/Update Attendance
        </h1>
        <div className="w-full">{attendanceForm}</div>
      </div>
    </>
  );

  async function populateAttendanceData() {
    const response = await fetch("https://localhost:7230/api/Attendance");
    if (response.ok) {
      const data = await response.json();
      setAddAttendance(data);
    } else {
      alert("Error fetching attendance data.");
    }
  }
};

export default AddAttendance;
