import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="fixed left-64 mt-16">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
