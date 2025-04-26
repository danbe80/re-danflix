export default function UserInfoTab() {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-300" />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900">hyerin_dev</p>
            <p className="text-sm text-gray-500">hyerin@example.com</p>
            <button className="text-sm text-indigo-500 hover:underline mt-2">회원정보 수정</button>
          </div>
        </div>
  
        {/* 탈퇴 */}
        <div className="text-xs text-red-500 text-right mt-10">
          <button className="hover:underline">회원 탈퇴</button>
          <p className="text-[10px] text-gray-400 mt-1">
            탈퇴 시 모든 데이터가 삭제됩니다.
          </p>
        </div>
      </div>
    );
  }
  