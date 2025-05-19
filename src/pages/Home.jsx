import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const slides = [
  {
    id: 1,
    title: "Grow Together",
    button: "Get Started",
    image: "https://source.unsplash.com/1600x600/?garden,plants",
  },
  {
    id: 2,
    title: "Urban Gardening Made Simple",
    button: "Explore Now",
    image: "https://source.unsplash.com/1600x600/?urban-garden",
  },
  {
    id: 3,
    title: "Your Green Journey Starts Here",
    button: "Join Us",
    image: "https://source.unsplash.com/1600x600/?nature,gardening",
  },
];

const Home = () => {
  return (
    <div className="mt-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-black/40 px-6 py-2 rounded">
                {slide.title}
              </h2>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold transition">
                {slide.button}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;
