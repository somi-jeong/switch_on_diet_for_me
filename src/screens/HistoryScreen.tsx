import React from 'react';
import { ArrowLeft, MessageCircle, Calendar } from 'lucide-react';

export default function HistoryScreen({ onBack }) {
  const history = [
    { date: '2026.03.13', title: '2일차 식단 피드백', preview: '어제는 탄수화물을 너무 많이 드셨어요...' },
    { date: '2026.03.12', title: '1일차 시작 응원', preview: '스위치온 다이어트 시작을 축하합니다!' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f6f8f7] z-50">
      <header className="px-5 py-4 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800">AI 코치 히스토리</h1>
        <div className="w-10"></div>
      </header>

      <div className="p-5 space-y-4 flex-1 overflow-y-auto">
        {history.map((item, idx) => (
          <button key={idx} className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-left hover:border-[#13ec92]/50 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#13ec92]/10 rounded-full flex items-center justify-center text-emerald-600">
                  <MessageCircle size={14} />
                </div>
                <span className="font-bold text-slate-800 text-sm">{item.title}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                <Calendar size={12} />
                {item.date}
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed pl-10 pr-4 truncate">
              {item.preview}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
