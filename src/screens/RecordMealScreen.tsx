import React, { useState } from 'react';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';

export default function RecordMealScreen({ onBack }) {
  const [text, setText] = useState('');

  return (
    <div className="flex flex-col h-full bg-white z-50">
      <header className="px-5 py-4 flex justify-between items-center border-b border-slate-100">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800">오후 간식 기록</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="bg-[#13ec92]/10 rounded-2xl p-4 mb-6 flex gap-3 items-start border border-[#13ec92]/20">
          <Sparkles className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-bold text-emerald-800 mb-1">AI 코치의 가이드</p>
            <p className="text-xs text-emerald-700 leading-relaxed">
              지금은 1주차 위장관 휴식 기간이에요. 단백질 쉐이크를 드셨나요? 드신 음식의 이름을 적어주시면 제가 분석해드릴게요!
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">무엇을 드셨나요?</label>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="예: 단백질 쉐이크 1컵, 아몬드 5알"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#13ec92] focus:bg-white transition-colors min-h-[120px] resize-none"
          />
        </div>
      </div>

      <div className="p-5 border-t border-slate-100 bg-white">
        <button 
          onClick={onBack}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 ${text.length > 0 ? 'bg-[#13ec92] text-slate-900 hover:bg-[#10d482]' : 'bg-slate-100 text-slate-400'}`}
        >
          <Sparkles size={20} />
          AI 분석 및 기록하기
        </button>
      </div>
    </div>
  );
}
