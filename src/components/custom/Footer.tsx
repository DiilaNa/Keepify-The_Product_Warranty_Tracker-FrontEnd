import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Keepify</h2>
          <p className="text-gray-400">
            Keepify helps you track warranties and manage purchases easily.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/share/17YDSNkJHu/"
              className="hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/dilan_liyanaarachchi?igsh=MjU0YnV5c3ZlZGh0"
              className="hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/dilan-liyanaarachchi-8a0a01244?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bc%2BK5L1hJRC%2BSL5YbPl3EvQ%3D%3D"
              className="hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/#about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <p className="text-gray-400">
            301/B/02, Sri Sangananda Road, Raigama, Bandaragama
          </p>
          <p className="text-gray-400 mt-2">
            Email: liyanaarachchidilan@gmail.com
          </p>
          <p className="text-gray-400 mt-1">Phone: +94 713804825</p>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Keepify. All rights reserved.
      </div>
    </footer>
  );
}
