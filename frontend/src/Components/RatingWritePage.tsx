import { useState } from "react";

export default function RatingWritePage() {
  const [score, setScore] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    console.log("별점:", score);
    console.log("리뷰:", review);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      {/* 영화 정보 */}
      <div className="flex items-center gap-4">
            <img
            src="/poster1.jpg"
            alt="포스터"
            className="w-24 h-36 object-cover rounded"
        />
        <div className="flex flex-col justify-between h-full">
            <div>
            <h2 className="text-2xl font-bold text-gray-900">듄: 파트 2</h2>
            <p className="text-sm text-gray-500">2024 ・ 액션, SF</p>
            </div>
            <div className="mt-2">
            <span className="text-yellow-500 text-sm font-medium">⭐ 4.3 / 5.0</span>
            <span className="ml-2 text-sm text-gray-500">(리뷰 128개)</span>
            </div>
        </div>
      </div>

      {/* 별점 선택 */}
      <div>
        <p className="text-sm text-gray-600 mb-1">별점을 선택해주세요</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              onClick={() => setScore(i)}
              className={`text-3xl ${
                score >= i ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <p className="text-sm mt-1 text-gray-500">선택한 평점: {score}점</p>
      </div>

      {/* 리뷰 입력 */}
      <div>
        <textarea
          rows={4}
          maxLength={200}
          placeholder="한 줄 리뷰를 남겨보세요 (200자 이내)"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
        />
        <p className="text-xs text-gray-400 text-right mt-1">
          {review.length} / 200
        </p>
      </div>

      {/* 제출 버튼 */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition"
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
