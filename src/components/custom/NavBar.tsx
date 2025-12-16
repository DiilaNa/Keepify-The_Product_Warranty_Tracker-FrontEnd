import { Link } from "react-router-dom";

export function NavBarComponent() {
  const role = localStorage.getItem("role");
  const accessToken = localStorage.getItem("accessToken");

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        Keepify
      </div>

      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>

        <Link to="#" className="hover:text-blue-600 transition">
          About
        </Link>

        {/* ------------------ ROLE BASED LINKS ------------------ */}
        {accessToken && role === "USER" && (
          <Link to="/user" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
        )}

        {accessToken && role === "ADMIN" && (
          <Link to="/admin" className="hover:text-blue-600 transition">
            Admin Panel
          </Link>
        )}

        {!accessToken && !role  && (
          <Link to="/login" className="hover:text-blue-600 transition">
            Login
          </Link>
        )}
        {/* ------------------------------------------------------ */}

      
      </div>
    </nav>
  );
}
