import React, { useState } from 'react';
import { User, CheckCircle2, History, Bell, Calendar, ChevronRight, RotateCcw } from 'lucide-react';

export default function MyScreen({ onNavigate }) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-03-12');

  return (
    <>
      <div className="h-full overflow-y-auto hide-scrollbar px-5 py-8 pb-32">
        <h2 className="text-2xl font-black mb-6">마이페이지</h2>
        
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-[#13ec92]/20 rounded-full flex items-center justify-center text-emerald-600">
            <User size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold">다이어터 님</h3>
            <p className="text-sm text-slate-500 mt-1">스위치온 <span className="font-bold text-[#13ec92]">1주차 • 3일째</span> 진행 중 🔥</p>
          </div>
        </div>

        {/* Compact Basic Rules */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-[#13ec92]" />
            스위치온 기본 수칙
          </h3>
          <ul className="text-xs text-slate-600 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">💧</span>
              <span><strong>물 2L 이상</strong> 충분히 마시기</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">🌙</span>
              <span><strong>수면 6시간 이상</strong> (자정~새벽 4시 필수)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-0.5">⏳</span>
              <span>저녁 식사 후 <strong>14시간 공복</strong> 유지</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">🍽️</span>
              <span>저녁은 <strong>취침 4시간 전</strong>에 마무리</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">🏃‍♀️</span>
              <span><strong>주 4회 이상</strong> 규칙적인 고강도 운동</span>
            </li>
          </ul>
        </div>

        {/* Settings & Management */}
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 mb-6">
          <div className="w-full p-4 flex justify-between items-center border-b border-slate-50">
            <span className="font-medium text-slate-700 text-sm">챌린지 기간</span>
            <span className="text-sm font-bold text-slate-800">총 28일</span>
          </div>
          <button onClick={() => onNavigate('diet-history')} className="w-full p-4 flex justify-between items-center border-b border-slate-50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-slate-400" />
              <span className="font-medium text-slate-700 text-sm">식단 및 수면 기록 보기</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>
          <button onClick={() => onNavigate('history')} className="w-full p-4 flex justify-between items-center border-b border-slate-50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <History size={18} className="text-slate-400" />
              <span className="font-medium text-slate-700 text-sm">AI 코치 히스토리</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>
          <button className="w-full p-4 flex justify-between items-center border-b border-slate-50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-slate-400" />
              <span className="font-medium text-slate-700 text-sm">식사 알림 설정</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>
          <button onClick={() => setIsDatePickerOpen(true)} className="w-full p-4 flex justify-between items-center hover:bg-slate-50 transition-colors rounded-b-2xl">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-slate-400" />
              <span className="font-medium text-slate-700 text-sm">다이어트 시작일 변경</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400">{selectedDate.replace(/-/g, '.')}</span>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          </button>
        </div>

        <button className="w-full py-4 text-slate-400 text-sm font-medium hover:text-rose-500 transition-colors flex items-center justify-center gap-1.5">
          <RotateCcw size={16} />
          데이터 초기화
        </button>
      </div>

      {/* Date Picker Bottom Sheet */}
      {isDatePickerOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsDatePickerOpen(false)}
          ></div>
          <div className="bg-white rounded-t-3xl p-6 relative z-10 shadow-2xl animate-[slideUp_0.3s_ease-out]">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-black text-slate-800 mb-2">다이어트 시작일 변경</h3>
            <p className="text-sm text-slate-500 mb-6">시작일을 변경하면 1주차~4주차 일정이 모두 재조정됩니다.</p>
            
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-lg font-bold text-slate-700 mb-6 focus:outline-none focus:border-[#13ec92] focus:bg-white transition-colors"
            />
            
            <div className="flex gap-3">
              <button onClick={() => setIsDatePickerOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm">취소</button>
              <button onClick={() => setIsDatePickerOpen(false)} className="flex-[2] py-4 bg-[#13ec92] text-slate-900 rounded-2xl font-bold text-sm shadow-sm">변경 완료</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
