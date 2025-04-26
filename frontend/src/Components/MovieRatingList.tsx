import { useState } from "react";

export default function MovieRatingList() {
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");


  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">🎬 듄: 파트 2 - 평점</h1>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">⭐ 4.3 / 5.0 ・ 총 128개 평점</p>
        <button className="bg-indigo-500 text-white text-sm px-4 py-2 rounded hover:bg-indigo-600">
          평점 쓰기
        </button>
      </div>

       {/* 필터 영역 */}
       <div className="flex flex-wrap gap-3 text-sm items-center">
        {/* 별점 필터 */}
        <div className="flex gap-2">
          {["all", 5, 4, 3, 2, 1].map((val) => (
            <button
              key={val}
              onClick={() => setRatingFilter(val.toString())}
              className={`px-3 py-1 rounded-full border ${
                ratingFilter === val.toString()
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {val === "all" ? "전체" : `⭐ ${val}`}
            </button>
          ))}
        </div>

        {/* 정렬 필터 */}
        <div className="ml-auto flex gap-2">
          {["latest", "popular"].map((type) => (
            <button
              key={type}
              onClick={() => setSortOrder(type)}
              className={`px-3 py-1 rounded-md border ${
                sortOrder === type
                  ? "bg-gray-800 text-white border-gray-800"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type === "latest" ? "최신순" : "인기순"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">
                user_{i + 1}
              </span>
              <span className="text-yellow-500 text-sm">
                ⭐ {4 + (i % 2) * 0.5}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              영화 진짜 재밌었어요. 스케일 대박... {i + 1}번째 리뷰입니다!
            </p>
            <p className="text-xs text-gray-400 mt-1">2025.04.22 작성</p>
          </div>
        ))}
      </div>
    </div>
  );
}
