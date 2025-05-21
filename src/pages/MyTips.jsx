import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyTips = ({ userEmail }) => {
  const [myTips, setMyTips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:3000/my-tips?email=${encodeURIComponent(userEmail)}`)
      .then((res) => res.json())
      .then((data) => setMyTips(data))
      .catch((err) => console.error("Error loading tips:", err));
  }, [userEmail]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This tip will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:3000/my-tips/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          setMyTips(myTips.filter(tip => tip._id !== id));
          Swal.fire("Deleted!", "Your tip has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">🌱 My Gardening Tips</h2>
      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Availability</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myTips.length > 0 ? (
              myTips.map((tip) => (
                <tr key={tip._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{tip.title}</td>
                  <td className="px-4 py-2">{tip.category}</td>
                  <td className="px-4 py-2">{tip.availability}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => navigate(`/update-tip/${tip._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(tip._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-4 py-4 text-gray-500">
                  No tips found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTips;
