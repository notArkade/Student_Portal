import { useState, useEffect } from "react";

interface Attendance {
    studentId: number;
    studentName: string;
    studentRoll: number;
    attendanceDate: string;
}

function AttendanceRecords() {
    const [attendances, setAttendances] = useState<Attendance[]>();

    useEffect(() => {
        populateAttendanceData();
    })

    const attendanceTable = 
  attendances === undefined ? (
    <p className="text-gray-500 text-lg">Loading attendance data . . .</p>
  ) : (
    <>
    <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-4 text-center text-gray-600 font-medium">Id</th>
          <th className="py-3 px-4 text-center text-gray-600 font-medium">Name</th>
          <th className="py-3 px-4 text-center text-gray-600 font-medium">Roll</th>
          <th className="py-3 px-4 text-center text-gray-600 font-medium">Date</th>
        </tr>
      </thead>
      <tbody>
        {attendances.map((attendance) => (
          <tr
            key={attendance.studentId}
            className="hover:bg-gray-50 transition-all duration-150 text-blue-400 cursor-pointer"
          >
            <td className="py-2 px-4 border-b border-gray-200">{attendance.studentId}</td>
            <td className="py-2 px-4 border-b border-gray-200">{attendance.studentName}</td>
            <td className="py-2 px-4 border-b border-gray-200">{attendance.studentRoll}</td>
            <td className="py-2 px-4 border-b border-gray-200">{attendance.attendanceDate}</td>
            {/* <td className="py-2 px-4 border-b border-gray-200">{attendance.status}</td> */}
          </tr>
        ))}
      </tbody>
    </table></>
  );

  return (
    <>
    <h1 className="text-[#3674B5] text-4xl md:text-6xl uppercase tracking-[0.3em] font-extralight mt-20 mb-10">
       Attendance Data
     </h1>
    <div className="w-full max-w-4xl">{attendanceTable}</div>
    </>
  )

    async function populateAttendanceData() {
        const respone = await fetch("https://localhost:7230/api/Attendance");
        if (respone.ok) {
            const data = await respone.json();
            setAttendances(data);
        } else {
            console.error("Unable to fetch attendance data.");
        }
    }
}

export default AttendanceRecords
