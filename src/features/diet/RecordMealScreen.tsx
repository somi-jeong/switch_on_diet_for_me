import React, { useState } from 'react';
import { X, Camera, Sparkles, ChevronLeft, Trash2 } from 'lucide-react';

export default function RecordMealScreen({ onBack }) {
  const [text, setText] = useState('');
  const [time, setTime] = useState('15:30');

  return (
    <div className="absolute inset-0 bg-[#f6f8f7] z-50 flex flex-col h-full">
      <header className="px-5 py-4 flex items-center justify-between bg-white sticky top-0 z-10 border-b border-slate-100">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 text-slate-700">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-slate-800">식단 기록하기</h2>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-5">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#13ec92]/20 flex items-center justify-center text-emerald-600">
              <Sparkles size={16} />
            </div>
            <span className="font-bold text-slate-700">AI 코치</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            오후 간식 시간이네요! 어떤 쉐이크를 드셨나요?<br/>
            사진을 찍거나 텍스트로 자유롭게 남겨주세요.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">섭취 시간</label>
          <input 
            type="time" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-lg font-bold text-slate-700 focus:outline-none focus:border-[#13ec92] transition-colors"
          />
        </div>

        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 mb-6">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="예: 아몬드 브리즈에 초코맛 쉐이크 타먹었어요"
            className="w-full h-32 resize-none p-4 text-slate-700 placeholder:text-slate-400 focus:outline-none text-sm"
          ></textarea>
          <div className="flex justify-end items-center p-2 border-t border-slate-50">
            <span className="text-xs font-medium text-slate-400 mr-2">{text.length} / 100</span>
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-slate-100 bg-white space-y-3 pb-8">
        <button 
          onClick={onBack}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 ${
            text.length > 0 ? 'bg-[#13ec92] text-slate-900 hover:bg-[#10d482]' : 'bg-slate-100 text-slate-400'
          }`}
        >
          <Sparkles size={20} />
          AI 분석 및 기록하기
        </button>
        <button 
          onClick={onBack}
          className="w-full py-3 rounded-2xl font-bold text-sm text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <Trash2 size={16} />
          이 기록 삭제하기
        </button>
      </div>
    </div>
  );
}
