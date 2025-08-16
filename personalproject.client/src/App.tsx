// import { useEffect, useState } from "react";
// import "./App.css";

// //interface Forecast {
// //    date: string;
// //    temperatureC: number;
// //    temperatureF: number;
// //    summary: string;
// //}

// interface Student {
//   name: string;
//   class: string;
//   roll: number;
//   gender: string;
// }

// interface Attendance {
//   studentId: number;
//   studentName: string;
//   studentRoll: number;
//   attendanceDate: string;
// }

// function App() {
//   //const [forecasts, setForecasts] = useState<Forecast[]>();
//   const [students, setStudents] = useState<Student[]>();
//   const [attendances, setAttendances] = useState<Attendance[]>();

//   useEffect(() => {
//     populateStudentData();
//   }, []);
//   useEffect(() => {
//     populateAttendanceData();
//   }, []);

//   //useEffect(() => {
//   //    populateWeatherData();
//   //}, []);

//   //const contents = forecasts === undefined
//   //    ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//   //    :
//   //    <table className="table table-striped" aria-labelledby="tableLabel">
//   //        <thead>
//   //            <tr>
//   //                <th className="text-4xl">Date</th>
//   //                <th>Temp. (C)</th>
//   //                <th>Temp. (F)</th>
//   //                <th>Summary</th>
//   //            </tr>
//   //        </thead>
//   //        <tbody>
//   //            {forecasts.map(forecast =>
//   //                <tr key={forecast.date}>
//   //                    <td>{forecast.date}</td>
//   //                    <td>{forecast.temperatureC}</td>
//   //                    <td>{forecast.temperatureF}</td>
//   //                    <td>{forecast.summary}</td>
//   //                </tr>
//   //            )}
//   //        </tbody>
//   //    </table>;

//   //return (
//   //    <div>
//   //        <h1 id="tableLabel">Weather forecast</h1>
//   //        <p>This component demonstrates fetching data from the server.</p>
//   //        {contents}
//   //    </div>
//   //);

//   //async function populateWeatherData() {
//   //    const response = await fetch('weatherforecast');
//   //    if (response.ok) {
//   //        const data = await response.json();
//   //        setForecasts(data);
//   //    }
//   //}

//   const contents =
//   students === undefined ? (
//     <p className="text-gray-500 text-lg">Loading . . .</p>
//   ) : (
//     <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="py-3 px-4 text-center text-gray-600 font-medium">Name</th>
//           <th className="py-3 px-4 text-center text-gray-600 font-medium">Roll</th>
//           <th className="py-3 px-4 text-center text-gray-600 font-medium">Class</th>
//           <th className="py-3 px-4 text-center text-gray-600 font-medium">Gender</th>
//         </tr>
//       </thead>
//       <tbody>
//         {students.map((student) => (
//           <tr
//             key={student.name}
//             className="hover:bg-gray-50 transition-all duration-150 text-blue-400 cursor-pointer"
//           >
//             <td className="py-2 px-4 border-b border-gray-200">{student.name}</td>
//             <td className="py-2 px-4 border-b border-gray-200">{student.roll}</td>
//             <td className="py-2 px-4 border-b border-gray-200">{student.class}</td>
//             <td className="py-2 px-4 border-b border-gray-200">{student.gender}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   const attendanceTable = 
//   attendances === undefined ? (
//     <p className="text-gray-500 text-lg">Loading attendance data . . .</p>
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

// return (
//   <div className="min-h-screen flex flex-col items-center justify-center px-4">
//     <h1 className="text-[#3674B5] text-4xl md:text-6xl uppercase tracking-[0.3em] font-extralight mb-10">
//       Student Data
//     </h1>
//     <div className="w-full max-w-4xl">{contents}</div>
//     
//   </div>
// );


//   async function populateStudentData() {
//     const response = await fetch("https://localhost:7230/Student");
//     if (response.ok) {
//       const data = await response.json();
//       // console.log("Fetched: ", data)
//       setStudents(data);
//     } else {
//       console.error("Unable to fetch students data.");
//     }
//   }
//   async function populateAttendanceData() {
//     const response = await fetch("https://localhost:7230/api/Attendance");
//     if (response.ok) {
//       const data = await response.json();
//       console.log("Fetched: ", data)
//       setAttendances(data);
//     } else {
//       console.error("Unable to fetch attendance data.");
//     }
//   }
// }

// export default App;

import AppRoutes from './routes/AppRoutes'

const App = () => {

  return (<>
  <main>
    <AppRoutes />
  </main>
  </>
  )
}

export default App
