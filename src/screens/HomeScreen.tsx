import React, { useState } from 'react';
import { Calendar, Sun, Check, MessageCircle, Sparkles, GlassWater, Moon, Lock, AlertTriangle, CheckCircle2, Timer, Utensils, ChevronDown } from 'lucide-react';

export default function HomeScreen({ onNavigate }) {
  const [isWokenUp, setIsWokenUp] = useState(false);
  const [isWakeTimeModalOpen, setIsWakeTimeModalOpen] = useState(false);
  const [wakeTime, setWakeTime] = useState('07:00');
  const [isSkipDialogOpen, setIsSkipDialogOpen] = useState(false);
  const [mockCurrentTime, setMockCurrentTime] = useState('11:00');
  const [isForgotRecordDialogOpen, setIsForgotRecordDialogOpen] = useState(false);
  const [isAbnormalWakeTimeDialogOpen, setIsAbnormalWakeTimeDialogOpen] = useState(false);
  const [hasMissedBedtime, setHasMissedBedtime] = useState(true);
  const [isMissedBedtimeModalOpen, setIsMissedBedtimeModalOpen] = useState(false);
  const [missedBedtime, setMissedBedtime] = useState('02:00'); // 기본값을 늦은 시간으로 설정하여 테스트 용이하게 함

  const isTimeLate = (timeStr) => {
    return timeStr > '09:00' || timeStr < '05:00';
  };

  const isBedtimeLate = (timeStr) => {
    return timeStr >= '00:00' && timeStr <= '05:00';
  };

  const getSleepDuration = (bed, wake) => {
    const [bedH, bedM] = bed.split(':').map(Number);
    const [wakeH, wakeM] = wake.split(':').map(Number);
    let duration = (wakeH + wakeM / 60) - (bedH + bedM / 60);
    if (duration < 0) duration += 24;
    return duration;
  };

  const isCurrentLate = isTimeLate(mockCurrentTime);
  const isWakeTimeAbnormal = isTimeLate(wakeTime);

  return (
    <>
      <div className="h-full overflow-y-auto hide-scrollbar pb-24 relative">
        <header className="px-5 py-4 flex justify-between items-center sticky top-0 bg-[#f6f8f7]/80 backdrop-blur-md z-30">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">스위치온</h1>
          <div className="bg-[#13ec92]/20 text-emerald-800 px-3.5 py-1.5 rounded-full text-sm font-bold flex items-center gap-1">
            <Calendar size={16} />
            1주차 • 3일째
          </div>
        </header>

        <div className="px-5 mb-2 flex gap-2 flex-wrap">
          <button onClick={() => setIsWokenUp(!isWokenUp)} className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium">
            테스트: {isWokenUp ? '기상 전으로' : '기상 후로'}
          </button>
          <button onClick={() => setMockCurrentTime(mockCurrentTime === '07:00' ? '11:00' : '07:00')} className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium">
            현재시간: {mockCurrentTime}
          </button>
          <button onClick={() => setHasMissedBedtime(!hasMissedBedtime)} className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium">
            어제 취침 누락: {hasMissedBedtime ? 'ON' : 'OFF'}
          </button>
        </div>

        <section className="px-5 py-2">
          {!isWokenUp && hasMissedBedtime && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-4 flex items-center justify-between animate-[slideUp_0.3s_ease-out]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 flex-shrink-0">
                  <Moon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-indigo-900 mb-0.5">어제 취침 기록이 없어요!</h3>
                  <p className="text-xs text-indigo-700/80">정확한 분석을 위해 기록해주세요.</p>
                </div>
              </div>
              <button onClick={() => setIsMissedBedtimeModalOpen(true)} className="bg-indigo-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-sm active:scale-95 transition-transform">
                기록하기
              </button>
            </div>
          )}

          {!isWokenUp ? (
            <div className={`bg-white rounded-[2rem] p-8 shadow-sm border ${isCurrentLate ? 'border-rose-200' : 'border-slate-100'} flex flex-col items-center justify-center text-center mb-6 relative overflow-hidden`}>
              <div className={`absolute -right-10 -top-10 w-32 h-32 ${isCurrentLate ? 'bg-rose-500/10' : 'bg-[#13ec92]/10'} rounded-full blur-2xl`}></div>
              {isCurrentLate ? <AlertTriangle size={48} className="text-rose-300 mb-4" /> : <Sun size={48} className="text-slate-300 mb-4" />}
              <h2 className={`text-xl font-bold ${isCurrentLate ? 'text-rose-600' : 'text-slate-800'} mb-2`}>
                {isCurrentLate ? '기상 시간이 지났어요!' : '좋은 아침입니다!'}
              </h2>
              <p className="text-sm text-slate-500 mb-6 whitespace-pre-line">
                {isCurrentLate 
                  ? '권장 기상 시간(05:00~09:00)이 지났습니다.\n지금 일어나셨나요?' 
                  : '기상 시간을 기록하고\n오늘의 식단 플랜을 시작해보세요.'}
              </p>
              {isCurrentLate ? (
                <div className="flex flex-col gap-2 w-full">
                  <button onClick={() => {
                    setWakeTime(mockCurrentTime);
                    setIsWokenUp(true);
                    setIsAbnormalWakeTimeDialogOpen(true);
                  }} className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl shadow-sm transition-transform active:scale-95">
                    네, 지금 일어났어요
                  </button>
                  <button onClick={() => {
                    setIsForgotRecordDialogOpen(true);
                  }} className="w-full bg-rose-50 text-rose-600 font-bold py-4 rounded-2xl transition-transform active:scale-95">
                    아뇨, 기록을 깜빡했어요
                  </button>
                </div>
              ) : (
                <button onClick={() => {
                  setWakeTime(mockCurrentTime);
                  setIsWokenUp(true);
                }} className="w-full bg-[#13ec92] hover:bg-[#10d482] text-slate-900 font-bold py-4 rounded-2xl shadow-sm transition-transform active:scale-95">
                  지금 일어났어요
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden mb-4">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#13ec92]/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-1">위장관 휴식 기간 🌿</h2>
                  <p className="text-sm text-slate-500 mb-4">오늘은 단백질 쉐이크만<br/>하루 4번 먹는 날이에요.</p>
                  <button onClick={() => setIsWakeTimeModalOpen(true)} className={`inline-flex items-center gap-1.5 border px-3 py-2 rounded-2xl transition-colors active:scale-95 ${isWakeTimeAbnormal ? 'bg-rose-50 border-rose-200 hover:bg-rose-100' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}>
                    {isWakeTimeAbnormal ? <AlertTriangle size={18} className="text-rose-500" /> : <Sun size={18} className="text-amber-500" />}
                    <span className={`text-sm font-bold ${isWakeTimeAbnormal ? 'text-rose-700' : 'text-slate-700'}`}>기상 {wakeTime}</span>
                    <ChevronDown size={14} className={isWakeTimeAbnormal ? "text-rose-400" : "text-slate-400"} />
                  </button>
                </div>
                <div className="relative w-20 h-20 flex-shrink-0 z-10">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-[#13ec92]" strokeDasharray="25, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-semibold text-slate-400">달성률</span>
                    <span className="text-lg font-black text-slate-800 leading-none mt-0.5">25<span className="text-xs">%</span></span>
                  </div>
                </div>
              </div>

              {/* Fasting Timer Card - Reverted to lighter theme */}
              <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-amber-100 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex justify-between items-end mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Timer size={14} className="text-amber-500" />
                      <span className="text-xs font-bold text-amber-600">공복 유지 중</span>
                    </div>
                    <p className="text-2xl font-black text-slate-800 tabular-nums tracking-tight">12<span className="text-lg font-medium text-slate-400 mx-0.5">h</span> 30<span className="text-lg font-medium text-slate-400 mx-0.5">m</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-medium text-slate-500 mb-0.5">목표 시간</p>
                    <p className="text-sm font-bold text-slate-700">14시간 00분</p>
                  </div>
                </div>
                <div className="relative z-10 w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full relative" style={{ width: '89%' }}>
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        <section className="px-5 py-6 relative">
          <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-200 z-0 rounded-full"></div>
          
          {!isWokenUp ? (
            <div className="relative z-10 space-y-6 opacity-50 grayscale">
              {[
                { label: '아침', time: '기상 후 30~90분' },
                { label: '점심', time: '기상 후 3.5~4.5시간' },
                { label: '간식', time: '기상 후 6.5~7.5시간' },
                { label: '저녁', time: '기상 후 9.5~10.5시간' },
                { label: '취침', time: '저녁 식사 후 4시간 뒤' }
              ].map((meal, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                      <Lock size={16} strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-500">{meal.label}</h3>
                    </div>
                    <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex items-center gap-3">
                      <p className="text-sm font-medium text-slate-400">{meal.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Breakfast */}
              <div className="relative z-10 flex gap-4 mb-10">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-10 h-10 rounded-full bg-[#13ec92] flex items-center justify-center text-slate-900 shadow-sm">
                    <Check size={20} strokeWidth={3} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-lg font-bold text-slate-800">아침</h3>
                      <span className="text-sm font-bold text-[#13ec92]">07:30</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onNavigate('record')} className="text-[11px] font-bold text-slate-400 hover:text-slate-600 underline underline-offset-2">수정</button>
                      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-100">
                        <CheckCircle2 size={12} />
                        허용
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
                    <div className="flex gap-3 mb-1">
                      <div className="w-12 h-12 rounded-2xl bg-[#13ec92]/10 flex items-center justify-center text-emerald-600 flex-shrink-0">
                        <GlassWater size={24} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-bold text-slate-800">단백질 쉐이크 1컵</span>
                        <span className="text-xs text-slate-500">물 또는 무가당 두유</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="bg-[#13ec92]/10 rounded-2xl rounded-tl-none p-3 relative flex flex-col justify-center">
                        <div className="flex items-center gap-1 mb-1">
                          <Sparkles size={14} className="text-emerald-600" />
                          <span className="text-xs font-bold text-emerald-700">AI 코치</span>
                        </div>
                        <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                          첫 쉐이크 잘 드셨어요! 👏 1~3일차는 탄수화물을 제한하는 중요한 시기예요. 너무 배가 고프면 플레인 요거트나 연두부를 조금 드셔도 좋아요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lunch */}
              <div className="relative z-10 flex gap-4 mb-10">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-10 h-10 rounded-full bg-[#13ec92] flex items-center justify-center text-slate-900 shadow-sm">
                    <Check size={20} strokeWidth={3} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-lg font-bold text-slate-800">점심</h3>
                      <span className="text-sm font-bold text-[#13ec92]">12:45</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onNavigate('record')} className="text-[11px] font-bold text-slate-400 hover:text-slate-600 underline underline-offset-2">수정</button>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-100">
                        <AlertTriangle size={12} />
                        주의
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
                    <div className="flex gap-3 mb-1">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100/50 flex items-center justify-center text-amber-600 flex-shrink-0">
                        <Utensils size={24} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-bold text-slate-800">단백질 쉐이크 + 견과류 많이</span>
                        <span className="text-xs text-slate-500">텍스트 입력됨</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="bg-amber-50 rounded-2xl rounded-tl-none p-3 relative flex flex-col justify-center border border-amber-100/50">
                        <div className="flex items-center gap-1 mb-1">
                          <Sparkles size={14} className="text-amber-600" />
                          <span className="text-xs font-bold text-amber-700">AI 코치</span>
                        </div>
                        <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                          견과류는 2주차부터 허용되는 식품이에요. 1주차에는 위장관 휴식을 위해 가급적 피해주시는 것이 좋습니다. 다음 식사부터는 쉐이크에 집중해볼까요? 🥲
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Snack */}
              <div className="relative z-10 flex gap-4 mb-10">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-10 h-10 rounded-full bg-white border-[3px] border-[#13ec92] flex items-center justify-center shadow-sm relative">
                    <div className="w-3 h-3 rounded-full bg-[#13ec92] animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-[#13ec92]/20 animate-ping" style={{ animationDuration: '2s' }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-800">오후 간식</h3>
                    <span className="text-sm font-bold text-slate-500">15:30 예정</span>
                  </div>
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#13ec92]/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#13ec92]/10 to-transparent rounded-bl-full"></div>
                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-slate-700 mb-4">간식 쉐이크 드실 시간이에요.</p>
                      <div className="flex gap-2">
                        <button onClick={() => onNavigate('record')} className="flex-1 bg-[#13ec92] hover:bg-[#10d482] text-slate-900 font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 text-sm">
                          <Check size={16} />
                          기록하기
                        </button>
                        <button onClick={() => setIsSkipDialogOpen(true)} className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-3 rounded-2xl flex items-center justify-center transition-transform active:scale-95 text-sm">
                          스킵
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dinner */}
              <div className="relative z-10 flex gap-4 mb-10">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-500">저녁</h3>
                    <span className="text-sm font-bold text-slate-400">18:30 예정</span>
                  </div>
                  <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                        <GlassWater size={20} />
                      </div>
                      <p className="text-sm font-medium text-slate-500">단백질 쉐이크 1컵</p>
                    </div>
                    <div className="mt-2 flex items-start gap-1.5 bg-slate-200/50 p-2.5 rounded-xl">
                      <Moon size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                      <p className="text-[11px] text-slate-500 leading-tight">
                        취침 4시간 전에는 식사를 마쳐주세요.<br/>이후부터 <strong>14시간 공복</strong>이 시작됩니다!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bedtime */}
              <div className="relative z-10 flex gap-4">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 shadow-sm">
                    <Moon size={20} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-800">취침</h3>
                    <span className="text-sm font-bold text-slate-500">23:00 목표</span>
                  </div>
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-transparent rounded-bl-full"></div>
                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-slate-700 mb-4">충분한 수면은 필수!<br/>밤 12시 이전 취침을 권장해요.</p>
                      <button onClick={() => onNavigate('record')} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 text-sm">
                        <Check size={16} />
                        취침 기록하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* AI Chat FAB - Made more prominent and absolute positioning */}
        {isWokenUp && (
          <button 
            onClick={() => onNavigate('chat')}
            className="absolute bottom-28 right-5 w-14 h-14 bg-slate-900 text-[#13ec92] rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform z-50 active:scale-95"
          >
            <MessageCircle size={28} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 border-2 border-slate-900 rounded-full"></span>
          </button>
        )}

        {/* Wake-up Time Edit Modal */}
        {isWakeTimeModalOpen && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsWakeTimeModalOpen(false)}
            ></div>
            <div className="bg-white rounded-t-3xl p-6 relative z-10 shadow-2xl animate-[slideUp_0.3s_ease-out]">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-black text-slate-800 mb-2">기상 시간 수정</h3>
              
              {isTimeLate(wakeTime) && (
                <div className="bg-rose-50 rounded-2xl p-4 mb-3 border border-rose-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-rose-500" />
                    <span className="font-bold text-rose-700 text-sm">권장 기상 시간(05:00~09:00) 초과</span>
                  </div>
                  <p className="text-xs text-rose-600 leading-relaxed">
                    늦게 일어나면 스트레스 호르몬이 분비되어 지방이 축적되기 쉬워요. 내일은 일찍 일어나보세요!
                  </p>
                </div>
              )}

              {getSleepDuration(missedBedtime, wakeTime) < 6 && (
                <div className="bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-amber-500" />
                    <span className="font-bold text-amber-700 text-sm">
                      수면 부족 ({Math.floor(getSleepDuration(missedBedtime, wakeTime))}시간 {Math.round((getSleepDuration(missedBedtime, wakeTime) % 1) * 60)}분)
                    </span>
                  </div>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    최소 6시간 이상 푹 자야 가짜 배고픔을 막을 수 있어요. 오늘은 꼭 일찍 주무세요!
                  </p>
                </div>
              )}

              {!isTimeLate(wakeTime) && getSleepDuration(missedBedtime, wakeTime) >= 6 && (
                <p className="text-sm text-slate-500 mb-6">기상 시간에 맞춰 오늘의 식단 알림이 재조정됩니다.</p>
              )}
              
              <input 
                type="time" 
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className={`w-full bg-slate-50 border rounded-2xl p-4 text-2xl font-black text-center mb-6 focus:outline-none transition-colors ${isTimeLate(wakeTime) ? 'border-rose-300 text-rose-600 focus:border-rose-500 focus:bg-rose-50' : 'border-slate-200 text-slate-700 focus:border-[#13ec92] focus:bg-white'}`}
              />
              
              <div className="flex gap-3">
                <button onClick={() => setIsWakeTimeModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm">취소</button>
                <button onClick={() => setIsWakeTimeModalOpen(false)} className="flex-[2] py-4 bg-[#13ec92] text-slate-900 rounded-2xl font-bold text-sm shadow-sm">수정 완료</button>
              </div>
            </div>
          </div>
        )}

        {/* Skip Warning Dialog */}
        {isSkipDialogOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center px-5">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsSkipDialogOpen(false)}
            ></div>
            <div className="bg-white rounded-3xl p-6 relative z-10 shadow-2xl w-full max-w-sm animate-[scaleIn_0.2s_ease-out]">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-3 text-center">정말 스킵하시겠어요?</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed text-center">
                1주차에는 4번의 단백질 쉐이크를 규칙적으로 섭취하여 근손실을 막는 것이 매우 중요해요.<br/>가급적 섭취하시는 것을 권장합니다!
              </p>
              <div className="flex gap-3">
                <button onClick={() => setIsSkipDialogOpen(false)} className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm">취소</button>
                <button onClick={() => setIsSkipDialogOpen(false)} className="flex-1 py-3.5 bg-rose-500 text-white rounded-xl font-bold text-sm shadow-sm">스킵하기</button>
              </div>
            </div>
          </div>
        )}

        {/* Forgot Record Warning Dialog */}
        {isForgotRecordDialogOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center px-5">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsForgotRecordDialogOpen(false)}></div>
            <div className="bg-white rounded-3xl p-6 relative z-10 shadow-2xl w-full max-w-sm animate-[scaleIn_0.2s_ease-out]">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-3 text-center">알림 타이밍이 어긋날 수 있어요!</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed text-center">
                기상 기록이 늦어지면 오늘 하루의 <strong>식단 알림(아침, 점심, 간식, 저녁) 시간이 모두 밀리게 됩니다.</strong><br/><br/>
                정확한 다이어트 스케줄 관리를 위해 다음부터는 일어나자마자 스위치온 앱을 켜주세요!
              </p>
              <button onClick={() => {
                setIsForgotRecordDialogOpen(false);
                setIsWokenUp(true);
                setIsWakeTimeModalOpen(true);
              }} className="w-full py-3.5 bg-[#13ec92] text-slate-900 rounded-xl font-bold text-sm shadow-sm">
                실제 일어난 시간 입력하기
              </button>
            </div>
          </div>
        )}

        {/* Abnormal Wake Time Dialog */}
        {isAbnormalWakeTimeDialogOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center px-5">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsAbnormalWakeTimeDialogOpen(false)}></div>
            <div className="bg-white rounded-3xl p-6 relative z-10 shadow-2xl w-full max-w-sm animate-[scaleIn_0.2s_ease-out]">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-3 text-center">기상 시간이 불규칙해요 🚨</h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed text-center">
                스위치온 다이어트에서는 <strong>생체 리듬</strong>을 되찾는 것이 핵심입니다.
              </p>
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-xs text-slate-500 leading-relaxed">
                늦게 일어나거나 수면이 불규칙하면 스트레스 호르몬(코르티솔)이 분비되어 <strong>지방을 축적</strong>하고, 식욕 조절 호르몬(렙틴)이 감소해 <strong>폭식을 유발</strong>할 수 있어요.<br/><br/>
                내일은 밤 12시~새벽 4시를 포함해 6시간 이상 푹 자고, 아침 5시~9시 사이에 일어나보세요!
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => setIsAbnormalWakeTimeDialogOpen(false)} className="w-full py-3.5 bg-[#13ec92] text-slate-900 rounded-xl font-bold text-sm shadow-sm">
                  네, 내일은 일찍 일어날게요!
                </button>
                <button onClick={() => {
                  setIsAbnormalWakeTimeDialogOpen(false);
                  setIsWakeTimeModalOpen(true);
                }} className="w-full py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm">
                  실수로 잘못 눌렀어요 (시간 수정)
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Missed Bedtime Modal */}
        {isMissedBedtimeModalOpen && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsMissedBedtimeModalOpen(false)}
            ></div>
            <div className="bg-white rounded-t-3xl p-6 relative z-10 shadow-2xl animate-[slideUp_0.3s_ease-out]">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
              <div className="flex items-center gap-2 mb-2">
                <Moon size={20} className="text-indigo-500" />
                <h3 className="text-xl font-black text-slate-800">어제 취침 시간 기록</h3>
              </div>
              
              {isBedtimeLate(missedBedtime) ? (
                <div className="bg-indigo-50 rounded-2xl p-4 mb-6 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-indigo-500" />
                    <span className="font-bold text-indigo-700 text-sm">지방 분해 골든타임 놓침</span>
                  </div>
                  <p className="text-xs text-indigo-600 leading-relaxed">
                    자정~새벽 4시는 살이 빠지는 핵심 시간이에요. 너무 늦게 주무시면 식욕 억제 호르몬이 줄어들어요 😭
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-500 mb-6">어제 밤 몇 시에 주무셨나요?</p>
              )}
              
              <input 
                type="time" 
                value={missedBedtime}
                onChange={(e) => setMissedBedtime(e.target.value)}
                className={`w-full bg-slate-50 border rounded-2xl p-4 text-2xl font-black text-center mb-6 focus:outline-none transition-colors ${isBedtimeLate(missedBedtime) ? 'border-indigo-300 text-indigo-600 focus:border-indigo-500 focus:bg-indigo-50/50' : 'border-slate-200 text-slate-700 focus:border-indigo-400 focus:bg-white'}`}
              />
              
              <div className="flex gap-3">
                <button onClick={() => setIsMissedBedtimeModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm">취소</button>
                <button onClick={() => {
                  setHasMissedBedtime(false);
                  setIsMissedBedtimeModalOpen(false);
                }} className="flex-[2] py-4 bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-sm">기록 완료</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
