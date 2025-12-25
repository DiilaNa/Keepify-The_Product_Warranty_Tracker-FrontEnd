import { Link } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";

export function NavBarComponent() {
  const role = localStorage.getItem("role");
  const accessToken = localStorage.getItem("accessToken");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        <Link to="/">
        Keepify
        </Link>
      </div>

      {/* Hamburger button */}
      <button
        className="md:hidden text-gray-900 dark:text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {/* Desktop menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <a href="/#about" className="hover:text-blue-600 transition">
          About
        </a>
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
        {!accessToken && !role && (
          <Link to="/login" className="hover:text-blue-600 transition">
            Login
          </Link>
        )}
      </div>

      {/* Mobile slide-in menu (from right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-gray-900 dark:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <IconX size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 px-6 mt-4">
          <Link
            to="/"
            className="hover:text-blue-500 transition py-2 text-gray-900 dark:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <a href="/#about"
            className="hover:text-blue-500 transition py-2 text-gray-900 dark:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          {accessToken && role === "USER" && (
            <Link
              to="/user"
              className="hover:text-blue-500 transition py-2 text-gray-900 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {accessToken && role === "ADMIN" && (
            <Link
              to="/admin"
              className="hover:text-blue-500 transition py-2 text-gray-900 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}
          {!accessToken && !role && (
            <Link
              to="/login"
              className="hover:text-blue-500 transition py-2 text-gray-900 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
