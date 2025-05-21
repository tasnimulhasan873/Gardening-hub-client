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
    fetch("/details.json")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error loading slides:", err));
          fetch("http://localhost:3000/active-gardeners")
      .then((res) => res.json())
      .then((data) => setGardeners(data))
      .catch((err) => console.error("Error loading gardeners:", err));
    fetch("http://localhost:3000/top-trending-tips")
      .then((res) => res.json())
      .then((data) => setTrendingTips(data))
      .catch((err) => console.error("Error loading tips:", err));
  }, []);

  return (
    <div className="mt-4 px-4 md:px-8">
      {/* Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
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
                  <h3 className="text-xl font-bold text-gray-800">
                    {gardener.name}
                  </h3>
                  <p className="text-green-600 text-sm">{gardener.specialty}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">📍 {gardener.location}</p>
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
          Top Trending Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white hover:shadow-xl shadow-md rounded-xl p-6 border border-emerald-100 transition duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800">{tip.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">
                {tip.description?.slice(0, 100)}...
              </p>
              <div className="mt-4 flex items-center justify-between text-emerald-600 font-semibold">
                <span>❤️ {tip.totalLiked} Likes</span>
                <span className="text-xs">#Gardening</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
