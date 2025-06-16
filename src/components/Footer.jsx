import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-300 border-t dark:border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo + Description */}
        <div>
          <Link to="/" className="text-3xl font-extrabold flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <span role="img" aria-label="book">📘</span>
            <span>EduSphere</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Discover articles, share ideas, and grow together. <br />Your gateway to a world of knowledge!
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/about-us" className="hover:text-blue-600 transition">About Us</Link>
            <Link to="/contact-us" className="hover:text-blue-600 transition">Contact Us</Link>
            <Link to="/faq-section" className="hover:text-blue-600 transition">Question & Query</Link>
          </div>
        </div>

        {/* Socials + Copyright */}
        <div className="flex flex-col gap-4 items-start md:items-end">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-blue-600 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 transition"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-pink-500 dark:hover:bg-gray-700 text-pink-600 dark:text-pink-400 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-blue-400 dark:hover:bg-gray-700 text-blue-400 dark:text-blue-300 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-blue-700 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-500 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            &copy; {new Date().getFullYear()} <span className="font-medium">KnowledgeHub</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
