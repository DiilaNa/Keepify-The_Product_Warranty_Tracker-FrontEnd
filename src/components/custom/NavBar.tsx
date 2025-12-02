import { Link } from "react-router-dom";
import { ThemeToggle } from "./DropDown";
// import { MobileMenuToggle } from "./MobileMenuToggle";

export function NavBarComponent() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        Keepify
      </div>
      <div className="hidden md:flex space-x-6 items-center">
        <a href="#" className="hover:text-blue-600 transition">
          Home
        </a>
        <a href="#" className="hover:text-blue-600 transition">
          About
        </a>
        <a href="#" className="hover:text-blue-600 transition">
          Login
        </a>
        <ThemeToggle />
        <Link to="/login">hi</Link>
      </div>
      {/* <div className="md:hidden">
        <MobileMenuToggle />
      </div>  */}
    </nav>
  );
}
