import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MovieCarousel from "./MovieCarousel";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <MovieCarousel />
      <main className="px-6 py-8 space-y-10">
        <Section title="🔥 인기 영화" />
        <Section title="🎞️ 최신 개봉작" />
        <Section title="🎭 장르별 추천" />
      </main>
    </div>
  );
}

// 영화 카드 리스트 Section
function Section({ title }: { title: string }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <MovieCard key={i} />
          ))}
      </div>
    </section>
  );
}

// 영화 카드
function MovieCard() {
  const navigate = useNavigate();

  const showMovieDetail = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <button
      onClick={() => showMovieDetail(1)}
      className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
    >
      <div className="aspect-[2/3] bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
        Poster
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          영화 제목
        </h3>
        <p className="text-xs text-gray-500 mt-1">2024 ・ 평점 ⭐ 4.3</p>
      </div>
    </button>
  );
}
