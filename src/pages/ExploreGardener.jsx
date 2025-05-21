import React from 'react';
import { useEffect, useState } from "react";

const ExploreGardener = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const res = await fetch("http://localhost:3000/explore_gardeners");
        const data = await res.json();
        setGardeners(data);
      } catch (err) {
        console.error("Error fetching gardeners:", err);
      }
    };

    fetchGardeners();
  }, []);

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

