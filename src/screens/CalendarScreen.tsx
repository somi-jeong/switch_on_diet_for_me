import React, { useState } from 'react';
import { Check, Plus, AlertCircle, Utensils, MinusCircle } from 'lucide-react';

export default function CalendarScreen({ onNavigate }) {
  const [selectedDay, setSelectedDay] = useState(4);

  const days = Array.from({ length: 28 }, (_, i) => {
    const dayNum = i + 1;
    if (dayNum === 1) return 'done';
    if (dayNum === 2) return 'warning';
    if (dayNum === 3) return 'incomplete';
    if (dayNum === 4) return 'today';
    return 'future';
  });

  const mockMeals = {
    1: [
      { type: '아침', time: '08:00', status: 'recorded', text: '단백질 쉐이크' },
      { type: '점심', time: '12:30', status: 'recorded', text: '단백질 쉐이크' },
      { type: '간식', time: '16:00', status: 'recorded', text: '단백질 쉐이크' },
      { type: '저녁', time: '19:00', status: 'recorded', text: '단백질 쉐이크' },
    ],
    2: [
      { type: '아침', time: '08:00', status: 'recorded', text: '단백질 쉐이크' },
      { type: '점심', time: '12:30', status: 'violation', text: '단백질 쉐이크 + 떡볶이' },
      { type: '간식', time: '16:00', status: 'recorded', text: '단백질 쉐이크' },
      { type: '저녁', time: '19:00', status: 'recorded', text: '단백질 쉐이크' },
    ],
    3: [
      { type: '아침', time: '-', status: 'skipped', text: '기상 지연으로 스킵' },
      { type: '점심', time: '13:30', status: 'recorded', text: '단백질 쉐이크' },
      { type: '간식', time: '17:00', status: 'recorded', text: '단백질 쉐이크' },
      { type: '저녁', time: '20:00', status: 'recorded', text: '단백질 쉐이크' },
    ],
    4: [
      { type: '아침', time: '-', status: 'skipped', text: '기상 지연으로 스킵' },
      { type: '점심', time: '13:30', status: 'recorded', text: '단백질 쉐이크' },
      { type: '간식', time: '', status: 'unrecorded', text: '' },
      { type: '저녁', time: '', status: 'unrecorded', text: '' },
    ]
  };

  const currentMeals = mockMeals[selectedDay] || [];

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
      
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-8">
        <div className="flex items-center justify-end gap-3 mb-4 text-[11px] font-bold text-slate-500">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#13ec92]"></div>
            <span>완벽 성공</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
            <span>주의 필요</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <span>미입력</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
            <div key={i} className="text-[10px] font-bold text-slate-400">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((status, i) => {
            const dayNum = i + 1;
            const isSelected = selectedDay === dayNum;
            
            let btnClass = "relative aspect-square rounded-xl flex items-center justify-center text-sm transition-all ";
            
            if (isSelected) {
              btnClass += "ring-2 ring-offset-2 ring-[#13ec92] ";
            }

            if (status === 'done') {
              btnClass += "bg-[#13ec92] text-slate-900 font-bold shadow-sm";
            } else if (status === 'warning') {
              btnClass += "bg-rose-100 text-rose-600 font-bold shadow-sm";
            } else if (status === 'incomplete') {
              btnClass += "bg-amber-100 text-amber-700 font-bold shadow-sm";
            } else if (status === 'today') {
              btnClass += "bg-white border-2 border-[#13ec92] text-[#13ec92] font-black shadow-sm scale-110 z-10";
            } else {
              btnClass += "bg-slate-50 border border-slate-100 text-slate-400";
            }
            
            return (
              <button 
                key={i} 
                onClick={() => setSelectedDay(dayNum)}
                className={btnClass}
              >
                {status === 'done' ? <Check size={16} strokeWidth={3} /> : dayNum}
                {status === 'warning' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></div>
                )}
                {status === 'incomplete' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDay <= 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">
              1주차 {selectedDay}일째 식단
            </h3>
            {days[selectedDay - 1] === 'warning' && (
              <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md flex items-center gap-1">
                <AlertCircle size={12} />
                주의가 필요한 날이에요
              </span>
            )}
            {days[selectedDay - 1] === 'incomplete' && (
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md flex items-center gap-1">
                <AlertCircle size={12} />
                미입력 식단이 있어요
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            {currentMeals.map((meal, idx) => (
              <div key={idx}>
                {meal.status === 'recorded' || meal.status === 'violation' || meal.status === 'skipped' ? (
                  <div className={`flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border ${meal.status === 'violation' ? 'border-rose-100' : meal.status === 'skipped' ? 'border-slate-200 bg-slate-50 opacity-70' : 'border-slate-100'}`}>
                    <div className="w-10 text-center">
                      <p className={`text-xs font-bold ${meal.status === 'skipped' ? 'text-slate-400 line-through' : 'text-slate-600'}`}>{meal.type}</p>
                      <p className="text-[10px] font-medium text-slate-400">{meal.time}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${meal.status === 'violation' ? 'text-rose-600' : meal.status === 'skipped' ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{meal.text}</p>
                      {meal.status === 'violation' && (
                        <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} />
                          허용식품 아님
                        </p>
                      )}
                      {meal.status === 'skipped' && (
                        <p className="text-[10px] font-bold text-slate-500 mt-1 flex items-center gap-1">
                          <MinusCircle size={10} />
                          스킵됨
                        </p>
                      )}
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${meal.status === 'violation' ? 'bg-rose-50 text-rose-500' : meal.status === 'skipped' ? 'bg-slate-200 text-slate-500' : 'bg-[#13ec92]/20 text-emerald-600'}`}>
                      {meal.status === 'violation' ? <AlertCircle size={16} /> : meal.status === 'skipped' ? <MinusCircle size={16} /> : <Check size={16} />}
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => onNavigate('record')}
                    className="w-full flex items-center gap-3 bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-300 hover:bg-slate-100 hover:border-[#13ec92] transition-colors group text-left"
                  >
                    <div className="w-10 text-center">
                      <p className="text-xs font-bold text-slate-500">{meal.type}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-400 group-hover:text-[#13ec92] transition-colors">
                        {meal.type} 식단 기록하기
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-[#13ec92] group-hover:text-[#13ec92] group-hover:bg-[#13ec92]/10 transition-colors">
                      <Plus size={16} />
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDay > 4 && (
        <div className="mb-8 bg-slate-50 rounded-3xl p-8 text-center border border-slate-100">
          <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Utensils size={20} />
          </div>
          <p className="text-sm font-bold text-slate-500">아직 기록할 수 없는 날짜예요</p>
        </div>
      )}

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

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 opacity-60">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-500">3주차 (도약기)</span>
            <span className="text-xs font-medium text-slate-400">예정</span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 opacity-60">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-500">4주차 (안정기)</span>
            <span className="text-xs font-medium text-slate-400">예정</span>
          </div>
        </div>
      </div>
    </div>
  );
}
