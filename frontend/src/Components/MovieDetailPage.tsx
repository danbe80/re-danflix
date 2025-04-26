import { useState } from "react";

const bestReviews = [
  { id: 1, user: "hyerin_dev", rating: 5, comment: "정말 최고였어요!" },
  { id: 2, user: "movie_buff", rating: 4.5, comment: "스케일이 다름" },
  { id: 3, user: "cinema_fan", rating: 4, comment: "중반 조금 지루했지만 굿" },
  { id: 4, user: "dreamer", rating: 5, comment: "인생 영화" },
  { id: 5, user: "filmlover", rating: 4.5, comment: "기대 이상" },
];

export default function MovieDetail() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* 영화 소개 */}
      <div className="flex flex-col md:flex-row gap-6">
      <img src="/poster1.jpg" alt="포스터" className="w-full md:w-1/3 rounded-lg shadow-lg" />
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">듄: 파트 2</h2>
          <p className="text-sm text-gray-600">2024 ・ 액션, SF</p>
          <button
            onClick={() => alert('전체 평점 페이지로 이동 (현재는 없음)')}
            className="text-yellow-500 text-lg font-semibold hover:underline"
          >
            ⭐ 4.3점
          </button>
          <p className="mt-4 text-gray-700 text-sm leading-relaxed">
            위대한 여정을 떠나는 폴 아트레이드의 이야기를 그린 블록버스터.
          </p>
          <div className="flex gap-3 mt-6">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
              영화 보러가기
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              평점 남기기
            </button>
          </div>

        </div>
      </div>

      {/* BEST 평점 */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">BEST 평점</h3>
          <button className="text-xs text-indigo-500 hover:underline">
            더보기 →
          </button>
        </div>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        <section className="space-y-4">
          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
            {bestReviews.map((review) => (
              <div
                key={review.id}
                className="min-w-[200px] bg-white border border-gray-200 rounded-lg p-4 shadow flex-shrink-0"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-800">{review.user}</span>
                  <span className="text-yellow-500 text-sm">⭐ {review.rating}</span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}
