import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-300 border-t dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo & Description */}
        <div>
          {/* <Link
            to="/"
            className="text-3xl font-extrabold flex items-center gap-2 text-blue-600 dark:text-blue-400"
          >
            <span role="img" aria-label="book">📘</span>
            <span>EduSphere</span>
          </Link> */}

          <Link
           to="/" 
          className="text-3xl font-extrabold flex items-center gap-2 text-blue-600 dark:text-blue-400">
  <img src="/public/educational.png" alt="book" className="w-8 h-8" />
  <span>EduSphere</span>
</Link>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Discover articles, share ideas, and grow together. <br />
            Your gateway to a world of knowledge!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/all-articles"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                All Articles
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/faq-section"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                FAQ & Query
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Follow Us
          </h3>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white transition"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-pink-500 hover:text-white transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-blue-400 hover:text-white transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-blue-700 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center md:text-right">
            &copy; {new Date().getFullYear()} <span className="font-medium">EduSphere</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
