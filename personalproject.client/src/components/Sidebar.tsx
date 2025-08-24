import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-300 flex flex-col shadow-xl z-20">
      <div className="p-8 text-xl font-bold border-b border-gray-200 uppercase tracking-[0.08em]">
        Student App
      </div>
      <ul>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block p-4 transition-colors ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            Student Records
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/attendanceRecords"
            className={({ isActive }) =>
              `block p-4 transition-colors ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            Attendance Records
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/addAttendance"
            className={({ isActive }) =>
              `block p-4 transition-colors ${
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
              }`
            }
          >
            Add Attendance
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
