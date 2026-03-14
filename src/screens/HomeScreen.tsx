import React, { useState } from 'react';
import { Calendar, Sun, Check, MessageCircle, Sparkles, GlassWater, Moon, Lock, AlertTriangle, CheckCircle2, Timer, Utensils } from 'lucide-react';

export default function HomeScreen({ onNavigate }) {
  const [isWokenUp, setIsWokenUp] = useState(true);

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

        <div className="px-5 mb-2">
          <button onClick={() => setIsWokenUp(!isWokenUp)} className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium">
            테스트: {isWokenUp ? '기상 전 상태로 보기' : '기상 후 상태로 보기'}
          </button>
        </div>

        <section className="px-5 py-2">
          {!isWokenUp ? (
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center mb-6 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#13ec92]/10 rounded-full blur-2xl"></div>
              <Sun size={48} className="text-slate-300 mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">좋은 아침입니다!</h2>
              <p className="text-sm text-slate-500 mb-6">기상 시간을 기록하고<br/>오늘의 식단 플랜을 시작해보세요.</p>
              <button onClick={() => setIsWokenUp(true)} className="w-full bg-[#13ec92] hover:bg-[#10d482] text-slate-900 font-bold py-4 rounded-2xl shadow-sm transition-transform active:scale-95">
                지금 일어났어요
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden mb-4">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#13ec92]/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-1">위장관 휴식 기간 🌿</h2>
                  <p className="text-sm text-slate-500 mb-4">오늘은 단백질 쉐이크만<br/>하루 4번 먹는 날이에요.</p>
                  <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-2 rounded-2xl">
                    <Sun size={18} className="text-amber-500" />
                    <span className="text-sm font-bold text-slate-700">기상 07:00</span>
                  </div>
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
                { label: '저녁', time: '기상 후 9.5~10.5시간' }
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
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-100">
                      <CheckCircle2 size={12} />
                      허용
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
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-100">
                      <AlertTriangle size={12} />
                      주의
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
                        <button className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-3 rounded-2xl flex items-center justify-center transition-transform active:scale-95 text-sm">
                          스킵
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dinner */}
              <div className="relative z-10 flex gap-4">
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
      </div>
    </>
  );
}
