/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Home, CalendarDays, List, User } from 'lucide-react';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import DietScreen from './screens/DietScreen';
import MyScreen from './screens/MyScreen';
import RecordMealScreen from './screens/RecordMealScreen';
import ChatScreen from './screens/ChatScreen';
import HistoryScreen from './screens/HistoryScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeScreen, setActiveScreen] = useState('main'); // 'main', 'record', 'chat', 'history'

  const navigateTo = (screen: string) => setActiveScreen(screen);
  const goBack = () => setActiveScreen('main');

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-[#f6f8f7] relative shadow-2xl overflow-hidden font-sans text-slate-800 flex flex-col">
      {activeScreen === 'record' && <RecordMealScreen onBack={goBack} />}
      {activeScreen === 'chat' && <ChatScreen onBack={goBack} />}
      {activeScreen === 'history' && <HistoryScreen onBack={goBack} />}

      {activeScreen === 'main' && (
        <>
          {/* Main Content Area */}
          <div className="flex-1 relative overflow-hidden">
            {activeTab === 'home' && <HomeScreen onNavigate={navigateTo} />}
            {activeTab === 'calendar' && <CalendarScreen />}
            {activeTab === 'diet' && <DietScreen />}
            {activeTab === 'my' && <MyScreen onNavigate={navigateTo} />}
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 pb-6 pt-3 z-40 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <div className="flex justify-around items-center">
              <NavButton 
                icon={<Home size={20} />} 
                label="오늘" 
                isActive={activeTab === 'home'} 
                onClick={() => setActiveTab('home')} 
              />
              <NavButton 
                icon={<CalendarDays size={20} />} 
                label="캘린더" 
                isActive={activeTab === 'calendar'} 
                onClick={() => setActiveTab('calendar')} 
              />
              <NavButton 
                icon={<List size={20} />} 
                label="식단" 
                isActive={activeTab === 'diet'} 
                onClick={() => setActiveTab('diet')} 
              />
              <NavButton 
                icon={<User size={20} />} 
                label="마이" 
                isActive={activeTab === 'my'} 
                onClick={() => setActiveTab('my')} 
              />
            </div>
          </div>
        </>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}} />
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
