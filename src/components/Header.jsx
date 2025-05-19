import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthC";
 // Adjust the path as needed

const Header = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    signoutUser()
      .then(() => setShowLogout(false))
      .catch((error) => console.error(error));
  };

  return (
    <nav className="bg-green-200 p-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold text-green-800">Garden Hub</div>

      <ul className="flex space-x-4 items-center">
        <NavLink to="/" className="hover:text-green-600">Home</NavLink>
        <NavLink to="/share-tip" className="hover:text-green-600">Share a Garden Tip</NavLink>
        <NavLink to="/explore" className="hover:text-green-600">Explore Gardeners</NavLink>
        <NavLink to="/my-tips" className="hover:text-green-600">My Tips</NavLink>

        {!user ? (
          <NavLink to="/login" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
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
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-sm bg-white border rounded px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition">
              {user.displayName}
            </div>

            {showLogout && (
              <button
                onClick={handleLogout}
                className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded shadow"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Header;
