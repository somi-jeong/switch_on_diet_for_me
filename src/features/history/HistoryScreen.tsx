import React from 'react';
import { ChevronLeft, MessageSquare, Calendar, Search, ChevronRight, Sparkles, Award } from 'lucide-react';

interface HistoryScreenProps {
  onBack: () => void;
}

export default function HistoryScreen({ onBack }: HistoryScreenProps) {
  const historyData = [
    {
      id: 1,
      type: 'weekly',
      dayLabel: '1주차 총평',
      date: '2026.03.19',
      topic: '1주차 장 비우기 성공적 완료!',
      preview: '첫 주차를 무사히 넘기셨네요! 탄수화물 제한이 힘들었을 텐데 정말 잘하셨습니다. 2주차부터는 점심에 현미밥이 허용되니 조금 더 수월할 거예요.',
      tags: ['1주차완료', '칭찬', '다음주안내']
    },
    {
      id: 2,
      type: 'daily',
      dayLabel: '3일차',
      date: '2026.03.15',
      topic: '3일차 데일리 총평',
      preview: '오늘 기상 시간이 조금 늦었지만, 식단은 완벽하게 지켜주셨어요! 내일부터는 점심에 일반식이 허용됩니다.',
      tags: ['식단완벽', '수면주의']
    },
    {
      id: 3,
      type: 'daily',
      dayLabel: '2일차',
      date: '2026.03.14',
      topic: '2일차 데일리 총평',
      preview: '점심에 떡볶이를 드셨군요 😭 탄수화물은 인슐린 분비를 자극해 지방 대사를 방해합니다. 내일은 꼭 쉐이크를 드셔주세요!',
      tags: ['탄수화물주의', '격려']
    },
    {
      id: 4,
      type: 'daily',
      dayLabel: '1일차',
      date: '2026.03.13',
      topic: '1일차 데일리 총평',
      preview: '첫날 식단을 완벽하게 지키셨네요! 공복 시간 14시간도 잘 유지하셨습니다. 이대로만 쭉 가볼까요?',
      tags: ['완벽', '공복유지']
    }
  ];

  return (
    <div className="absolute inset-0 bg-[#f6f8f7] z-50 flex flex-col animate-in slide-in-from-right-full duration-300">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800">AI 코치 피드백</h1>
        <div className="w-10"></div>
      </header>

      {/* Search Bar */}
      <div className="bg-white px-5 py-3 border-b border-slate-100">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="상담 내용 검색..." 
            className="w-full bg-slate-50 text-sm rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#13ec92]/50 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-[#13ec92]" />
          <h2 className="text-sm font-bold text-slate-600">일차별 AI 총평</h2>
        </div>
        
        {historyData.map((item) => {
          if (item.type === 'weekly') {
            return (
              <div key={item.id} className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl shadow-lg active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden mb-6">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#13ec92]/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#13ec92] flex items-center justify-center text-slate-900 shadow-sm">
                        <Award size={24} />
                      </div>
                      <div>
                        <span className="text-[#13ec92] font-black text-sm">{item.dayLabel}</span>
                        <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400 mt-0.5">
                          <Calendar size={12} />
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-3">{item.topic}</h3>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 mb-4">
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {item.preview}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#13ec92]/20 text-[#13ec92] border border-[#13ec92]/30">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer group hover:border-[#13ec92]/30">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-800 text-white">
                      {item.dayLabel}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-[#13ec92] transition-colors mt-2">{item.topic}</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#13ec92]/10 group-hover:text-[#13ec92] transition-colors flex-shrink-0">
                  <ChevronRight size={18} />
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50">
                <MessageSquare size={16} className="text-[#13ec92] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.preview}
                </p>
              </div>
              
              <div className="flex gap-2 mt-3 flex-wrap">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-500">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        
        <div className="py-6 text-center">
          <p className="text-xs text-slate-400 font-medium">더 이상 이전 기록이 없습니다.</p>
        </div>
      </div>
    </div>
  );
}
