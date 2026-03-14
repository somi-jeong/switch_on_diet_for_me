import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Send } from 'lucide-react';

export default function ChatScreen({ onBack }) {
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-full bg-white z-50">
      <header className="px-5 py-4 flex justify-between items-center border-b border-slate-100 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-full">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#13ec92]/20 rounded-full flex items-center justify-center">
              <Sparkles className="text-emerald-600" size={16} />
            </div>
            <h1 className="text-lg font-bold text-slate-800">AI 코치</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 bg-[#f6f8f7] flex flex-col gap-4">
        <div className="text-center text-xs text-slate-400 my-2">오늘</div>
        
        {/* AI Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#13ec92] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
            <Sparkles size={16} className="text-slate-900" />
          </div>
          <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm leading-relaxed max-w-[85%] text-slate-700">
            스위치온 다이어트 3일차네요! 단백질 쉐이크만 드시느라 힘드시죠? 🥺<br/><br/>
            두통이 있거나 너무 무기력하다면 따뜻한 허브티나 플레인 요거트, 연두부를 조금 드시는 것도 도움이 됩니다. 궁금한 점이 있다면 언제든 물어보세요!
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-3 flex-row-reverse mt-2">
          <div className="bg-slate-900 text-white p-4 rounded-2xl rounded-tr-none shadow-sm text-sm leading-relaxed max-w-[85%]">
            점심 약속이 생겼는데 어떡하죠?
          </div>
        </div>

        {/* AI Message */}
        <div className="flex gap-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-[#13ec92] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
            <Sparkles size={16} className="text-slate-900" />
          </div>
          <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm leading-relaxed max-w-[85%] text-slate-700">
            1주차에는 외부 식사가 매우 까다로워요. 😭<br/><br/>
            가급적 약속을 미루시는 것을 추천하지만, 피할 수 없다면 <strong>연두부, 샐러드(드레싱 없이), 생선회</strong> 정도만 드시는 것이 좋습니다. 탄수화물과 당분은 절대 피해주세요!
          </div>
        </div>

        {/* User Suggestion Chips */}
        <div className="flex flex-wrap gap-2 ml-11 mt-2">
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-[#13ec92] hover:text-[#13ec92] transition-colors shadow-sm">
            샐러드 드레싱은 아예 안되나요?
          </button>
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-[#13ec92] hover:text-[#13ec92] transition-colors shadow-sm">
            너무 어지러워요
          </button>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-100 flex gap-2 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..." 
          className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[#13ec92] focus:bg-white transition-colors" 
        />
        <button className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${input.length > 0 ? 'bg-slate-900 text-[#13ec92]' : 'bg-[#13ec92] text-slate-900'}`}>
          <Send size={18} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
