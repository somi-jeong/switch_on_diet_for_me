import React from 'react';
import { ChevronLeft, Calendar as CalendarIcon, Moon, Sun, CheckCircle2, AlertTriangle, Utensils, MinusCircle, GlassWater, Pill, Activity } from 'lucide-react';

export default function DietHistoryScreen({ onBack }) {
  const historyData = [
    {
      date: '2026.03.14 (금)',
      day: '1주차 3일째',
      wakeUp: '13:00',
      bedtime: '02:00',
      fasting: '11h 00m',
      rules: { water: true, supplements: true, workout: true, sleep: { h: 6, m: 45, valid: true } },
      meals: [
        { type: '아침', time: '-', status: 'skipped', text: '기상 지연으로 스킵' },
        { type: '점심', time: '13:30', status: 'good', text: '단백질 쉐이크' },
        { type: '간식', time: '17:00', status: 'good', text: '단백질 쉐이크' },
        { type: '저녁', time: '20:00', status: 'good', text: '단백질 쉐이크' },
      ]
    },
    {
      date: '2026.03.13 (목)',
      day: '1주차 2일째',
      wakeUp: '07:15',
      bedtime: '23:30',
      fasting: '14h 15m',
      rules: { water: true, supplements: false, workout: false, sleep: { h: 5, m: 10, valid: false } },
      meals: [
        { type: '아침', time: '08:00', status: 'good', text: '단백질 쉐이크' },
        { type: '점심', time: '12:30', status: 'violation', text: '단백질 쉐이크 + 떡볶이' },
        { type: '간식', time: '16:00', status: 'good', text: '단백질 쉐이크' },
        { type: '저녁', time: '19:00', status: 'warning', text: '단백질 쉐이크 + 아몬드 5알' },
      ]
    },
    {
      date: '2026.03.12 (수)',
      day: '1주차 1일째',
      wakeUp: '06:30',
      bedtime: '22:45',
      fasting: '15h 45m',
      rules: { water: true, supplements: true, workout: true, sleep: { h: 7, m: 30, valid: true } },
      meals: [
        { type: '아침', time: '07:30', status: 'good', text: '단백질 쉐이크' },
        { type: '점심', time: '12:00', status: 'good', text: '단백질 쉐이크' },
        { type: '간식', time: '15:30', status: 'good', text: '단백질 쉐이크' },
        { type: '저녁', time: '18:30', status: 'good', text: '단백질 쉐이크' },
      ]
    }
  ];

  return (
    <div className="absolute inset-0 bg-[#f6f8f7] z-50 flex flex-col h-full">
      <header className="px-5 py-4 flex items-center justify-between bg-white sticky top-0 z-10 border-b border-slate-100">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 text-slate-700">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-slate-800">식단 및 수면 기록</h2>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-5 space-y-6">
        {historyData.map((dayData, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
            <div className="flex justify-between items-end mb-4 border-b border-slate-50 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-800">{dayData.date}</h3>
                <p className="text-sm font-bold text-[#13ec92] mt-0.5">{dayData.day}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400">공복 유지</span>
                <p className="text-sm font-black text-slate-700">{dayData.fasting}</p>
              </div>
            </div>

            {/* Sleep & Wake */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                  <Sun size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">기상</p>
                  <p className="text-sm font-bold text-slate-700">{dayData.wakeUp}</p>
                </div>
              </div>
              <div className="flex-1 bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                  <Moon size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">취침</p>
                  <p className="text-sm font-bold text-slate-700">{dayData.bedtime}</p>
                </div>
              </div>
            </div>

            {/* Daily Rules */}
            {dayData.rules && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 size={14} />
                  데일리 미션 달성도
                </h4>
                <div className="flex gap-2">
                  <div className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl border ${dayData.rules.water ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    <GlassWater size={16} className="mb-1" />
                    <span className="text-[10px] font-bold">물 2L</span>
                  </div>
                  <div className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl border ${dayData.rules.supplements ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    <Pill size={16} className="mb-1" />
                    <span className="text-[10px] font-bold">영양제</span>
                  </div>
                  <div className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl border ${dayData.rules.workout ? 'bg-[#13ec92]/10 border-[#13ec92]/30 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    <Activity size={16} className="mb-1" />
                    <span className="text-[10px] font-bold">운동</span>
                  </div>
                  <div className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl border ${dayData.rules.sleep.valid ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-rose-50 border-rose-100 text-rose-500'}`}>
                    <Moon size={16} className="mb-1" />
                    <span className="text-[10px] font-bold">{dayData.rules.sleep.h}h {dayData.rules.sleep.m}m</span>
                  </div>
                </div>
              </div>
            )}

            {/* Meals */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mb-2">
                <Utensils size={14} />
                식단 기록
              </h4>
              {dayData.meals.map((meal, mIdx) => (
                <div key={mIdx} className={`flex items-center gap-3 rounded-xl p-3 border ${meal.status === 'violation' ? 'bg-rose-50/50 border-rose-100' : meal.status === 'skipped' ? 'bg-slate-100/50 border-slate-200 opacity-70' : 'bg-slate-50/50 border-slate-50'}`}>
                  <div className="w-12 text-center">
                    <p className={`text-xs font-bold ${meal.status === 'skipped' ? 'text-slate-400 line-through' : 'text-slate-600'}`}>{meal.type}</p>
                    <p className="text-[10px] font-medium text-slate-400">{meal.time}</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${meal.status === 'violation' ? 'text-rose-600' : meal.status === 'skipped' ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{meal.text}</p>
                    {meal.status === 'violation' && (
                      <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center gap-1">
                        <AlertTriangle size={10} />
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
                  <div>
                    {meal.status === 'good' ? (
                      <CheckCircle2 size={16} className="text-[#13ec92]" />
                    ) : meal.status === 'violation' ? (
                      <AlertTriangle size={16} className="text-rose-500" />
                    ) : meal.status === 'skipped' ? (
                      <MinusCircle size={16} className="text-slate-400" />
                    ) : (
                      <AlertTriangle size={16} className="text-amber-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
