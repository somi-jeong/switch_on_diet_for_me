import React from 'react';

export default function DietScreen() {
  return (
    <div className="h-full overflow-y-auto hide-scrollbar px-5 py-8 pb-32">
      <h2 className="text-2xl font-black mb-2">주차별 식단 가이드</h2>
      <p className="text-sm text-slate-500 mb-6">스위치온 다이어트 4주 플랜</p>

      <div className="bg-[#13ec92]/10 rounded-3xl p-5 border border-[#13ec92]/30 mb-4 relative overflow-hidden">
        <div className="flex justify-between items-center mb-2 relative z-10">
          <h3 className="text-lg font-bold text-emerald-900">1주차 (1~3일)</h3>
          <span className="text-xs font-bold bg-[#13ec92] text-slate-900 px-2 py-1 rounded-full">현재 단계</span>
        </div>
        <p className="text-sm font-bold text-emerald-800 mb-1 relative z-10">장 비우기 (위장관 휴식)</p>
        <p className="text-[11px] text-emerald-700 leading-relaxed relative z-10 mb-3">
          탄수화물을 제한하고 단백질 쉐이크로 섭취하며 위장관에 휴식을 주는 기간입니다.
        </p>
        <div className="bg-white/60 rounded-xl p-3 relative z-10">
          <p className="text-xs font-bold text-slate-800 mb-1">식단표</p>
          <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
            아침/점심/간식/저녁 모두 <span className="font-bold text-emerald-700">단백질 쉐이크 1컵</span>
          </p>
          <p className="text-xs font-bold text-slate-800 mb-1 mt-2">허용 식품 (배고플 때)</p>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            플레인 요거트, 두부, 양배추, 무, 당근, 오이, 브로콜리, 파프리카 등 채소류
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-slate-100 mb-4 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-1">1주차 (4~7일)</h3>
        <p className="text-sm font-bold text-slate-600 mb-1">지방 대사 활성화</p>
        <div className="bg-slate-50 rounded-xl p-3 mt-3">
          <p className="text-xs font-bold text-slate-700 mb-1">식단 변경점</p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            점심에 한해 <span className="font-bold text-slate-700">현미잡곡밥 2/3공기</span> 또는 흰쌀밥 1/2공기 + 채소/단백질 반찬 허용
          </p>
        </div>
      </div>
    </div>
  );
}
