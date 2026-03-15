/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import HomeScreen from './features/home/HomeScreen';
import CalendarScreen from './features/calendar/CalendarScreen';
import DietScreen from './features/diet/DietScreen';
import MyScreen from './features/my/MyScreen';
import RecordMealScreen from './features/diet/RecordMealScreen';
import ChatScreen from './features/chat/ChatScreen';
import HistoryScreen from './features/history/HistoryScreen';
import DietHistoryScreen from './features/diet/DietHistoryScreen';
import BottomNav from './components/layout/BottomNav';

import SetupScreen from './features/setup/SetupScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeScreen, setActiveScreen] = useState('main'); // 'main', 'record', 'chat', 'history', 'diet-history', 'setup'

  const navigateTo = (screen: string) => setActiveScreen(screen);
  const goBack = () => setActiveScreen('main');

  const handleSetupComplete = (startDate: string) => {
    // Save startDate to state/storage here
    setActiveScreen('main');
    setActiveTab('home');
  };

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-[#f6f8f7] relative shadow-2xl overflow-hidden font-sans text-slate-800 flex flex-col">
      {activeScreen === 'setup' && <SetupScreen onComplete={handleSetupComplete} />}
      {activeScreen === 'record' && <RecordMealScreen onBack={goBack} />}
      {activeScreen === 'chat' && <ChatScreen onBack={goBack} />}
      {activeScreen === 'history' && <HistoryScreen onBack={goBack} />}
      {activeScreen === 'diet-history' && <DietHistoryScreen onBack={goBack} />}

      {activeScreen === 'main' && (
        <>
          {/* Main Content Area */}
          <div className="flex-1 relative overflow-hidden">
            {activeTab === 'home' && <HomeScreen onNavigate={navigateTo} />}
            {activeTab === 'calendar' && <CalendarScreen onNavigate={navigateTo} />}
            {activeTab === 'diet' && <DietScreen />}
            {activeTab === 'my' && <MyScreen onNavigate={navigateTo} />}
          </div>

          {/* Bottom Navigation */}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
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
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
}
