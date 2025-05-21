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
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        My Gardening Tips ({tips.length})
      </h2>

      {tips.length === 0 ? (
        <p className="text-gray-500">You haven't shared any tips yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead className="bg-green-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tips.map((tip) => (
                <tr key={tip._id}>
                  <td className="py-2 px-4 border-b">{tip.title}</td>
                  <td className="py-2 px-4 border-b capitalize">
                    {tip.status || 'private'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(tip.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button
                      onClick={() => handleUpdate(tip._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTips;
