
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateTip = () => {
  const { id } = useParams();
  const [tipData, setTipData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/tip/${id}`)
      .then((res) => res.json())
      .then((data) => setTipData(data))
      .catch((err) => console.error('Error loading tip:', err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const status = form.status.value;

    const updatedTip = { title, description, status };

    fetch(`${import.meta.env.VITE_API_BASE_URL}/tip/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTip),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire('Success', 'Tip updated successfully!', 'success');
          navigate('/my-tips');
        }
      })
      .catch((err) => Swal.fire('Error', 'Failed to update tip.', 'error'));
  };

  if (!tipData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Update Your Gardening Tip</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <div>
          <label className="block mb-1 font-medium">User Email</label>
          <input
            type="text"
            value={tipData.userEmail}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={tipData.title}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={tipData.description}
            rows="5"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            defaultValue={tipData.status}
            className="w-full border rounded px-3 py-2"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          Update Tip
        </button>
      </form>
    </div>
  );
};

export default UpdateTip;
