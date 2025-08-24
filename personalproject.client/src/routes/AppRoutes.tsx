import { Route, Routes } from "react-router-dom";
import StudentRecords from "../pages/StudentRecords";
import AttendanceRecords from "../pages/AttendanceRecords";
import Layout from "../components/Layout";
import AddAttendance from "../pages/AddAttendance";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StudentRecords />} />
        <Route path="attendanceRecords" element={<AttendanceRecords />} />
        <Route path="addAttendance" element={<AddAttendance />} />
        <Route></Route>
        <Route></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
