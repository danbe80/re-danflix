const dummyBookmarks = [
    { id: 1, title: "가디언즈 오브 갤럭시", poster: "/poster3.jpg" },
    { id: 2, title: "위시", poster: "/poster4.jpg" },
  ];
  
  export default function BookmarkTab() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {dummyBookmarks.map((movie) => (
          <div key={movie.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
            <img src={movie.poster} alt={movie.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <h3 className="text-sm font-semibold">{movie.title}</h3>
              <p className="text-xs text-gray-400 mt-1">⭐ 보고싶다</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  