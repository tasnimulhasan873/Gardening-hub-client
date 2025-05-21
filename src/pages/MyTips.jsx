import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyTips = () => {
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user?.email;

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:3000/my-tips?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => setTips(data))
        .catch((error) => console.error('Error loading tips:', error));
    }
  }, [userEmail]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This tip will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/my-tips/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your tip has been deleted.', 'success');
              setTips((prevTips) => prevTips.filter((tip) => tip._id !== id));
            }
          })
          .catch((error) => {
            console.error('Delete failed:', error);
            Swal.fire('Error', 'Failed to delete the tip.', 'error');
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/update-tip/${id}`);
  };

  return (
  <div className="max-w-6xl mx-auto mt-10 px-4">
    <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
      My Gardening Tips <span className="text-sm text-gray-600">({tips.length})</span>
    </h2>

    {tips.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">You haven't shared any tips yet.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
          <thead className="bg-green-100 text-green-900">
            <tr>
              <th className="py-3 px-25 text-left text-sm font-semibold uppercase tracking-wider">Title</th>
              <th className="py-3 px-9 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
              <th className="py-3 px-9 text-left text-sm font-semibold uppercase tracking-wider">Date</th>
              <th className="py-3 px-19 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tips.map((tip, index) => (
              <tr
                key={tip._id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-green-50 transition-all`}
              >
                <td className="py-3 px-25 border-b">{tip.title}</td>
                <td className="py-3 px-6 border-b">
                  <span
                    className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                      tip.status === 'public' ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {tip.status || 'private'}
                  </span>
                </td>
                <td className="py-3 px-6 border-b">
                  {new Date(tip.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 border-b flex space-x-2">
                  <button
                    onClick={() => handleUpdate(tip._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow"
                  >
                     Update
                  </button>
                  <button
                    onClick={() => handleDelete(tip._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

};

export default MyTips;
