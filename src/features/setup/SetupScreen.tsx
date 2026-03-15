import React, { useState } from 'react';
import { Calendar, ChevronRight, ChevronLeft, Check } from 'lucide-react';

export default function SetupScreen({ onComplete }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const handlePrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const isSameDate = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getDate() === d2.getDate();
  };

  return (
    <div className="h-full bg-white flex flex-col px-5 py-8 animate-[scaleIn_0.3s_ease-out] overflow-y-auto hide-scrollbar">
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 bg-[#13ec92]/20 rounded-full flex items-center justify-center text-emerald-600 mb-6 mx-auto">
          <Calendar size={32} />
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 text-center mb-4 leading-tight">
          스위치온 다이어트<br />언제부터 시작할까요?
        </h1>
        
        <p className="text-slate-500 text-center mb-10 text-sm">
          4주 프로그램을 성공적으로 완주할 수 있도록<br />꼼꼼하게 도와드릴게요.
        </p>

        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-6">
          <div className="flex justify-between items-center mb-6">
            <button onClick={handlePrevMonth} className="p-2 text-slate-400 hover:text-slate-700 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-bold text-slate-800">
              {year}년 {month + 1}월
            </h2>
            <button onClick={handleNextMonth} className="p-2 text-slate-400 hover:text-slate-700 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="text-[10px] font-bold text-slate-400 py-2">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, idx) => (
              <div key={idx} className="aspect-square flex items-center justify-center">
                {date ? (
                  <button
                    onClick={() => setSelectedDate(date)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isSameDate(date, selectedDate)
                        ? 'bg-[#13ec92] text-slate-900 shadow-md scale-110'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="w-10 h-10"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-start gap-2 text-xs text-slate-500 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
            <div className="mt-0.5 text-blue-500">💡</div>
            <p className="leading-relaxed">오늘부터 바로 시작하는 것을 추천해요! 1~3일차는 단백질 쉐이크만 섭취해야 하므로 주말을 끼고 시작하는 것도 좋은 전략입니다.</p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onComplete(selectedDate.toISOString().split('T')[0])}
        className="w-full py-4 bg-[#13ec92] text-slate-900 rounded-2xl font-bold text-lg shadow-sm hover:bg-[#10d482] transition-colors flex items-center justify-center gap-2 mt-auto"
      >
        <Check size={20} />
        다이어트 시작하기
      </button>
    </div>
  );
}
