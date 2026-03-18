import React, { useState } from 'react';
import { ArrowLeft, Calendar, Edit2, Trash2, Save, FileJson, Check, X, Clock, AlertTriangle, Copy, Download, ChevronRight, Unlock } from 'lucide-react';

export default function DeveloperModeScreen({ onBack }) {
  const currentAppDay = 1; // 실제 앱에서는 전역 상태에서 가져옴
  const [selectedDay, setSelectedDay] = useState(currentAppDay);
  const [showJson, setShowJson] = useState(false);
  const [unlockFutureDays, setUnlockFutureDays] = useState(false);
  
  // Modals & Toasts
  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMealEditModalOpen, setIsMealEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Edit State
  const [editType, setEditType] = useState<string | null>(null); // 'wakeTime', 'bedTime', 'weight', 'fat'
  const [editValue, setEditValue] = useState('');
  
  // Meal Edit State
  const [editingMealId, setEditingMealId] = useState<number | null>(null);
  const [editingMealTime, setEditingMealTime] = useState('');

  // Mock data for demonstration
  const [mockData, setMockData] = useState({
    wakeTime: '08:17',
    bedTime: '02:00',
    weight: 75.5,
    fat: 23.5,
    meals: [
      { id: 1, label: '아침', status: 'recorded', time: '08:30' },
      { id: 2, label: '점심', status: 'skipped', reason: '배불러서' },
      { id: 3, label: '간식', status: 'pending' },
      { id: 4, label: '저녁', status: 'pending' },
    ]
  });

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Handlers ---

  // 1. Edit Field (Wake/Bed/Weight/Fat)
  const handleEditClick = (type: string, value: any) => {
    setEditType(type);
    setEditValue(String(value));
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setMockData(prev => ({ ...prev, [editType!]: editValue }));
    setIsEditModalOpen(false);
    showToast(`데이터가 수정되었습니다.`);
  };

  // 2. Meal Actions
  const handleMealAction = (id: number, action: 'delete' | 'record' | 'skip') => {
    setMockData(prev => ({
      ...prev,
      meals: prev.meals.map(meal => {
        if (meal.id === id) {
          if (action === 'delete') return { ...meal, status: 'pending', time: undefined, reason: undefined };
          if (action === 'record') {
            const now = new Date();
            const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            return { ...meal, status: 'recorded', time: timeString };
          }
          if (action === 'skip') return { ...meal, status: 'skipped', reason: '강제 스킵 (개발자)' };
        }
        return meal;
      })
    }));
    showToast(`식사 기록이 '${action}' 처리되었습니다.`);
  };

  const handleMealEditClick = (meal: any) => {
    setEditingMealId(meal.id);
    setEditingMealTime(meal.time || '12:00');
    setIsMealEditModalOpen(true);
  };

  const handleSaveMealEdit = () => {
    setMockData(prev => ({
      ...prev,
      meals: prev.meals.map(meal => 
        meal.id === editingMealId ? { ...meal, time: editingMealTime } : meal
      )
    }));
    setIsMealEditModalOpen(false);
    showToast('식사 시간이 수정되었습니다.');
  };

  // 3. JSON Actions
  const getJsonString = () => {
    // 실제 DB에 들어갈 때는 날짜와 시간을 조합하여 ISO String으로 변환하는 로직이 들어갑니다.
    // 여기서는 보여주기용으로 조합합니다.
    const baseDate = `2026-03-${selectedDay.toString().padStart(2, '0')}`;
    const dbFormat = {
      date: baseDate,
      wakeTime: `${baseDate}T${mockData.wakeTime}:00.000Z`,
      bedTime: `${baseDate}T${mockData.bedTime}:00.000Z`,
      weight: mockData.weight,
      fat: mockData.fat,
      meals: mockData.meals.map(m => ({
        ...m,
        recordedAt: m.time ? `${baseDate}T${m.time}:00.000Z` : null
      }))
    };
    return JSON.stringify(dbFormat, null, 2);
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(getJsonString());
      showToast('JSON 데이터가 클립보드에 복사되었습니다.');
    } catch (err) {
      showToast('복사 실패: 브라우저 권한을 확인해주세요.');
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([getJsonString()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diet_record_day${selectedDay}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Day ${selectedDay} 데이터가 다운로드되었습니다.`);
  };

  // 4. Global Actions
  const handleSaveChanges = () => {
    showToast(`Day ${selectedDay}의 모든 변경사항이 DB에 저장되었습니다.`);
  };

  const handleDeleteDay = () => {
    setMockData({
      wakeTime: '--:--',
      bedTime: '--:--',
      weight: 0,
      fat: 0,
      meals: [
        { id: 1, label: '아침', status: 'pending' },
        { id: 2, label: '점심', status: 'pending' },
        { id: 3, label: '간식', status: 'pending' },
        { id: 4, label: '저녁', status: 'pending' },
      ]
    });
    setIsDeleteConfirmOpen(false);
    showToast(`Day ${selectedDay} 데이터가 완전히 삭제되었습니다.`);
  };

  // Available Days Array
  const availableDays = unlockFutureDays 
    ? Array.from({ length: 28 }, (_, i) => i + 1)
    : Array.from({ length: currentAppDay }, (_, i) => i + 1);

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center gap-3 border-b border-slate-100 sticky top-0 z-20">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="text-indigo-500">🔧</span> 개발자 모드
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-32">
        {/* Day Selector (Custom Bottom Sheet Trigger) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-indigo-500" />
              <h2 className="text-sm font-bold text-slate-800">데이터 조회 날짜</h2>
            </div>
            <button 
              onClick={() => setUnlockFutureDays(!unlockFutureDays)}
              className={`p-1.5 rounded-lg transition-colors ${unlockFutureDays ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}
              title="미래 날짜 잠금 해제 (테스트용)"
            >
              <Unlock size={14} />
            </button>
          </div>
          
          <button 
            onClick={() => setIsDayPickerOpen(true)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 flex items-center justify-between hover:bg-slate-100 transition-colors"
          >
            <span className="font-bold">Day {selectedDay} {selectedDay === currentAppDay && '(오늘)'}</span>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-slate-200"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">데이터 편집</span>
          <div className="h-[1px] flex-1 bg-slate-200"></div>
        </div>

        {/* Wake Time */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-slate-400 mb-1">기상 시간</p>
            <p className="text-sm font-bold text-slate-800">{mockData.wakeTime}</p>
          </div>
          <button onClick={() => handleEditClick('wakeTime', mockData.wakeTime)} className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-100 transition-colors" title="기상 시간 수정">
            <Edit2 size={16} />
          </button>
        </div>

        {/* Bed Time */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-slate-400 mb-1">취침 시간</p>
            <p className="text-sm font-bold text-slate-800">{mockData.bedTime}</p>
          </div>
          <button onClick={() => handleEditClick('bedTime', mockData.bedTime)} className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-100 transition-colors" title="취침 시간 수정">
            <Edit2 size={16} />
          </button>
        </div>

        {/* Meal Records */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-xs font-bold text-slate-400 mb-4">식사 기록 강제 조작</p>
          <div className="space-y-3">
            {mockData.meals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  {meal.status === 'recorded' && <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><Check size={14} strokeWidth={3} /></div>}
                  {meal.status === 'skipped' && <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center"><X size={14} strokeWidth={3} /></div>}
                  {meal.status === 'pending' && <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center"><Clock size={14} strokeWidth={3} /></div>}
                  
                  <div>
                    <p className="text-sm font-bold text-slate-800">{meal.label}</p>
                    <p className="text-xs text-slate-500">
                      {meal.status === 'recorded' && `${meal.time} 기록됨`}
                      {meal.status === 'skipped' && `스킵 (${meal.reason})`}
                      {meal.status === 'pending' && '아직 안 먹음'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {meal.status !== 'pending' ? (
                    <>
                      {meal.status === 'recorded' && (
                        <button onClick={() => handleMealEditClick(meal)} className="w-8 h-8 bg-white border border-slate-200 text-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-50" title="시간 수정">
                          <Edit2 size={14} />
                        </button>
                      )}
                      <button onClick={() => handleMealAction(meal.id, 'delete')} className="w-8 h-8 bg-white border border-rose-100 text-rose-500 rounded-lg flex items-center justify-center hover:bg-rose-50" title="기록 삭제 (초기화)">
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleMealAction(meal.id, 'record')} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100" title="강제 기록 처리">Record</button>
                      <button onClick={() => handleMealAction(meal.id, 'skip')} className="px-3 py-1.5 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-300" title="강제 스킵 처리">Skip</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weight / Fat */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-slate-400 mb-1">체중 / 체지방</p>
            <p className="text-sm font-bold text-slate-800">체중: {mockData.weight} kg</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">체지방: {mockData.fat} %</p>
          </div>
          <button onClick={() => handleEditClick('weight', mockData.weight)} className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-100 transition-colors" title="체중/체지방 수정">
            <Edit2 size={16} />
          </button>
        </div>

        {/* Raw JSON */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div 
            className="p-5 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setShowJson(!showJson)}
          >
            <div className="flex items-center gap-2">
              <FileJson size={18} className="text-indigo-500" />
              <h2 className="text-sm font-bold text-slate-800">Raw JSON (DB 구조)</h2>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
              {showJson ? '접기' : '펼치기'}
            </span>
          </div>
          {showJson && (
            <div className="p-5 pt-0 border-t border-slate-100">
              <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs overflow-x-auto font-mono mt-4">
                {getJsonString()}
              </pre>
              <div className="flex gap-2 mt-3">
                <button onClick={handleCopyJson} className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5">
                  <Copy size={14} /> Copy
                </button>
                <button onClick={handleExportJson} className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5">
                  <Download size={14} /> Export
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-4 pb-8 space-y-3">
          <button onClick={handleSaveChanges} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors active:scale-[0.98]" title="현재 화면의 데이터를 DB에 덮어씁니다">
            <Save size={18} />
            변경사항 DB에 강제 저장
          </button>
          <button onClick={() => setIsDeleteConfirmOpen(true)} className="w-full py-4 bg-white border border-rose-200 text-rose-500 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-rose-50 transition-colors active:scale-[0.98]" title="해당 Day의 데이터를 완전히 삭제합니다">
            <Trash2 size={18} />
            Day 데이터 완전 삭제
          </button>
        </div>
      </div>

      {/* Day Picker Bottom Sheet */}
      {isDayPickerOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsDayPickerOpen(false)}
          ></div>
          <div className="bg-white rounded-t-3xl p-6 relative z-10 shadow-2xl animate-[slideUp_0.3s_ease-out] max-h-[60vh] flex flex-col">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0"></div>
            <h3 className="text-xl font-black text-slate-800 mb-4 shrink-0">조회할 Day 선택</h3>
            
            <div className="overflow-y-auto hide-scrollbar flex-1 -mx-2 px-2">
              <div className="space-y-2 pb-4">
                {availableDays.map(day => (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDay(day);
                      setIsDayPickerOpen(false);
                      showToast(`Day ${day} 데이터를 불러왔습니다.`);
                    }}
                    className={`w-full p-4 rounded-2xl text-left font-bold transition-colors flex justify-between items-center ${
                      selectedDay === day 
                        ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>Day {day} {day === currentAppDay && '(오늘)'}</span>
                    {selectedDay === day && <Check size={18} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Edit Modal (Wake/Bed/Weight) */}
      {isEditModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-5">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="bg-white rounded-3xl p-6 relative z-10 w-full max-w-sm shadow-2xl animate-[scaleIn_0.2s_ease-out]">
            <h3 className="text-lg font-black text-slate-800 mb-4">
              {editType === 'wakeTime' ? '기상 시간 강제 수정' : 
               editType === 'bedTime' ? '취침 시간 강제 수정' : 
               editType === 'weight' ? '체중/체지방 강제 수정' : '데이터 수정'}
            </h3>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 mb-2">
                {editType === 'wakeTime' || editType === 'bedTime' ? '시간 선택 (HH:mm)' : '값 입력'}
              </label>
              
              {(editType === 'wakeTime' || editType === 'bedTime') ? (
                <input 
                  type="time" 
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              ) : (
                <input 
                  type="number" 
                  step="0.1"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              )}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                취소
              </button>
              <button 
                onClick={handleSaveEdit}
                className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-700 transition-colors"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meal Time Edit Modal */}
      {isMealEditModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-5">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMealEditModalOpen(false)}></div>
          <div className="bg-white rounded-3xl p-6 relative z-10 w-full max-w-sm shadow-2xl animate-[scaleIn_0.2s_ease-out]">
            <h3 className="text-lg font-black text-slate-800 mb-4">식사 시간 수정</h3>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 mb-2">시간 선택</label>
              <input 
                type="time" 
                value={editingMealTime}
                onChange={(e) => setEditingMealTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsMealEditModalOpen(false)}
                className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                취소
              </button>
              <button 
                onClick={handleSaveMealEdit}
                className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-700 transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-5">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsDeleteConfirmOpen(false)}></div>
          <div className="bg-white rounded-3xl p-6 relative z-10 w-full max-w-sm shadow-2xl animate-[scaleIn_0.2s_ease-out]">
            <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2 text-center">정말 삭제하시겠습니까?</h3>
            <p className="text-sm text-slate-500 mb-6 text-center">
              Day {selectedDay}의 기상, 취침, 식사 기록이 <strong>모두 초기화</strong>되며 복구할 수 없습니다.
            </p>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                취소
              </button>
              <button 
                onClick={handleDeleteDay}
                className="flex-1 py-3.5 bg-rose-500 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-rose-600 transition-colors"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-xl z-[60] animate-[slideUp_0.2s_ease-out] whitespace-nowrap flex items-center gap-2">
          <Check size={16} className="text-emerald-400" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
