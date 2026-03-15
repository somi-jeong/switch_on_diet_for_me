import React from 'react';
import { Home, CalendarDays, List, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 pb-6 pt-3 z-40 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center">
        <NavButton 
          icon={<Home size={20} />} 
          label="오늘" 
          isActive={activeTab === 'home'} 
          onClick={() => onTabChange('home')} 
        />
        <NavButton 
          icon={<CalendarDays size={20} />} 
          label="캘린더" 
          isActive={activeTab === 'calendar'} 
          onClick={() => onTabChange('calendar')} 
        />
        <NavButton 
          icon={<List size={20} />} 
          label="식단" 
          isActive={activeTab === 'diet'} 
          onClick={() => onTabChange('diet')} 
        />
        <NavButton 
          icon={<User size={20} />} 
          label="마이" 
          isActive={activeTab === 'my'} 
          onClick={() => onTabChange('my')} 
        />
      </div>
    </div>
  );
}

function NavButton({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 w-16 transition-colors ${isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}>
      <div className={`w-12 h-8 flex items-center justify-center rounded-full transition-colors ${isActive ? 'bg-[#13ec92]/20 text-emerald-800' : ''}`}>
        {icon}
      </div>
      <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
  );
}
