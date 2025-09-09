// import { useState, useEffect } from "react";

// interface Attendance {
//     studentId: number;
//     studentName: string;
//     studentRoll: number;
//     attendanceDate: string;
// }

// function AttendanceRecords() {
//     const [attendances, setAttendances] = useState<Attendance[]>();

//     useEffect(() => {
//         populateAttendanceData();
//     })

//     const attendanceTable = 
//   attendances === undefined ? (
//     <p className="text-gray-500 text-lg mt-20">Loading attendance data . . .</p>
//   ) : (
//     <>
//     <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="py-3 px-4 text-center text-gray-600 font-medium">Id</th>
//           <th className="py-3 px-4 text-center text-gray-600 font-medium">Name</th>
//           <th className="py-3 px-4 text-center text-gray-600 font-medium">Roll</th>
//           <th className="py-3 px-4 text-center text-gray-600 font-medium">Date</th>
//         </tr>
//       </thead>
//       <tbody>
//         {attendances.map((attendance) => (
//           <tr
//             key={attendance.studentId}
//             className="hover:bg-gray-50 transition-all duration-150 text-blue-400 cursor-pointer"
//           >
//             <td className="py-2 px-4 border-b border-gray-200">{attendance.studentId}</td>
//             <td className="py-2 px-4 border-b border-gray-200">{attendance.studentName}</td>
//             <td className="py-2 px-4 border-b border-gray-200">{attendance.studentRoll}</td>
//             <td className="py-2 px-4 border-b border-gray-200">{attendance.attendanceDate}</td>
//             {/* <td className="py-2 px-4 border-b border-gray-200">{attendance.status}</td> */}
//           </tr>
//         ))}
//       </tbody>
//     </table></>
//   );

//   return (
//     <>
//     <h1 className="text-[#3674B5] text-4xl md:text-6xl uppercase tracking-[0.3em] font-extralight mt-20 mb-10">
//        Attendance Data
//      </h1>
//     <div className="w-full max-w-4xl">{attendanceTable}</div>
//     </>
//   )

//     async function populateAttendanceData() {
//         const respone = await fetch("https://localhost:7230/api/Attendance");
//         if (respone.ok) {
//             const data = await respone.json();
//             setAttendances(data);
//         } else {
//             console.error("Unable to fetch attendance data.");
//         }
//     }
// }

// export default AttendanceRecords

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
  }, []);

  const attendanceTable =
    attendances === undefined ? (
      <p className="text-gray-500 text-lg mt-20">Loading attendance data . . .</p>
    ) : (
      <div className="w-full bg-white overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-gray-100 font-medium text-gray-600">
          <div className="py-3 px-4 text-center">ID</div>
          <div className="py-3 px-4 text-center">Name</div>
          <div className="py-3 px-4 text-center">Roll</div>
          <div className="py-3 px-4 text-center">Date</div>
        </div>

        {/* Data Rows */}
        {attendances.map((attendance, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 border-b border-gray-300 hover:bg-gray-50 transition text-blue-400"
          >
            <div className="py-2 px-4 text-center">{attendance.studentId}</div>
            <div className="py-2 px-4 text-center">{attendance.studentName}</div>
            <div className="py-2 px-4 text-center">{attendance.studentRoll}</div>
            <div className="py-2 px-4 text-center">{attendance.attendanceDate}</div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="w-[calc(100vw-16rem)]">
      {/* <h1 className="text-[#3674B5] text-4xl md:text-6xl uppercase tracking-[0.3em] font-extralight my-10">
        Attendance Data
      </h1> */}
      <div className="w-full">{attendanceTable}</div>
    </div>
  );

  async function populateAttendanceData() {
    const response = await fetch("https://localhost:7230/api/Attendance");
    if (response.ok) {
      const data = await response.json();
      setAttendances(data);
    } else {
      console.error("Unable to fetch attendance data.");
    }
  }
}

export default AttendanceRecords;
