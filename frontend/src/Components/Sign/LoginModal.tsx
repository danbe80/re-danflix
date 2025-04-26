/* 
  2025.04.24 
  로그인 모달창
*/ 

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// // import styled from "styled-components";
// import { authService } from "../firebaseConfig";

import { useEffect } from "react";

interface AuthModalProps {
  onClose: () => void;
  onSignupOpen: () => void;
}

function LoginModal({ onClose, onSignupOpen }: AuthModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.width = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-indigo-500 text-center">
          DANVIEW
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition"
          >
            로그인
          </button>
        </form>

        {/* 구분선 */}
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <hr className="flex-1" /> 또는 <hr className="flex-1" />
        </div>

        {/* 소셜 로그인 */}
        <div className="space-y-2">
          <SocialButton text="Google 계정으로 로그인" />
          <SocialButton text="GitHub 계정으로 로그인" />
        </div>

        <p className="text-sm text-gray-500 text-center">
          아직 회원이 아니신가요?
          <button
            onClick={onSignupOpen}
            className="text-indigo-500 hover:underline"
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
}

function SocialButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition"
    >
      {text}
    </button>
  );
}

export default LoginModal;
