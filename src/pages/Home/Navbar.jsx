import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") === "dark" ? "dark" : "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut();
    localStorage.removeItem("access-token");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const navLinks = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/all-articles", label: "All Articles" },
        ...(user
          ? [
              { to: "/my-articles", label: "My Articles" },
              { to: "/post-articles", label: "Post Article" },
            ]
          : []),
        { to: "/about-us", label: "About Us" },
        { to: "/contact-us", label: "Contact Us" },
        { to: "/faq-section", label: "Questions & Quary" },
      ].map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) =>
            `block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              isActive ? "font-bold underline text-blue-600 dark:text-blue-400" : ""
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
       <Link to="/" className="text-3xl font-extrabold flex items-center gap-2 text-blue-600 dark:text-blue-400">
  <img src="/public/educational.png" alt="book" className="w-8 h-8" />
  <span>EduSphere</span>
</Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">{navLinks}</div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Switch */}
          <label className="flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              className="toggle"
              onChange={handleThemeChange}
              checked={theme === "dark"}
              aria-label="Toggle dark mode"
            />
            <span className="ml-2 text-lg">{theme === "dark" ? "🌙" : "☀️"}</span>
          </label>

          {/* User / Login Button */}
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <NavLink
                    to="/my-articles"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Articles
                  </NavLink>
                  <NavLink
                    to="/post-articles"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Post Article
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-2xl ml-2"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 flex flex-col gap-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-all">
          {navLinks}
          {user && (
            <button
              onClick={handleLogout}
              className="mt-2 px-3 py-2 text-left bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
