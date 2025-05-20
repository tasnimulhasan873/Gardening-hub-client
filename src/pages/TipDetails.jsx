import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import Swal from "sweetalert2";

const TipDetails = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:3000/browse_tip/${id}`)
      .then((res) => res.json())
      .then((data) => setTip(data))
      .catch((err) => console.error("Failed to load tip details:", err));
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/browse_tip/like/${id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        setTip((prev) => ({ ...prev, totalLiked: prev.totalLiked + 1 }));
        Swal.fire("Liked!", "You liked this tip.", "success");
      }
    } catch (err) {
      console.error("Error liking the tip:", err);
    }
  };

  if (!tip) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-green-50 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-green-700 mb-4">{tip.title}</h2>
      <img src={tip.imageUrl} alt={tip.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p className="mb-2"><strong>Category:</strong> {tip.category}</p>
      <p className="mb-2"><strong>Plant Type:</strong> {tip.plantType}</p>
      <p className="mb-2"><strong>Difficulty:</strong> {tip.difficulty}</p>
      <p className="mb-4"><strong>Description:</strong> {tip.description}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 bg-pink-100 hover:bg-pink-200 px-3 py-1 rounded text-pink-600"
        >
          <Heart className="w-4 h-4" /> Like
        </button>
        <span className="text-sm text-gray-600">Total Likes: {tip.totalLiked || 0}</span>
      </div>
    </div>
  );
};

export default TipDetails;
