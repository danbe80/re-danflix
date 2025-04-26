import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  {
    id: 1,
    url: "/poster1.jpg",
    title: "가디언즈 오브 갤럭시 Vol.3",
  },
  {
    id: 2,
    url: "/poster2.jpg",
    title: "듄: 파트 2",
  },
  {
    id: 3,
    url: "/poster3.jpg",
    title: "범죄도시4",
  },
];

export default function MovieCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    navigate(`/movies/${images[current].id}`);
  };
  return (
    <div className="relative w-full h-[60vh] bg-black overflow-hidden shadow-md mb-10">
      {images.map((img, index) => (
        <div
          key={img.id}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${img.url})` }}
        >
          <div className="w-full h-full bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold mb-4">{img.title}</h2>
            <button
              onClick={handleClick}
              className="self-start bg-white text-indigo-600 font-semibold px-4 py-2 rounded hover:bg-indigo-100 transition"
            >
              자세히 보기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
