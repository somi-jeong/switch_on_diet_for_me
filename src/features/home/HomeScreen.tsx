import React, { useState } from 'react';
import { Calendar, Sun, Check, MessageCircle, Sparkles, GlassWater, Moon, Lock, AlertTriangle, CheckCircle2, Timer, Utensils, ChevronDown, ChevronUp, MinusCircle, Pill, Activity, ChevronRight, X } from 'lucide-react';

const CustomTimePicker = ({ value, onChange, isWarning = false, warningColor = 'rose' }) => {
  const [hour, setHour] = useState(parseInt(value.split(':')[0] || '07', 10));
  const [minute, setMinute] = useState(parseInt(value.split(':')[1] || '00', 10));

  const updateTime = (h, m) => {
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    onChange(`${hh}:${mm}`);
  };

  const handleHourChange = (delta) => {
    const newHour = (hour + delta + 24) % 24;
    setHour(newHour);
    updateTime(newHour, minute);
  };

  const handleMinuteChange = (delta) => {
    const newMinute = (minute + delta + 60) % 60;
    setMinute(newMinute);
    updateTime(hour, newMinute);
  };

  const isPM = hour >= 12;
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  const handleAmPmToggle = (toPM) => {
    if (toPM && !isPM) {
      const newHour = hour + 12;
      setHour(newHour);
      updateTime(newHour, minute);
    } else if (!toPM && isPM) {
      const newHour = hour - 12;
      setHour(newHour);
      updateTime(newHour, minute);
    }
  };

  const getWarningColors = () => {
    if (warningColor === 'indigo') {
      return {
        bg: 'bg-indigo-100 text-indigo-700',
        border: 'border-indigo-200',
        text: 'text-indigo-600'
      };
    }
    return {
      bg: 'bg-rose-100 text-rose-700',
      border: 'border-rose-200',
      text: 'text-rose-600'
    };
  };

  const colors = isWarning ? getWarningColors() : {
    bg: 'bg-[#13ec92] text-slate-900',
    border: 'border-[#13ec92]/30',
    text: 'text-slate-800'
  };

  return (
    <div className="flex items-center justify-center gap-3 my-6">
      {/* AM/PM Toggle */}
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => handleAmPmToggle(false)}
          className={`py-3 px-4 rounded-2xl font-bold transition-all ${!isPM ? `${colors.bg} shadow-sm scale-105` : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
        >
          오전
        </button>
        <button 
          onClick={() => handleAmPmToggle(true)}
          className={`py-3 px-4 rounded-2xl font-bold transition-all ${isPM ? `${colors.bg} shadow-sm scale-105` : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
        >
          오후
        </button>
      </div>

      {/* Hour Picker */}
      <div className={`flex flex-col items-center bg-slate-50 rounded-3xl p-2 w-20 border shadow-inner transition-colors ${colors.border}`}>
        <button onClick={() => handleHourChange(1)} className="p-3 text-slate-400 hover:text-slate-600 active:scale-95 transition-transform"><ChevronUp size={24} /></button>
        <div className={`text-4xl font-black py-2 w-full text-center ${colors.text}`}>{displayHour}</div>
        <button onClick={() => handleHourChange(-1)} className="p-3 text-slate-400 hover:text-slate-600 active:scale-95 transition-transform"><ChevronDown size={24} /></button>
      </div>

      <div className="text-2xl font-black text-slate-300 pb-1">:</div>

      {/* Minute Picker */}
      <div className={`flex flex-col items-center bg-slate-50 rounded-3xl p-2 w-20 border shadow-inner transition-colors ${colors.border}`}>
        <button onClick={() => handleMinuteChange(5)} className="p-3 text-slate-400 hover:text-slate-600 active:scale-95 transition-transform"><ChevronUp size={24} /></button>
        <div className={`text-4xl font-black py-2 w-full text-center ${colors.text}`}>{minute.toString().padStart(2, '0')}</div>
        <button onClick={() => handleMinuteChange(-5)} className="p-3 text-slate-400 hover:text-slate-600 active:scale-95 transition-transform"><ChevronDown size={24} /></button>
      </div>
    </div>
  );
};

const RecordMealModal = ({ isOpen, onClose, onSave, mealName, defaultTime }) => {
  const [text, setText] = useState('');
  const [time, setTime] = useState(defaultTime);
  const [isLateRecord, setIsLateRecord] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-xl animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">{mealName} 기록하기</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">섭취 시간</label>
            <input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-lg font-bold text-slate-700 focus:outline-none focus:border-[#13ec92] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">무엇을 드셨나요?</label>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="예: 단백질 쉐이크와 아몬드 5알 (금지식품 예: 마카롱, 라면, 과자 등)"
              className="w-full h-24 resize-none bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#13ec92] transition-colors"
            />
          </div>

          <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isLateRecord}
              onChange={(e) => setIsLateRecord(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-[#13ec92] focus:ring-[#13ec92]"
            />
            <span className="text-sm font-medium text-slate-700">식사 후 한참 뒤에 기록하는 중입니다 (뒤늦게 기록)</span>
          </label>
        </div>

        <button 
          onClick={() => onSave(text, time, isLateRecord)}
          disabled={!text.trim()}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 ${
            text.trim() ? 'bg-[#13ec92] text-slate-900 hover:bg-[#10d482]' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Sparkles size={20} />
          AI 분석 및 기록하기
        </button>
      </div>
    </div>
  );
};

export default function HomeScreen({ onNavigate }) {
  const [isWokenUp, setIsWokenUp] = useState(true);
  const [isWakeTimeModalOpen, setIsWakeTimeModalOpen] = useState(false);
  const [wakeTime, setWakeTime] = useState('13:00');
  const [isSkipDialogOpen, setIsSkipDialogOpen] = useState(false);
  const [mockCurrentTime, setMockCurrentTime] = useState('11:00');
  const [isForgotRecordDialogOpen, setIsForgotRecordDialogOpen] = useState(false);
  const [isAbnormalWakeTimeDialogOpen, setIsAbnormalWakeTimeDialogOpen] = useState(false);
  const [hasMissedBedtime, setHasMissedBedtime] = useState(true);
  const [isMissedBedtimeModalOpen, setIsMissedBedtimeModalOpen] = useState(false);
  const [missedBedtime, setMissedBedtime] = useState('02:00'); // 기본값을 늦은 시간으로 설정하여 테스트 용이하게 함
  const [isTodayBedtimeModalOpen, setIsTodayBedtimeModalOpen] = useState(false);
  const [todayBedtime, setTodayBedtime] = useState('23:30');
  const [isLateBedtimeWarningOpen, setIsLateBedtimeWarningOpen] = useState(false);
  const [pendingBedtimeAction, setPendingBedtimeAction] = useState(null);
  const [isFirstDay, setIsFirstDay] = useState(false);
  const [firstDayBedtime, setFirstDayBedtime] = useState(null);
  const [isFirstDayBedtimeModalOpen, setIsFirstDayBedtimeModalOpen] = useState(false);
  const [snackRecord, setSnackRecord] = useState(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
  const [dailyChecklist, setDailyChecklist] = useState({
    water: false,
    supplements: false,
    workout: false,
  });

  // Calculate sleep duration
  const getSleepDuration = (bedTimeStr, wakeTimeStr) => {
    if (!bedTimeStr) return { h: 0, m: 0, totalMins: 0 };
    let [bH, bM] = bedTimeStr.split(':').map(Number);
    let [wH, wM] = wakeTimeStr.split(':').map(Number);
    let bedMins = bH * 60 + bM;
    let wakeMins = wH * 60 + wM;
    if (wakeMins < bedMins) wakeMins += 24 * 60;
    let diff = wakeMins - bedMins;
    let h = Math.floor(diff / 60);
    let m = diff % 60;
    return { h, m, totalMins: diff };
  };

  const activeBedtime = isFirstDay ? (firstDayBedtime || '23:30') : missedBedtime;
  const sleepData = getSleepDuration(activeBedtime, wakeTime);
  const isSleepValid = sleepData.totalMins >= 360; // 6 hours

  const toggleChecklist = (key) => {
    setDailyChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isTimeLate = (timeStr) => {
    return timeStr > '09:00' || timeStr < '05:00';
  };

  const isExtremeLate = (timeStr) => {
    const [h] = timeStr.split(':').map(Number);
    return h >= 15; // 15:00 (3 PM) 이후 기상 시 극단적 지연으로 간주
  };

  const isBedtimeLate = (timeStr) => {
    return timeStr >= '00:00' && timeStr <= '05:00';
  };

  const handleSaveMeal = (text, time, isLateRecord) => {
    const forbiddenWords = ['마카롱', '과자', '빵', '라면', '술', '맥주', '아이스크림', '초콜릿', '떡볶이', '당', '설탕', '액상과당', '치킨', '피자'];
    const isForbidden = forbiddenWords.some(word => text.includes(word));
    
    let feedback = '';
    let snackbarMsg = '';
    let snackType = 'success';

    if (isForbidden) {
      feedback = `앗! '${text}'에는 금지된 식품이 포함되어 있어요. 😭 당분이 들어오면 인슐린이 분비되어 지방 분해가 멈추게 됩니다. 다음 식사는 꼭 허용 식품으로만 구성해주세요!`;
      snackbarMsg = '🚨 금지 식품이 감지되었습니다! AI 코치 피드백을 확인해주세요.';
      snackType = 'error';
    } else {
      if (isLateRecord) {
        feedback = '기록을 잊지 않고 해주셨네요! 다음부터는 식사 직후에 기록하면 더 정확한 코칭을 받을 수 있어요. 허용 식품으로 잘 드셨습니다!';
        snackbarMsg = '✅ 늦었지만 식단 기록이 완료되었습니다.';
        snackType = 'warning';
      } else {
        feedback = '잘하셨어요! 허용 식품으로 건강하게 간식을 드셨네요. 남은 하루도 화이팅입니다!';
        snackbarMsg = '✅ 식단 기록이 완료되었습니다.';
        snackType = 'success';
      }
    }

    setSnackRecord({ text, time, isForbidden, feedback, isLateRecord });
    setIsRecordModalOpen(false);
    
    setSnackbarMessage(snackbarMsg);
    setSnackbarType(snackType);
    setTimeout(() => setSnackbarMessage(''), 4000);
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
          <button onClick={() => setIsFirstDay(!isFirstDay)} className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium">
            1일차 모드: {isFirstDay ? 'ON' : 'OFF'}
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

        {/* Daily Checklist Section */}
        {isWokenUp && (
          <section className="px-5 py-4">
            <h3 className="text-lg font-bold text-slate-800 mb-3">오늘의 데일리 미션</h3>
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
              <button 
                onClick={() => toggleChecklist('water')}
                className="w-full flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${dailyChecklist.water ? 'bg-blue-100 text-blue-500' : 'bg-slate-100 text-slate-400'}`}>
                    <GlassWater size={20} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold transition-colors ${dailyChecklist.water ? 'text-slate-800 line-through decoration-slate-300' : 'text-slate-700'}`}>물 2L 이상 마시기</p>
                    <p className="text-xs text-slate-400">충분한 수분 섭취는 대사를 높여요</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${dailyChecklist.water ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300 text-transparent group-hover:border-blue-300'}`}>
                  <Check size={14} strokeWidth={3} />
                </div>
              </button>

              <div className="w-full h-px bg-slate-100"></div>

              <button 
                onClick={() => toggleChecklist('supplements')}
                className="w-full flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${dailyChecklist.supplements ? 'bg-amber-100 text-amber-500' : 'bg-slate-100 text-slate-400'}`}>
                    <Pill size={20} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold transition-colors ${dailyChecklist.supplements ? 'text-slate-800 line-through decoration-slate-300' : 'text-slate-700'}`}>영양제 챙겨먹기</p>
                    <p className="text-xs text-slate-400">유산균, 오메가3, 비타민 등</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${dailyChecklist.supplements ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300 text-transparent group-hover:border-amber-300'}`}>
                  <Check size={14} strokeWidth={3} />
                </div>
              </button>

              <div className="w-full h-px bg-slate-100"></div>

              <button 
                onClick={() => toggleChecklist('workout')}
                className="w-full flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${dailyChecklist.workout ? 'bg-[#13ec92]/20 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Activity size={20} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold transition-colors ${dailyChecklist.workout ? 'text-slate-800 line-through decoration-slate-300' : 'text-slate-700'}`}>고강도 운동하기</p>
                    <p className="text-xs text-slate-400">주 4회 이상, 숨이 찰 정도로!</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${dailyChecklist.workout ? 'bg-[#13ec92] border-[#13ec92] text-slate-900' : 'border-slate-300 text-transparent group-hover:border-[#13ec92]'}`}>
                  <Check size={14} strokeWidth={3} />
                </div>
              </button>

              <div className="w-full h-px bg-slate-100"></div>

              {isFirstDay && !firstDayBedtime ? (
                <button 
                  onClick={() => setIsFirstDayBedtimeModalOpen(true)}
                  className="w-full flex items-center justify-between py-2 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-100 group-hover:text-indigo-500 transition-colors">
                      <Moon size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                        전날 취침 시간 입력하기
                      </p>
                      <p className="text-xs text-slate-400">
                        정확한 수면 시간 계산을 위해 필요해요
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-300 group-hover:border-indigo-300 group-hover:text-indigo-400 transition-colors">
                    <ChevronRight size={14} strokeWidth={3} />
                  </div>
                </button>
              ) : (
                <div className="w-full flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${isSleepValid ? 'bg-indigo-100 text-indigo-500' : 'bg-rose-100 text-rose-500'}`}>
                      <Moon size={20} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-bold ${isSleepValid ? 'text-slate-800' : 'text-rose-600'}`}>
                        수면 {sleepData.h}시간 {sleepData.m}분 {isFirstDay ? '(직접 기록)' : '(자동 기록)'}
                      </p>
                      <p className="text-xs text-slate-400">
                        {isSleepValid ? '최소 6시간 수면 달성! 🌙' : '수면 시간이 6시간 미만이에요 💦'}
                      </p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSleepValid ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-rose-500 border-rose-500 text-white'}`}>
                    {isSleepValid ? <Check size={14} strokeWidth={3} /> : <AlertTriangle size={14} strokeWidth={3} />}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

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
          ) : isExtremeLate(wakeTime) ? (
            <>
              {/* Extreme Late Schedule */}
              <div className="relative z-10 flex gap-4 mb-10">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shadow-sm">
                    <AlertTriangle size={20} strokeWidth={3} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-lg font-bold text-slate-800">정규 식단 취소</h3>
                    </div>
                  </div>
                  <div className="bg-rose-50 rounded-3xl p-4 border border-rose-100 opacity-90">
                    <div className="flex gap-3 mb-1">
                      <div className="w-12 h-12 rounded-2xl bg-rose-200/50 flex items-center justify-center text-rose-500 flex-shrink-0">
                        <MinusCircle size={24} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-bold text-slate-700 line-through">아침, 점심, 간식</span>
                        <span className="text-xs text-rose-500">기상 지연으로 인한 스킵</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="bg-rose-100/50 rounded-2xl rounded-tl-none p-3 relative flex flex-col justify-center border border-rose-200/50">
                        <div className="flex items-center gap-1 mb-1">
                          <Sparkles size={14} className="text-rose-500" />
                          <span className="text-xs font-bold text-rose-600">AI 코치</span>
                        </div>
                        <p className="text-[11px] text-rose-700 font-medium leading-relaxed">
                          기상 시간이 너무 늦어 오늘의 정규 식단 스케줄이 취소되었습니다. 무리하게 식사를 몰아서 하지 마세요!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dinner (Only Meal) */}
              <div className="relative z-10 flex gap-4 mb-10">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-10 h-10 rounded-full bg-white border-[3px] border-[#13ec92] flex items-center justify-center shadow-sm relative">
                    <div className="w-3 h-3 rounded-full bg-[#13ec92] animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-[#13ec92]/20 animate-ping" style={{ animationDuration: '2s' }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-800">가벼운 저녁</h3>
                    <span className="text-sm font-bold text-slate-500">기상 후 1~2시간 내</span>
                  </div>
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#13ec92]/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#13ec92]/10 to-transparent rounded-bl-full"></div>
                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-slate-700 mb-4">단백질 쉐이크 1잔만 가볍게 섭취하세요.</p>
                      <div className="flex gap-2">
                        <button onClick={() => onNavigate('record')} className="flex-1 bg-[#13ec92] hover:bg-[#10d482] text-slate-900 font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 text-sm">
                          <Check size={16} />
                          기록하기
                        </button>
                      </div>
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
                      <button onClick={() => setIsTodayBedtimeModalOpen(true)} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 text-sm">
                        <Check size={16} />
                        취침 기록하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Breakfast */}
              <div className="relative z-10 flex gap-4 mb-10">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                    <MinusCircle size={20} strokeWidth={3} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-lg font-bold text-slate-400 line-through">아침</h3>
                      <span className="text-sm font-bold text-slate-400">건너뜀</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onNavigate('record')} className="text-[11px] font-bold text-slate-400 hover:text-slate-600 underline underline-offset-2">수정</button>
                      <div className="flex items-center gap-1 bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                        <MinusCircle size={12} />
                        스킵됨
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 opacity-80">
                    <div className="flex gap-3 mb-1">
                      <div className="w-12 h-12 rounded-2xl bg-slate-200/50 flex items-center justify-center text-slate-400 flex-shrink-0">
                        <GlassWater size={24} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-bold text-slate-500 line-through">단백질 쉐이크 1컵</span>
                        <span className="text-xs text-slate-400">기상 지연으로 인한 스킵</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="bg-slate-200/50 rounded-2xl rounded-tl-none p-3 relative flex flex-col justify-center border border-slate-200/50">
                        <div className="flex items-center gap-1 mb-1">
                          <Sparkles size={14} className="text-slate-500" />
                          <span className="text-xs font-bold text-slate-600">AI 코치</span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                          기상 시간이 늦어 아침 식단을 건너뛰었습니다. 공복 시간을 유지하고 점심부터 스케줄에 맞춰 식사해주세요!
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
                      <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-0.5 rounded text-[10px] font-bold border border-rose-100">
                        <AlertTriangle size={12} />
                        허용식품 아님
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
                    <div className="flex gap-3 mb-1">
                      <div className="w-12 h-12 rounded-2xl bg-rose-100/50 flex items-center justify-center text-rose-600 flex-shrink-0">
                        <Utensils size={24} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-bold text-slate-800">단백질 쉐이크 + 마카롱 1개</span>
                        <span className="text-xs text-slate-500">텍스트 입력됨</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="bg-rose-50 rounded-2xl rounded-tl-none p-3 relative flex flex-col justify-center border border-rose-100/50">
                        <div className="flex items-center gap-1 mb-1">
                          <Sparkles size={14} className="text-rose-600" />
                          <span className="text-xs font-bold text-rose-700">AI 코치</span>
                        </div>
                        <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                          앗! 마카롱은 당류가 높아 1주차에는 절대 피해야 할 식품이에요. 😭 당분이 들어오면 인슐린이 분비되어 지방 분해가 멈추게 됩니다. 다음 식사는 꼭 허용 식품으로만 구성해주세요!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Snack */}
              <div className="relative z-10 flex gap-4 mb-10">
                <div className="flex flex-col items-center mt-1">
                  {snackRecord ? (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${snackRecord.isForbidden ? 'bg-rose-100 text-rose-500' : 'bg-[#13ec92] text-slate-900'}`}>
                      {snackRecord.isForbidden ? <AlertTriangle size={20} strokeWidth={3} /> : <Check size={20} strokeWidth={3} />}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white border-[3px] border-[#13ec92] flex items-center justify-center shadow-sm relative">
                      <div className="w-3 h-3 rounded-full bg-[#13ec92] animate-pulse"></div>
                      <div className="absolute inset-0 rounded-full bg-[#13ec92]/20 animate-ping" style={{ animationDuration: '2s' }}></div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-lg font-bold text-slate-800">오후 간식</h3>
                      <span className={`text-sm font-bold ${snackRecord ? (snackRecord.isForbidden ? 'text-rose-500' : 'text-[#13ec92]') : 'text-slate-500'}`}>
                        {snackRecord ? snackRecord.time : '15:30 예정'}
                      </span>
                    </div>
                    {snackRecord && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => setIsRecordModalOpen(true)} className="text-[11px] font-bold text-slate-400 hover:text-slate-600 underline underline-offset-2">수정</button>
                        {snackRecord.isForbidden ? (
                          <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-0.5 rounded text-[10px] font-bold border border-rose-100">
                            <AlertTriangle size={12} />
                            허용식품 아님
                          </div>
                        ) : snackRecord.isLateRecord ? (
                          <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-100">
                            <Timer size={12} />
                            뒤늦게 기록
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 bg-[#13ec92]/10 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold border border-[#13ec92]/20">
                            <CheckCircle2 size={12} />
                            기록 완료
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {snackRecord ? (
                    <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
                      <div className="flex gap-3 mb-1">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${snackRecord.isForbidden ? 'bg-rose-100/50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          <Utensils size={24} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-sm font-bold text-slate-800">{snackRecord.text}</span>
                          <span className="text-xs text-slate-500">텍스트 입력됨</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className={`rounded-2xl rounded-tl-none p-3 relative flex flex-col justify-center border ${snackRecord.isForbidden ? 'bg-rose-50 border-rose-100/50' : snackRecord.isLateRecord ? 'bg-amber-50 border-amber-100/50' : 'bg-emerald-50 border-emerald-100/50'}`}>
                          <div className="flex items-center gap-1 mb-1">
                            <Sparkles size={14} className={snackRecord.isForbidden ? 'text-rose-600' : snackRecord.isLateRecord ? 'text-amber-600' : 'text-emerald-600'} />
                            <span className={`text-xs font-bold ${snackRecord.isForbidden ? 'text-rose-700' : snackRecord.isLateRecord ? 'text-amber-700' : 'text-emerald-700'}`}>AI 코치</span>
                          </div>
                          <p className={`text-[11px] font-medium leading-relaxed ${snackRecord.isForbidden ? 'text-slate-700' : 'text-slate-700'}`}>
                            {snackRecord.feedback}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#13ec92]/30 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#13ec92]/10 to-transparent rounded-bl-full"></div>
                      <div className="relative z-10">
                        <p className="text-sm font-semibold text-slate-700 mb-4">간식 쉐이크 드실 시간이에요.</p>
                        <div className="flex gap-2">
                          <button onClick={() => setIsRecordModalOpen(true)} className="flex-1 bg-[#13ec92] hover:bg-[#10d482] text-slate-900 font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 text-sm">
                            <Check size={16} />
                            기록하기
                          </button>
                          <button onClick={() => setIsSkipDialogOpen(true)} className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-3 rounded-2xl flex items-center justify-center transition-transform active:scale-95 text-sm">
                            스킵
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
                      <button onClick={() => setIsTodayBedtimeModalOpen(true)} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 text-sm">
                        <Check size={16} />
                        취침 기록하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* AI Feedback Section (Today) */}
          {isWokenUp && (
            <div className="mt-8 mb-6">
              {isExtremeLate(wakeTime) ? (
                <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 relative overflow-hidden shadow-sm">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles size={20} className="text-rose-600" />
                        <h3 className="text-lg font-black text-rose-900">오늘의 AI 코치 피드백</h3>
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-rose-100 text-rose-700">
                        최악 (다수 위반) 🚨
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-rose-800 font-medium mb-4">
                      기상 시간이 너무 늦어 생체 리듬이 완전히 깨졌어요 😭 오늘은 정규 식단을 무리하게 진행하기보다, 가볍게 단백질 쉐이크만 섭취하고 일찍 주무시는 것을 목표로 해주세요!
                    </p>
                    
                    <div className="pt-4 border-t border-rose-200/50">
                      <p className="text-xs font-bold text-rose-700/70 mb-2">현재 놓치고 있는 규칙</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[11px] font-bold bg-white text-slate-600 px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                          기상 시간 심각한 지연
                        </span>
                        <span className="text-[11px] font-bold bg-white text-slate-600 px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                          식단 스킵 (시간 부족)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 relative overflow-hidden shadow-sm">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles size={20} className="text-blue-600" />
                        <h3 className="text-lg font-black text-blue-900">오늘의 AI 코치 피드백</h3>
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-blue-100 text-blue-700">
                        보통 (일부 누락) 👍
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-blue-800 font-medium mb-4">
                      오늘 기상 시간이 조금 늦었지만, 식단은 완벽하게 지켜주셨어요! 내일부터는 점심에 일반식이 허용됩니다.
                    </p>
                    
                    <div className="pt-4 border-t border-blue-200/50">
                      <p className="text-xs font-bold text-blue-700/70 mb-2">현재 놓치고 있는 규칙</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[11px] font-bold bg-white text-slate-600 px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                          기상 시간 지연
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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

              {getSleepDuration(missedBedtime, wakeTime).totalMins < 360 && (
                <div className="bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-amber-500" />
                    <span className="font-bold text-amber-700 text-sm">
                      수면 부족 ({getSleepDuration(missedBedtime, wakeTime).h}시간 {getSleepDuration(missedBedtime, wakeTime).m}분)
                    </span>
                  </div>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    최소 6시간 이상 푹 자야 가짜 배고픔을 막을 수 있어요. 오늘은 꼭 일찍 주무세요!
                  </p>
                </div>
              )}

              {!isTimeLate(wakeTime) && getSleepDuration(missedBedtime, wakeTime).totalMins >= 360 && (
                <p className="text-sm text-slate-500 mb-6 text-center">기상 시간에 맞춰 오늘의 식단 알림이 재조정됩니다.</p>
              )}
              
              <CustomTimePicker 
                value={wakeTime} 
                onChange={setWakeTime} 
                isWarning={isTimeLate(wakeTime)} 
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
        {/* First Day Bedtime Modal */}
        {isFirstDayBedtimeModalOpen && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsFirstDayBedtimeModalOpen(false)}
            ></div>
            <div className="bg-white rounded-t-3xl p-6 relative z-10 shadow-2xl animate-[slideUp_0.3s_ease-out]">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
              <div className="flex items-center gap-2 mb-2">
                <Moon size={20} className="text-indigo-500" />
                <h3 className="text-xl font-black text-slate-800">전날 취침 시간 입력</h3>
              </div>
              
              <p className="text-sm text-slate-500 mb-6 text-center">정확한 수면 시간 계산을 위해 어제 몇 시에 주무셨는지 알려주세요.</p>
              
              <CustomTimePicker 
                value={firstDayBedtime || '23:30'} 
                onChange={setFirstDayBedtime} 
                isWarning={false} 
                warningColor="indigo"
              />
              
              <div className="flex gap-3">
                <button onClick={() => setIsFirstDayBedtimeModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm">취소</button>
                <button onClick={() => {
                  if (!firstDayBedtime) setFirstDayBedtime('23:30');
                  setIsFirstDayBedtimeModalOpen(false);
                }} className="flex-[2] py-4 bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-sm">입력 완료</button>
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
                <p className="text-sm text-slate-500 mb-6 text-center">어제 밤 몇 시에 주무셨나요?</p>
              )}
              
              <CustomTimePicker 
                value={missedBedtime} 
                onChange={setMissedBedtime} 
                isWarning={isBedtimeLate(missedBedtime)} 
                warningColor="indigo"
              />
              
              <div className="flex gap-3">
                <button onClick={() => setIsMissedBedtimeModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm">취소</button>
                <button onClick={() => {
                  if (isBedtimeLate(missedBedtime)) {
                    setPendingBedtimeAction(() => () => {
                      setHasMissedBedtime(false);
                      setIsMissedBedtimeModalOpen(false);
                    });
                    setIsLateBedtimeWarningOpen(true);
                  } else {
                    setHasMissedBedtime(false);
                    setIsMissedBedtimeModalOpen(false);
                  }
                }} className="flex-[2] py-4 bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-sm">기록 완료</button>
              </div>
            </div>
          </div>
        )}

        {/* Today Bedtime Modal */}
        {isTodayBedtimeModalOpen && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsTodayBedtimeModalOpen(false)}
            ></div>
            <div className="bg-white rounded-t-3xl p-6 relative z-10 shadow-2xl animate-[slideUp_0.3s_ease-out]">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
              <div className="flex items-center gap-2 mb-2">
                <Moon size={20} className="text-indigo-500" />
                <h3 className="text-xl font-black text-slate-800">오늘 취침 시간 기록</h3>
              </div>
              
              {isBedtimeLate(todayBedtime) ? (
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
                <p className="text-sm text-slate-500 mb-6 text-center">오늘 밤 몇 시에 주무실 예정인가요?</p>
              )}
              
              <CustomTimePicker 
                value={todayBedtime} 
                onChange={setTodayBedtime} 
                isWarning={isBedtimeLate(todayBedtime)} 
                warningColor="indigo"
              />
              
              <div className="flex gap-3">
                <button onClick={() => setIsTodayBedtimeModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm">취소</button>
                <button onClick={() => {
                  if (isBedtimeLate(todayBedtime)) {
                    setPendingBedtimeAction(() => () => {
                      setIsTodayBedtimeModalOpen(false);
                      // 추가적인 취침 완료 로직이 있다면 여기에 작성
                    });
                    setIsLateBedtimeWarningOpen(true);
                  } else {
                    setIsTodayBedtimeModalOpen(false);
                  }
                }} className="flex-[2] py-4 bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-sm">기록 완료</button>
              </div>
            </div>
          </div>
        )}

        {/* Late Bedtime Warning Alert Dialog */}
        {isLateBedtimeWarningOpen && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center px-5">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsLateBedtimeWarningOpen(false)}></div>
            <div className="bg-white rounded-3xl p-6 relative z-10 shadow-2xl w-full max-w-sm animate-[scaleIn_0.2s_ease-out]">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-3 text-center">정말 이 시간에 주무셨나요? 🚨</h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed text-center">
                스위치온 다이어트에서 <strong>수면은 식단만큼 중요</strong>합니다.
              </p>
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-xs text-slate-500 leading-relaxed">
                자정부터 새벽 4시 사이에는 <strong>지방 분해 호르몬</strong>이 가장 활발하게 분비됩니다.<br/><br/>
                이 시간을 놓치면 다음 날 <strong>가짜 배고픔</strong>이 심해지고 다이어트 효율이 급격히 떨어집니다. 내일은 꼭 자정 전에 주무셔야 해요!
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => {
                  setIsLateBedtimeWarningOpen(false);
                  if (pendingBedtimeAction) pendingBedtimeAction();
                }} className="w-full py-3.5 bg-rose-500 text-white rounded-xl font-bold text-sm shadow-sm">
                  네, 명심할게요 (기록 완료)
                </button>
                <button onClick={() => {
                  setIsLateBedtimeWarningOpen(false);
                }} className="w-full py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm">
                  시간 다시 입력하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <RecordMealModal 
        isOpen={isRecordModalOpen} 
        onClose={() => setIsRecordModalOpen(false)} 
        onSave={handleSaveMeal} 
        mealName="오후 간식" 
        defaultTime="15:30" 
      />

      {snackbarMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 animate-slide-up">
          <div className={`rounded-2xl p-4 shadow-lg flex items-center gap-3 ${
            snackbarType === 'error' ? 'bg-rose-600 text-white' : 
            snackbarType === 'warning' ? 'bg-amber-500 text-white' : 
            'bg-slate-800 text-white'
          }`}>
            {snackbarType === 'error' ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
            <p className="text-sm font-medium flex-1">{snackbarMessage}</p>
            <button onClick={() => setSnackbarMessage('')} className="text-white/70 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
