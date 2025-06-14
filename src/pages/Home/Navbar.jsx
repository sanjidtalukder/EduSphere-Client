import { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = () => {
    logOut();
    localStorage.removeItem('access-token');
    navigate('/');
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            isActive ? 'font-bold underline' : ''
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/all-articles"
        className={({ isActive }) =>
          `px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            isActive ? 'font-bold underline' : ''
          }`
        }
      >
        All Articles
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/my-articles"
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? 'font-bold underline' : ''
              }`
            }
          >
            My Articles
          </NavLink>
          <NavLink
            to="/post-articles"
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? 'font-bold underline' : ''
              }`
            }
          >
            Post Article
          </NavLink>
        </>
      )}
      <NavLink
        to="/about-us"
        className={({ isActive }) =>
          `px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            isActive ? 'font-bold underline' : ''
          }`
        }
      >
        About Us
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span role="img" aria-label="book">📘</span>
          <span>KnowledgeHub</span>
        </Link>

        <div className="hidden md:flex gap-4">{navLinks}</div>

        <div className="flex items-center gap-4 relative">
          <button
            onClick={handleThemeToggle}
            className="text-xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
             <img
  src={user?.photoURL || '/default-avatar.png'}
  alt="profile"
  className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
/>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg z-50">
                  <NavLink
                    to="/my-articles"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Articles
                  </NavLink>
                  <NavLink
                    to="/post"
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
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden px-4 py-2 flex flex-col gap-2">{navLinks}</div>
    </nav>
  );
};

export default Navbar;
