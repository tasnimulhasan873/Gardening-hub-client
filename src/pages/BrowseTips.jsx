import { useEffect, useState } from "react";
import React from "react";

import { useNavigate } from "react-router-dom";
import { Eye, ChevronDown, ChevronUp } from "lucide-react";

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [expandedTipId, setExpandedTipId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/browse_tip")
      .then((res) => res.json())
      .then((data) => setTips(data))
      .catch((err) => console.error("Failed to fetch tips:", err));
  }, []);

  const toggleExpand = (tipId) => {
    setExpandedTipId(expandedTipId === tipId ? null : tipId);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        🌿 Public Gardening Tips
      </h2>

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
            {tips.map((tip) => (
              <React.Fragment key={tip._id}>
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={tip.imageUrl}
                      alt={tip.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">{tip.title}</td>
                  <td className="px-4 py-2">{tip.category}</td>
                  <td className="px-4 py-2">{tip.difficulty}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => navigate(`/tips/${tip._id}`)}
                      className="text-green-600 hover:text-green-800"
                      title="See More"
                    >
                      <Eye className="inline w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => toggleExpand(tip._id)}
                      className="text-green-600 hover:text-green-800"
                      title="Toggle Description"
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
            {tips.length === 0 && (
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
