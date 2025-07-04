import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthC";
import logo from "../assets/logo.jpeg";

const Header = ({ toggleTheme, theme }) => {
  const { user, signoutUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signoutUser()
      .then(() => setShowLogout(false))
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => (isActive ? "isActive" : "")}>Home</NavLink>
      <NavLink to="/browse_tip" className={({ isActive }) => (isActive ? "isActive" : "")}>Browse Tip</NavLink>
      {user && (
        <>
          <NavLink to="/gardening-tips" className={({ isActive }) => (isActive ? "isActive" : "")}>Share a Garden Tip</NavLink>
          <NavLink to="/tipDetails" className={({ isActive }) => (isActive ? "isActive" : "")}>Tip Details</NavLink>
          <NavLink to="/my-tips" className={({ isActive }) => (isActive ? "isActive" : "")}>My Tips</NavLink>
          <NavLink to="/update-tip" className={({ isActive }) => (isActive ? "isActive" : "")}>Update Tip</NavLink>
        </>
      )}
      <NavLink to="/explore_gardeners" className={({ isActive }) => (isActive ? "isActive" : "")}>Explore Gardeners</NavLink>
    </>
  );

  return (
    <nav className="bg-green-200 dark:bg-gray-900 p-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8 object-cover" />
          <span className="text-xl font-bold text-green-800 dark:text-white">Garden Hub</span>
        </div>

        {/* Hamburger button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6 text-green-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Nav links (hidden on mobile) */}
        <ul className="hidden md:flex space-x-6 items-center text-green-700 dark:text-white">
          {navLinks}
        </ul>

        {/* Login/User + Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <NavLink to="/login" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
              Login / Signup
            </NavLink>
          ) : (
            <div className="relative group cursor-pointer" onClick={() => setShowLogout(!showLogout)}>
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-green-700"
                title={user.displayName}
              />
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white border rounded px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition pointer-events-none">
                {user.displayName}
              </div>

              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="absolute top-1 right-2/3 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded shadow"
                >
                  Logout
                </button>
              )}
            </div>
          )}

          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border border-green-600 text-green-700 bg-white hover:bg-green-100 dark:bg-gray-700 dark:text-white dark:border-gray-400 dark:hover:bg-gray-600"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 text-green-800 dark:text-white">
          <ul className="flex flex-col space-y-2">{navLinks}</ul>

          {/* Mobile Login/User */}
          <div>
            {!user ? (
              <NavLink
                to="/login"
                className="inline-block bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Login / Signup
              </NavLink>
            ) : (
              <div className="mt-2">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowLogout(!showLogout)}>
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-green-700"
                    title={user.displayName}
                  />
                  <span>{user.displayName}</span>
                </div>
                {showLogout && (
                  <button
                    onClick={handleLogout}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded shadow"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Mobile) */}
          <div className="mt-2">
            <button
              onClick={toggleTheme}
              className="w-full px-3 py-1 rounded border border-green-600 text-green-700 bg-white hover:bg-green-100 dark:bg-gray-700 dark:text-white dark:border-gray-400 dark:hover:bg-gray-600"
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
