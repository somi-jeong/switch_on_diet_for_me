import React from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';

export default function DietScreen() {
  const weeks = [
    {
      week: 1,
      title: '장 비우기 (위장관 휴식)',
      isCurrent: true,
      periods: [
        {
          days: '1~3일',
          desc: '탄수화물을 제한하고 단백질 쉐이크로 섭취하며 위장관에 휴식을 주는 기간입니다.',
          diet: '아침/점심/간식/저녁 모두 단백질 쉐이크 1컵',
          allowed: '플레인 요거트, 두부, 양배추, 무, 당근, 오이, 브로콜리, 파프리카 등 채소류'
        },
        {
          days: '4~7일',
          desc: '지방 대사 활성화 시작',
          diet: '점심에 한해 현미잡곡밥 2/3공기 또는 흰쌀밥 1/2공기 + 채소/단백질 반찬 허용',
          allowed: '1~3일차 허용 식품 + 점심 일반식'
        }
      ]
    },
    {
      week: 2,
      title: '가속기 (렙틴 저항성 개선)',
      isCurrent: false,
      periods: [
        {
          days: '8~14일',
          desc: '인슐린 저항성을 개선하고 지방 대사를 가속화합니다.',
          diet: '아침/간식/저녁: 단백질 쉐이크\n점심: 현미잡곡밥 2/3공기 위주의 일반식',
          allowed: '블랙커피(오전 1잔), 견과류 1줌 추가 허용'
        }
      ]
    },
    {
      week: 3,
      title: '진행기 (지방 대사 최적화)',
      isCurrent: false,
      periods: [
        {
          days: '15~21일',
          desc: '저녁에도 탄수화물을 제한적으로 허용하며 일상으로의 복귀를 준비합니다.',
          diet: '아침/간식: 단백질 쉐이크\n점심: 일반식\n저녁: 탄수화물 없는 단백질 위주 식사 (고기, 생선 등)',
          allowed: '베리류 과일 소량, 고구마 1/2개 추가 허용'
        }
      ]
    },
    {
      week: 4,
      title: '안정기 (유지기)',
      isCurrent: false,
      periods: [
        {
          days: '22~28일',
          desc: '개선된 대사를 유지하며 요요를 방지합니다.',
          diet: '아침: 단백질 쉐이크\n점심/저녁: 일반식 (단, 저녁은 밥 1/2공기로 제한)\n간식: 선택사항',
          allowed: '주 1회 1끼에 한해 원하는 음식(치팅밀) 허용'
        }
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto hide-scrollbar px-5 py-8 pb-32">
      <h2 className="text-2xl font-black mb-2">주차별 식단 가이드</h2>
      <p className="text-sm text-slate-500 mb-6">스위치온 다이어트 4주 플랜</p>

      <div className="space-y-4">
        {weeks.map((weekData) => (
          <div 
            key={weekData.week} 
            className={`rounded-3xl p-5 border transition-all ${
              weekData.isCurrent 
                ? 'bg-[#13ec92]/10 border-[#13ec92]/30 shadow-sm' 
                : 'bg-white border-slate-100 shadow-sm opacity-80'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-bold ${weekData.isCurrent ? 'text-emerald-900' : 'text-slate-800'}`}>
                {weekData.week}주차 <span className="text-sm font-medium opacity-80 ml-1">{weekData.title}</span>
              </h3>
              {weekData.isCurrent && (
                <span className="text-xs font-bold bg-[#13ec92] text-slate-900 px-2 py-1 rounded-full">현재 단계</span>
              )}
            </div>

            <div className="space-y-3">
              {weekData.periods.map((period, idx) => (
                <div key={idx} className={`rounded-xl p-4 ${weekData.isCurrent ? 'bg-white/60' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-black px-2 py-0.5 rounded-md ${weekData.isCurrent ? 'bg-emerald-800 text-white' : 'bg-slate-700 text-white'}`}>
                      {period.days}
                    </span>
                    <span className="text-xs font-bold text-slate-600">{period.desc}</span>
                  </div>
                  
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 mb-1">식단표</p>
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                        {period.diet}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 mb-1">허용 식품</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {period.allowed}
                      </p>
                    </div>
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
