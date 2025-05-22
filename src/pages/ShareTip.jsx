import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthC";
import Swal from "sweetalert2"; 

const ShareTip = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficulty: "Easy",
    description: "",
    imageUrl: "",
    category: "Composting",
    availability: "Public",
    userEmail: user?.email || "",
    userName: user?.displayName || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gardening-tips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "🌿 Gardening tip submitted successfully!",
          icon: "success",
          confirmButtonColor: "#22c55e",
        });

        setFormData({
          title: "",
          plantType: "",
          difficulty: "Easy",
          description: "",
          imageUrl: "",
          category: "Composting",
          availability: "Public",
          userEmail: user?.email || "",
          userName: user?.displayName || "",
        });
      }
    } catch (err) {
      console.error("Error submitting tip:", err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while submitting the tip.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-white rounded-2xl shadow-lg border border-green-200">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🌱 Share Your Gardening Tip</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <input
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          name="title"
          placeholder="Tip Title"
          value={formData.title}
          required
          onChange={handleChange}
        />
        <input
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          name="plantType"
          placeholder="Plant Type / Topic"
          value={formData.plantType}
          onChange={handleChange}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <textarea
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          name="description"
          placeholder="Detailed Description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <input
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Composting</option>
          <option>Plant Care</option>
          <option>Vertical Gardening</option>
        </select>
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
        >
          <option>Public</option>
          <option>Hidden</option>
        </select>
        <input
          className="p-3 border border-gray-200 bg-gray-100 rounded-lg"
          name="userEmail"
          value={formData.userEmail}
          readOnly
        />
        <input
          className="p-3 border border-gray-200 bg-gray-100 rounded-lg"
          name="userName"
          value={formData.userName}
          readOnly
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 transition-all text-white py-3 px-6 rounded-xl font-semibold text-lg"
        >
          🚀 Submit Tip
        </button>
      </form>
    </div>
  );
};

export default ShareTip;
