import React, { useState } from 'react';
import { Check, Plus, AlertCircle, Utensils, MinusCircle, Sparkles, GlassWater, Pill, Activity, Moon } from 'lucide-react';

export default function CalendarScreen({ onNavigate }) {
  const [selectedDay, setSelectedDay] = useState(4);

  // 다이어트 시작일 설정 (예: 2026년 3월 13일 금요일)
  const startDate = new Date('2026-03-13T00:00:00');
  const startDayOfWeek = startDate.getDay(); // 0: 일, 1: 월, ..., 5: 금, 6: 토

  // 캘린더 앞부분 빈 칸 (시작 요일 맞추기)
  const paddingDays = Array.from({ length: startDayOfWeek }, (_, i) => null);

  const days = Array.from({ length: 28 }, (_, i) => {
    const dayNum = i + 1;
    if (dayNum === 1) return 'done';
    if (dayNum === 2) return 'warning';
    if (dayNum === 3) return 'incomplete';
    if (dayNum === 4) return 'today';
    return 'future';
  });

  const calendarCells = [...paddingDays, ...days];

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

  const mockFeedback = {
    1: { 
      title: '1일차 데일리 총평', 
      text: '첫날 식단을 완벽하게 지키셨네요! 공복 시간 14시간도 잘 유지하셨습니다. 이대로만 쭉 가볼까요?', 
      type: 'good',
      status: 'perfect', // perfect, normal, worst
      missed: []
    },
    2: { 
      title: '2일차 데일리 총평', 
      text: '점심에 떡볶이를 드셨군요 😭 탄수화물은 인슐린 분비를 자극해 지방 대사를 방해합니다. 내일은 꼭 쉐이크를 드셔주세요!', 
      type: 'warning',
      status: 'worst',
      missed: ['식단 (금기식품 섭취)', '영양제', '운동', '수면 (6시간 미만)']
    },
    3: { 
      title: '3일차 데일리 총평', 
      text: '어제는 식단과 수면 모두 완벽했어요! 이대로만 쭉 유지해볼까요?', 
      type: 'good',
      status: 'perfect',
      missed: []
    },
    4: { 
      title: '4일차 데일리 총평', 
      text: '오늘 기상 시간이 조금 늦었지만, 식단은 완벽하게 지켜주셨어요! 내일부터는 점심에 일반식이 허용됩니다.', 
      type: 'good',
      status: 'normal',
      missed: ['기상 시간 지연']
    }
  };

  const currentMeals = mockMeals[selectedDay] || [];
  const currentFeedback = mockFeedback[selectedDay];

  const getDailyRules = (day) => {
    if (day === 1) return { water: true, supplements: true, workout: true, sleep: { h: 7, m: 30, valid: true } };
    if (day === 2) return { water: true, supplements: false, workout: false, sleep: { h: 5, m: 10, valid: false } };
    if (day === 3) return { water: true, supplements: true, workout: true, sleep: { h: 6, m: 45, valid: true } };
    if (day === 4) return { water: false, supplements: false, workout: false, sleep: { h: 7, m: 30, valid: true } }; // Today
    return null;
  };
  const currentRules = getDailyRules(selectedDay);

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
          {calendarCells.map((status, i) => {
            if (status === null) {
              return <div key={`padding-${i}`} className="relative aspect-square"></div>;
            }

            const dayNum = i - startDayOfWeek + 1;
            const isSelected = selectedDay === dayNum;
            
            // 실제 날짜 계산
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + dayNum - 1);
            const dateNum = currentDate.getDate();
            
            let btnClass = "relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all ";
            
            if (isSelected) {
              btnClass += "ring-2 ring-offset-2 ring-[#13ec92] ";
            }

            if (status === 'done') {
              btnClass += "bg-[#13ec92] text-slate-900 shadow-sm";
            } else if (status === 'warning') {
              btnClass += "bg-rose-100 text-rose-600 shadow-sm";
            } else if (status === 'incomplete') {
              btnClass += "bg-amber-100 text-amber-700 shadow-sm";
            } else if (status === 'today') {
              btnClass += "bg-white border-2 border-[#13ec92] text-[#13ec92] shadow-sm scale-110 z-10";
            } else {
              btnClass += "bg-slate-50 border border-slate-100 text-slate-400";
            }
            
            return (
              <button 
                key={i} 
                onClick={() => setSelectedDay(dayNum)}
                className={btnClass}
              >
                <span className={`text-[9px] mb-0.5 ${status === 'today' ? 'font-black' : 'font-medium opacity-70'}`}>{dayNum}일차</span>
                <span className={`text-sm ${status === 'today' ? 'font-black' : 'font-bold'}`}>
                  {status === 'done' ? <Check size={16} strokeWidth={3} /> : dateNum}
                </span>
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

          {/* Daily Rules Section */}
          {currentRules && (
            <div className="mt-6 mb-4">
              <h4 className="font-bold text-sm text-slate-800 mb-3">데일리 규칙 달성도</h4>
              <div className="flex gap-2">
                <div className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl border ${currentRules.water ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  <GlassWater size={20} className="mb-1" />
                  <span className="text-[10px] font-bold">물 2L</span>
                </div>
                <div className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl border ${currentRules.supplements ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  <Pill size={20} className="mb-1" />
                  <span className="text-[10px] font-bold">영양제</span>
                </div>
                <div className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl border ${currentRules.workout ? 'bg-[#13ec92]/10 border-[#13ec92]/30 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  <Activity size={20} className="mb-1" />
                  <span className="text-[10px] font-bold">운동</span>
                </div>
                <div className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl border ${currentRules.sleep.valid ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-rose-50 border-rose-100 text-rose-500'}`}>
                  <Moon size={20} className="mb-1" />
                  <span className="text-[10px] font-bold">{currentRules.sleep.h}h {currentRules.sleep.m}m</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Feedback Section */}
          {currentFeedback && (
            <div className={`mt-6 p-5 rounded-2xl border ${
              currentFeedback.status === 'perfect' ? 'bg-[#13ec92]/10 border-[#13ec92]/30' : 
              currentFeedback.status === 'normal' ? 'bg-blue-50 border-blue-100' : 
              'bg-rose-50 border-rose-100'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className={
                    currentFeedback.status === 'perfect' ? 'text-emerald-600' : 
                    currentFeedback.status === 'normal' ? 'text-blue-600' : 
                    'text-rose-500'
                  } />
                  <h4 className={`font-bold text-sm ${
                    currentFeedback.status === 'perfect' ? 'text-emerald-800' : 
                    currentFeedback.status === 'normal' ? 'text-blue-800' : 
                    'text-rose-700'
                  }`}>
                    {currentFeedback.title || 'AI 코치 피드백'}
                  </h4>
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-md ${
                  currentFeedback.status === 'perfect' ? 'bg-emerald-100 text-emerald-700' : 
                  currentFeedback.status === 'normal' ? 'bg-blue-100 text-blue-700' : 
                  'bg-rose-100 text-rose-700'
                }`}>
                  {currentFeedback.status === 'perfect' ? '완벽 성공 🌟' : 
                   currentFeedback.status === 'normal' ? '보통 (일부 누락) 👍' : 
                   '최악 (다수 위반) 🚨'}
                </span>
              </div>
              
              <p className={`text-sm leading-relaxed mb-3 ${
                currentFeedback.status === 'perfect' ? 'text-emerald-700' : 
                currentFeedback.status === 'normal' ? 'text-blue-700' : 
                'text-rose-600'
              }`}>
                {currentFeedback.text}
              </p>

              {currentFeedback.missed && currentFeedback.missed.length > 0 && (
                <div className="mt-3 pt-3 border-t border-black/5">
                  <p className="text-xs font-bold text-slate-600 mb-2">놓친 규칙</p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentFeedback.missed.map((item, idx) => (
                      <span key={idx} className="text-[10px] font-bold bg-white text-slate-500 px-2 py-1 rounded-md border border-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
