import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [gardeners, setGardeners] = useState([]);
  const [trendingTips, setTrendingTips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slideRes = await fetch("/details.json");
        const slideData = await slideRes.json();
        setSlides(slideData);

        const gardenersRes = await fetch("http://localhost:3000/active-gardeners");
        const gardenersData = await gardenersRes.json();
        setGardeners(gardenersData);

        const tipsRes = await fetch("http://localhost:3000/top-trending-tips");
        const tipsData = await tipsRes.json();
        setTrendingTips(tipsData);
      } catch (err) {
        console.error("Data fetching error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-4 px-4 md:px-8">
      {/* Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-black/40 px-6 py-2 rounded-xl">
                {slide.title}
              </h2>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-semibold transition duration-300">
                {slide.button}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Featured Gardeners */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
          🌿 Featured Gardeners
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gardeners.map((gardener, index) => (
            <div
              key={index}
              className="bg-white hover:shadow-xl shadow-md rounded-xl p-6 border border-gray-100 transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={gardener.image || "https://i.ibb.co/7n6XZ1M/profile.png"}
                  alt={gardener.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{gardener.name}</h3>
                  <p className="text-green-600 text-sm">{gardener.specialty}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">📍 {gardener.location || "Unknown"}</p>
              <p className="text-sm text-gray-600 mt-1">
                {gardener.experience}+ years experience
              </p>
            </div>
          ))}
        </div>
      </section>

    {/* Top Trending Tips */}
<section className="my-12">
  <h2 className="text-3xl font-bold text-center mb-8 text-emerald-700">
    🌟 Top Trending Tips
  </h2>
  {trendingTips.length === 0 ? (
    <p className="text-center text-gray-500">No trending tips available.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {trendingTips.map((tip, index) => (
        <div
          key={index}
          className="bg-white hover:shadow-xl shadow-md rounded-xl p-6 border border-emerald-100 transition duration-300 flex flex-col"
        >
          {/* Gardener Info */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={tip.image || "https://i.ibb.co/7n6XZ1M/profile.png"}
              alt={tip.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{tip.name}</h3>
              <p className="text-sm text-emerald-600">{tip.specialty}</p>
            </div>
          </div>

          {/* Tip Content */}
          <p className="text-gray-600 text-sm flex-1">
            {tip.description}
          </p>

          {/* Shared Tips Count */}
          <div className="mt-4 text-right text-sm text-emerald-600 font-semibold">
            ❤️ {tip.totalSharedTips || 0} Tips Shared
          </div>
        </div>
      ))}
    </div>
  )}
</section>



      {/* Gardening Benefits */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-lime-700">
           Gardening Benefits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🧘‍♀️",
              title: "Reduces Stress",
              desc: "Spending time in nature lowers cortisol levels and promotes relaxation.",
            },
            {
              icon: "💪",
              title: "Physical Fitness",
              desc: "Gardening keeps you active through digging, lifting, and planting.",
            },
            {
              icon: "🌿",
              title: "Fresh Produce",
              desc: "Grow your own organic vegetables and herbs for a healthy diet.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gardening Tools & Resources */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-emerald-700">
          🛠 Gardening Tools & Resources
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[
            {
              icon: "🧤",
              title: "Gloves",
              desc: "Protects your hands while digging or pruning.",
            },
            {
              icon: "🌱",
              title: "Seed Starter",
              desc: "Get your seedlings off to a strong start indoors.",
            },
            {
              icon: "💧",
              title: "Watering Can",
              desc: "A must-have for precise watering without soil washout.",
            },
            {
              icon: "✂️",
              title: "Pruners",
              desc: "Keep your plants tidy and encourage healthy growth.",
            },
            {
              icon: "🧺",
              title: "Harvest Basket",
              desc: "Collect fruits, veggies, or herbs from your garden.",
            },
          ].map((tool, index) => (
            <div
              key={index}
              className="min-w-[240px] bg-white border rounded-xl shadow-md p-4 flex-shrink-0 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-2">{tool.icon}</div>
              <h3 className="text-lg font-bold text-gray-800">{tool.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
