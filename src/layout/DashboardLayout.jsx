// src/layout/DashboardLayout.jsx
import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-5 space-y-4 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <NavLink to="/dashboard" className="block hover:text-yellow-300">Home</NavLink>
        <NavLink to="/dashboard/manage-users" className="block hover:text-yellow-300">All Groups</NavLink>
        <NavLink to="/dashboard/my-articles" className="block hover:text-yellow-300">My Articels</NavLink>
        {/* <NavLink to="/dashboard/settings" className="block hover:text-yellow-300">Settings</NavLink> */}
        <Link to="/" className="block text-gray-300 hover:text-white mt-10">← Back to Home</Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
