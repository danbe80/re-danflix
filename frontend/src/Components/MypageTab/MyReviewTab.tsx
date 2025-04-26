const dummyReviews = [
    { id: 1, title: "듄: 파트 2", poster: "/poster1.jpg", rating: 4.5 },
    { id: 2, title: "범죄도시 4", poster: "/poster2.jpg", rating: 4.0 },
  ];
  
  export default function MyReviewTab() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {dummyReviews.map((review) => (
          <div key={review.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
            <img src={review.poster} alt={review.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <h3 className="text-sm font-semibold">{review.title}</h3>
              <p className="text-xs text-yellow-500 mt-1">⭐ {review.rating}점</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  