import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 text-white flex items-center justify-between px-10 shadow-xs">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-gray-600 p-8 text-xl">Dashboard</h1>
        <div className="px-8">
          <RxHamburgerMenu className="text-gray-600 cursor-pointer" size={32} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
