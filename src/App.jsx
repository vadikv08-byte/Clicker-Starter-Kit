import React, { useState, useEffect } from 'react';
import './App.css';

// Инициализация Telegram WebApp
const tg = window.Telegram?.WebApp;

// --- 1. ВКЛАДКА: ЛЕНТА ---
const FeedComponent = () => (
  <div className="space-y-5 animate-fadeIn">
    <div className="flex items-center justify-between mt-4">
      <h2 className="text-2xl font-bold text-white">Лента Хранителей</h2>
      <span className="text-xl">🔔</span>
    </div>
    <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-6 shadow-xl border border-blue-500/20">
      <div className="text-[10px] text-blue-300 uppercase tracking-widest font-medium mb-1">СЕГОДНЯ ОТКРЫТО</div>
      <div className="text-4xl font-extrabold text-white">3,241 <span className="text-lg font-normal text-blue-100">капсула</span></div>
    </div>
    <div className="bg-[#161616] rounded-2xl p-4 border border-white/5 space-y-3 font-sans">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">⏳</div>
        <div>
          <div className="text-sm font-semibold text-white">Капсула от: Алексей Н.</div>
          <div className="text-[10px] text-gray-500">Открыта: Сегодня</div>
        </div>
      </div>
      <p className="text-xs text-gray-300 leading-relaxed">"Привет из 2014-го! Оставляю это послание для своих детей..."</p>
    </div>
  </div>
);

// --- 2. ВКЛАДКА: СОЗДАТЬ (КАПСУЛА) ---
const CapsuleComponent = () => {
  const user = tg?.initDataUnsafe?.user;

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      {/* КАРТОЧКА ПРОФИЛЯ */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 mt-4 shadow-inner">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden border border-white/10">
          {user?.photo_url ? (
            <img src={user.photo_url} alt="Ava" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl text-white">👤</span>
          )}
        </div>
        <div>
          <div className="text-[10px] text-gray-500 uppercase font-bold">Статус: Хранитель</div>
          <div className="text-sm font-bold text-white">
            {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : "Пользователь"}
          </div>
        </div>
        <div className="ml-auto bg-green-500/20 text-green-500 text-[9px] px-2 py-1 rounded-md font-bold uppercase tracking-tighter">
          Online
        </div>
      </div>

      <div className="w-full flex flex-col items-center mt-2">
        <h1 className="text-xl font-bold text-white uppercase tracking-tight text-center">Новая капсула времени</h1>
      </div>

      <div className="bg-[#161616] rounded-3xl p-6 shadow-2xl border border-white/5 space-y-4">
        <div>
          <label className="text-[10px] text-white/30 uppercase ml-2 mb-1 block font-medium">Получатель</label>
          <input type="text" placeholder="Email или @Telegram" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500 transition-all" />
        </div>

        <div>
          <label className="text-[10px] text-white/30 uppercase ml-2 mb-1 block font-medium">Дата вскрытия</label>
          <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500 transition-all" />
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
          <label className="text-[10px] text-yellow-500 uppercase ml-2 mb-1 block font-bold">Денежный подарок</label>
          <div className="flex items-center gap-3">
            <span className="text-xl">💰</span>
            <input type="text" placeholder="Сумма или ссылка на банк" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-yellow-500/30" />
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-blue-500/20 active:scale-95 transition-all mt-2">
          ЗАПЕЧАТАТЬ ПАМЯТЬ 🔒
        </button>
      </div>
    </div>
  );
};

// --- 3. ВКЛАДКА: НАСЛЕДИЕ ---
const HeritageComponent = () => (
  <div className="space-y-5 animate-fadeIn">
    <div className="mt-4">
      <h2 className="text-2xl font-bold text-white font-sans">Квесты Наследия</h2>
      <p className="text-xs text-gray-400">Собирай историю семьи и получай очки XP</p>
    </div>
    {[
      { icon: '🎤', title: 'Интервью с близкими', xp: '+250 XP' },
      { icon: '📸', title: 'Оцифровка архива', xp: '+100 XP' },
      { icon: '🌳', title: 'Семейное древо', xp: '+50 XP' }
    ].map((quest, i) => (
      <div key={i} className="bg-[#161616] rounded-2xl p-4 border border-white/5 flex items-center justify-between active:scale-[0.98] transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-2xl">{quest.icon}</div>
          <div className="text-sm font-semibold text-white">{quest.title}</div>
        </div>
        <div className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">{quest.xp}</div>
      </div>
    ))}
  </div>
);

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
export default function App() {
  const [activeTab, setActiveTab] = useState('capsule');

  const renderContent = () => {
    switch (activeTab) {
      case 'feed': return <FeedComponent />;
      case 'capsule': return <CapsuleComponent />;
      case 'heritage': return <HeritageComponent />;
      default: return <CapsuleComponent />;
    }
  };

  const navItems = [
    { id: 'feed', icon: '🌍', label: 'Лента' },
    { id: 'capsule', icon: '🔒', label: 'Создать' },
    { id: 'heritage', icon: '🌳', label: 'Наследие' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center p-4 pb-32">
      <div className="w-full max-w-md flex-grow">
        {renderContent()}
      </div>

      {/* НИЖНЕЕ МЕНЮ */}
      <div className="fixed bottom-8 w-full max-w-[340px] bg-[#161616]/90 backdrop-blur-xl border border-white/10 rounded-[35px] p-2 flex justify-between shadow-2xl z-50">
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === item.id ? 'bg-blue-600 text-white' : 'text-white/40'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {activeTab === item.id && <span className="text-[11px] font-bold">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
