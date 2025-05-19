import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthC";
import logo from "../assets/logo.jpeg"; 

const Header = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    signoutUser()
      .then(() => setShowLogout(false))
      .catch((error) => console.error(error));
  };

  return (
    <nav className="bg-green-200 p-4 shadow-md flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-8 h-8 object-cover" />
        <span className="text-xl font-bold text-green-800">Garden Hub</span>
      </div>

      {/* Centered Nav Links */}
      <ul className="flex space-x-6 justify-center flex-1">
        <NavLink to="/" className={({ isActive }) => isActive ? "isActive" : ""}>
          Home
        </NavLink>

        {user && (
          <>
            <NavLink to="/share-tip" className={({ isActive }) => isActive ? "isActive" : ""}>
              Share a Garden Tip
            </NavLink>
            <NavLink to="/my-tips" className={({ isActive }) => isActive ? "isActive" : ""}>
              My Tips
            </NavLink>
          </>
        )}

        <NavLink to="/explore" className={({ isActive }) => isActive ? "isActive" : ""}>
          Explore Gardeners
        </NavLink>
      </ul>

      {/* Login or User Section */}
      {!user ? (
        <NavLink
          to="/login"
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Login / Signup
        </NavLink>
      ) : (
        <div
          className="relative group cursor-pointer"
          onClick={() => setShowLogout(!showLogout)}
        >
          <img
            src={user.photoURL}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-green-700"
            title={user.displayName}
          />
          {/* Name on hover */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-sm bg-white border rounded px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition pointer-events-none">
            {user.displayName}
          </div>

          {/* Logout button */}
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
    </nav>
  );
};

export default Header;
