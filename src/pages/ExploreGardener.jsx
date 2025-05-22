import React, { useEffect, useState } from "react";

const ExploreGardener = () => {
  const [gardeners, setGardeners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGardeners = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/explore_gardeners`);
        if (!res.ok) throw new Error("Failed to fetch gardeners");
        const data = await res.json();
        setGardeners(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGardeners();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-emerald-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="mt-6 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-emerald-700">
        🌱 Explore Gardeners
      </h2>

      {gardeners.length === 0 ? (
        <p className="text-center text-gray-500">No gardeners found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gardeners.map((gardener, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg p-6 border border-emerald-100 transition duration-300"
            >
              <img
                src={gardener.image}
                alt={gardener.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {gardener.name}
              </h3>
              <p className="text-sm text-emerald-600 mb-1">
                🌿 Specialty: {gardener.specialty}
              </p>
              <p className="text-sm text-gray-600">
                📍 {gardener.location} | 🧠 {gardener.experience} yrs
              </p>
              <p className="text-sm text-gray-600 mt-1">
                👤 {gardener.gender}, {gardener.age} yrs old
              </p>
              <p className="text-sm text-gray-600 mt-1">
                📝 Tips Shared:{" "}
                <span className="font-semibold text-emerald-700">
                  {gardener.totalSharedTips}
                </span>
              </p>
              <p
                className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  gardener.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {gardener.status.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreGardener;
