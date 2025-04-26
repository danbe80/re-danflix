import { useState } from "react";

interface Comment {
  id: number;
  user: {
    nickname: string;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
  isMine: boolean;
  likes: number;
}

export default function RatingDetailPage() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: { nickname: "hyerin_dev" },
      content: "와 이거 저도 진짜 감명 깊게 봤어요!",
      createdAt: "2025.04.22",
      isMine: true,
      likes: 3,
    },
    {
      id: 2,
      user: { nickname: "movie_fan22" },
      content: "저는 조금 지루했어요 ㅠㅠ",
      createdAt: "2025.04.21",
      isMine: false,
      likes: 0,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);

  const handleAdd = () => {
    if (newComment.trim()) {
      const newOne: Comment = {
        id: Date.now(),
        user: { nickname: "hyerin_dev" },
        content: newComment,
        createdAt: "2025.04.22",
        isMine: true,
        likes: 0,
      };
      setComments((prev) => [newOne, ...prev]);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
{/* 리뷰 헤더 */}
    <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div>
          <p className="text-sm font-semibold text-gray-800">hyerin_dev</p>
          <p className="text-xs text-gray-400">2025.04.22 작성</p>
        </div>
      </div>

      {/* 영화 + 평점 */}
     {/* 영화 정보 (유저 평점만 표시) */}
    <div className="text-sm text-gray-700 space-y-1 mt-2">
    {/* 영화 정보 + 유저 평점 */}
        <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
        <span className="text-lg">🎬</span>
        <span className="font-medium">듄: 파트 2</span>
        <span className="text-yellow-500 font-semibold">⭐ 4.5점</span>
        </div>
    </div>

      {/* 좋아요 버튼 */}
      <div>
        <button className="text-sm text-gray-600 hover:text-red-500 transition">
          ❤️ 공감 12
        </button>
      </div>
      {/* 댓글 리스트 */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">댓글</h3>
        {comments.slice(0, page * 5).map((c) => (
          <div key={c.id} className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{c.user.nickname}</p>
                <p className="text-xs text-gray-400">{c.createdAt}</p>
              </div>
              {c.isMine && (
                <div className="flex gap-2 text-xs text-gray-400">
                  <button className="hover:text-indigo-500">수정</button>
                  <button className="hover:text-red-500">삭제</button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-800 mt-2">{c.content}</p>
            <div className="mt-2 text-sm text-gray-600">
              ❤️ 공감 {c.likes}
            </div>
          </div>
        ))}

        {/* 더보기 버튼 */}
        {comments.length > page * 5 && (
          <div className="text-center">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="text-sm text-indigo-500 hover:underline"
            >
              댓글 더보기
            </button>
          </div>
        )}
      </div>

      {/* 댓글 입력창 */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          작성
        </button>
      </div>
    </div>
  );
}
