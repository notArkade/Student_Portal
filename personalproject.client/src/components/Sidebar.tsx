import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-300 flex flex-col shadow-xl z-20">
      <div className="p-8 text-xl font-bold border-b border-gray-200 uppercase tracking-[0.08em]">
        Student App
      </div>
      <ul>
        <Link to="/">
          <li className="p-4 hover:bg-gray-100 transition-colors">
            Student Records
          </li>
        </Link>
        <Link to="/attendanceRecords">
          <li className="p-4 hover:bg-gray-100 transition-colors">
            Attendance Records
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
