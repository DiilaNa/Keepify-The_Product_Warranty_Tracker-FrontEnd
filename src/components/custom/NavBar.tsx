import { Link } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";

export function NavBarComponent() {
  const role = localStorage.getItem("role");
  const accessToken = localStorage.getItem("accessToken");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between
      px-6 py-4
      bg-white/90 dark:bg-[#0d0f12]/90
      backdrop-blur-md
      border-b border-gray-200 dark:border-gray-800"
    >
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white">
        <Link to="/" className="hover:opacity-90 transition">
          Keepify
        </Link>
      </div>

      {/* Hamburger button */}
      <button
        className="md:hidden text-gray-800 dark:text-gray-200 hover:text-blue-500 transition"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Home
        </Link>

        <a
          href="/#about"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          About
        </a>

        {accessToken && role === "USER" && (
          <Link
            to="/user"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Dashboard
          </Link>
        )}

        {accessToken && role === "ADMIN" && (
          <Link
            to="/admin"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Admin Panel
          </Link>
        )}

        {!accessToken && !role && (
          <Link
            to="/login"
            className="ml-2 rounded-full px-5 py-2
            bg-blue-600 text-white
            hover:bg-blue-700 transition shadow-sm"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile slide-in menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72
        bg-white dark:bg-[#0d0f12]
        border-l border-gray-200 dark:border-gray-800
        shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        md:hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu
          </span>
          <button
            className="text-gray-700 dark:text-gray-300 hover:text-red-500 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            <IconX size={22} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col px-6 py-6 space-y-2">
          <Link
            to="/"
            className="rounded-lg px-4 py-3 text-gray-800 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <a
            href="/#about"
            className="rounded-lg px-4 py-3 text-gray-800 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>

          {accessToken && role === "USER" && (
            <Link
              to="/user"
              className="rounded-lg px-4 py-3 text-gray-800 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          {accessToken && role === "ADMIN" && (
            <Link
              to="/admin"
              className="rounded-lg px-4 py-3 text-gray-800 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}

          {!accessToken && !role && (
            <Link
              to="/login"
              className="rounded-lg px-4 py-3 text-gray-800 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
