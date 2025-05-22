import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ChevronDown, ChevronUp } from "lucide-react";

const difficulties = ["All", "Easy", "Medium", "Hard"];

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [expandedTipId, setExpandedTipId] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/browse_tip`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tips");
        return res.json();
      })
      .then((data) => setTips(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const toggleExpand = (tipId) => {
    setExpandedTipId(expandedTipId === tipId ? null : tipId);
  };

  const sortedTips = [...tips].sort((a, b) => {
    if (filterDifficulty === "All") return 0;
    if (a.difficulty === filterDifficulty && b.difficulty !== filterDifficulty) return -1;
    if (b.difficulty === filterDifficulty && a.difficulty !== filterDifficulty) return 1;
    return 0;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">Error: {error}</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">🌿 Public Gardening Tips</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold text-green-700">Filter by Difficulty:</label>
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>{diff}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Difficulty</th>
              <th className="px-4 py-3 text-center">Action</th>
              <th className="px-4 py-3 text-center">Expand</th>
            </tr>
          </thead>
          <tbody>
            {sortedTips.map((tip) => (
              <React.Fragment key={tip._id}>
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img src={tip.imageUrl} alt={tip.title} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  <td className="px-4 py-2">{tip.title}</td>
                  <td className="px-4 py-2">{tip.category}</td>
                  <td className="px-4 py-2">{tip.difficulty}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => navigate(`/tipDetails/${tip._id}`)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Eye className="inline w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => toggleExpand(tip._id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      {expandedTipId === tip._id ? (
                        <ChevronUp className="inline w-5 h-5" />
                      ) : (
                        <ChevronDown className="inline w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedTipId === tip._id && (
                  <tr className="bg-green-50">
                    <td colSpan="6" className="px-4 py-4 text-gray-700">
                      <strong>Description:</strong> {tip.description}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {sortedTips.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No public tips found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseTips;
