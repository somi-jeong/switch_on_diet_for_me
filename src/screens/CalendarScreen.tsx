import React from 'react';
import { Check } from 'lucide-react';

export default function CalendarScreen() {
  const days = Array.from({ length: 28 }, (_, i) => {
    const dayNum = i + 1;
    if (dayNum === 1 || dayNum === 2) return 'done';
    if (dayNum === 3) return 'today';
    return 'future';
  });

  return (
    <div className="h-full overflow-y-auto hide-scrollbar px-5 py-8 pb-32">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900">28일 챌린지</h2>
          <p className="text-sm text-slate-500 mt-1">현재 진행률 <span className="font-bold text-[#13ec92]">10%</span></p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-[#13ec92]/20 rounded-full flex items-center justify-center text-3xl shadow-sm border border-[#13ec92]/30 mb-1">
            🌱
          </div>
          <span className="text-[10px] font-bold text-emerald-700">새싹 다이어터</span>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6">
        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
            <div key={i} className="text-[10px] font-bold text-slate-400">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((status, i) => {
            let btnClass = "aspect-square rounded-xl flex items-center justify-center text-sm transition-all ";
            if (status === 'done') {
              btnClass += "bg-[#13ec92] text-slate-900 font-bold shadow-sm";
            } else if (status === 'today') {
              btnClass += "bg-white border-2 border-[#13ec92] text-[#13ec92] font-black shadow-sm scale-110 z-10";
            } else {
              btnClass += "bg-slate-50 border border-slate-100 text-slate-400";
            }
            
            return (
              <div key={i} className={btnClass}>
                {status === 'done' ? <Check size={16} strokeWidth={3} /> : i + 1}
              </div>
            );
          })}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-4 mt-8">주차별 현황</h3>
      <div className="space-y-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#13ec92]/30 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#13ec92]"></div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-slate-800">1주차 (장 비우기)</span>
            <span className="text-xs font-bold text-[#13ec92]">진행중 42%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#13ec92] h-full rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 opacity-60">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-500">2주차 (가속기)</span>
            <span className="text-xs font-medium text-slate-400">예정</span>
          </div>
        </div>
      </div>
    </div>
  );
}
