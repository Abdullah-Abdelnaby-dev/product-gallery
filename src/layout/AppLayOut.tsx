import { Outlet } from "react-router";
import DarkModeToggle from "../app/constans/DarkMode";

const AppLayOut = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all duration-300 p-6">
      <DarkModeToggle />

      <Outlet />
    </div>
  );
};

export default AppLayOut;
