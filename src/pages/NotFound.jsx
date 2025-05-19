import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-green-800 mb-2">Oops! Page Not Found</h2>
      <p className="text-green-700 mb-6 max-w-md">
        The page you're looking for doesn’t exist or has been moved. Let's get you back to the garden.
      </p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
      >
        Back to Home
      </Link>

      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="Lost in the garden"
        className="w-64 mt-10"
      />
    </div>
  );
};

export default NotFound;
