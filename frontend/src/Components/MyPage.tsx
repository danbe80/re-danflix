// 📁 src/pages/Mypage.tsx
import { useState } from "react";
import UserInfoTab from "./MypageTab/UserInfoTab";
import MyReviewTab from "./MypageTab/MyReviewTab";
import BookmarkTab from "./MypageTab/BookmarkTab";

export default function Mypage() {
  const [activeTab, setActiveTab] = useState<"info" | "review" | "bookmark">("info");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">마이페이지</h1>

      <div className="flex gap-3 border-b mb-6">
        <button
          onClick={() => setActiveTab("info")}
          className={`pb-2 ${activeTab === "info" ? "border-b-2 border-indigo-500 font-semibold" : "text-gray-500"}`}
        >
          회원 정보
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`pb-2 ${activeTab === "review" ? "border-b-2 border-indigo-500 font-semibold" : "text-gray-500"}`}
        >
          내가 쓴 리뷰
        </button>
        <button
          onClick={() => setActiveTab("bookmark")}
          className={`pb-2 ${activeTab === "bookmark" ? "border-b-2 border-indigo-500 font-semibold" : "text-gray-500"}`}
        >
          보고싶다
        </button>
      </div>

      {activeTab === "info" && <UserInfoTab />}
      {activeTab === "review" && <MyReviewTab />}
      {activeTab === "bookmark" && <BookmarkTab />}
    </div>
  );
}
