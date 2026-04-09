import React, { useState } from 'react';
import './App.css';

// --- КОМПОНЕНТЫ РАЗДЕЛОВ (ВКЛАДОК) ---

// 1. ГЛАВНАЯ (Лента Памяти / Новости платформы)
const FeedComponent = () => (
  <div className="space-y-5 animate-fadeIn">
    <div className="flex items-center justify-between mt-4">
      <h2 className="text-2xl font-bold text-white">Лента Хранителей</h2>
      <span className="text-xl">🔔</span>
    </div>
    
    {/* Карточка статистики (Виральный элемент) */}
    <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-6 shadow-xl border border-blue-500/20">
      <div className="text-[10px] text-blue-300 uppercase tracking-widest font-medium mb-1">СЕГОДНЯ ОТКРЫТО</div>
      <div className="text-4xl font-extrabold text-white">3,241 <span className="text-lg font-normal text-blue-100">капсула</span></div>
      <p className="text-xs text-blue-200 mt-1 italic">из прошлого (1996-2021 гг.)</p>
    </div>

    {/* Пример поста в ленте */}
    <div className="bg-[#161616] rounded-2xl p-4 border border-white/5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">⏳</div>
        <div>
          <div className="text-sm font-semibold text-white">Капсула от: Алексей Н. (Одесса)</div>
          <div className="text-[10px] text-gray-500">Запечатана: 08.04.2014 | Открыта: Сегодня</div>
        </div>
      </div>
      <p className="text-xs text-gray-300 leading-relaxed bg-black/30 p-3 rounded-lg">"Привет из 2014-го! Надеюсь, вы там уже летаете на машинах. Оставляю это видео для внуков..."</p>
      <button className="text-xs text-blue-400 font-medium">Смотреть видео за 0.99 TON 💎</button>
    </div>
  </div>
);

// 2. КАПСУЛА (Твоя форма с денежным подарком)
const CapsuleComponent = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="w-full flex flex-col items-center mt-6">
      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3">
        <span className="text-4xl text-white">🔒</span>
      </div>
      <h1 className="text-xl font-bold text-white uppercase tracking-tight">Новая капсула времени</h1>
    </div>

    <div className="bg-[#161616] rounded-3xl p-6 shadow-2xl border border-white/5 space-y-4">
      <div>
        <label className="text-[10px] text-white/30 uppercase ml-2 mb-1 block">Получатель</label>
        <input type="text" placeholder="Email или @Telegram" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500" />
      </div>

      <div>
        <label className="text-[10px] text-white/30 uppercase ml-2 mb-1 block">Дата вскрытия (через 1-50 лет)</label>
        <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500" />
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
        <label className="text-[10px] text-yellow-500 uppercase ml-2 mb-1 block font-bold">Денежный подарок (Цифровой Траст)</label>
        <div className="flex items-center gap-3">
          <span className="text-2xl">💰</span>
          <input type="text" placeholder="Сумма (TON/USDT) или ссылка на банк" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-yellow-500/30" />
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-xl text-base shadow-lg active:scale-95 transition-all mt-3">ЗАПЕЧАТАТЬ МОМЕНТ</button>
      <p className="text-[9px] text-gray-600 text-center italicLEADING-TIGHT leading-tight mt-2">* Мы свяжемся с Хранителем, если получатель не выйдет на связь.</p>
    </div>
  </div>
);

// 3. НАСЛЕДИЕ (Задания / Квесты семьи)
const HeritageComponent = () => (
  <div className="space-y-5 animate-fadeIn">
    <div className="mt-4">
      <h2 className="text-2xl font-bold text-white">Квесты Наследия</h2>
      <p className="text-xs text-gray-400">Собирай историю семьи, получай Очки Хранителя (XP)</p>
    </div>

    {[
      { icon: '🎤', title: 'Интервью с бабушкой', xp: '+250 XP', desc: 'Запиши аудио/видео с воспоминаниями о её детстве.' },
      { icon: '📸', title: 'Оцифровка архива', xp: '+100 XP', desc: 'Загрузи 5 старых семейных фотографий (до 1990 г.).' },
      { icon: '🌳', title: 'Добавить ветвь древа', xp: '+50 XP', desc: 'Пропиши биографию прадедушки в Генеалогическом Древе.' },
    ].map((quest, i) => (
      <div key={i} className="bg-[#161616] rounded-2xl p-4 border border-white/5 flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer">
        <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center text-3xl shadow-inner">{quest.icon}</div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div className="text-sm font-semibold text-white">{quest.title}</div>
            <div className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">{quest.xp}</div>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">{quest.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

// --- ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ ---
function App() {
  const [activeTab, setActiveTab] = useState('capsule'); // Капсула по умолчанию (твоя фишка)

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
    { id: 'heritage', icon: '🌳', label: 'Наследие' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center p-4 pb-28 font-sans">
      
      {/* КОНТЕНТ (Меняется здесь) */}
      <div className="w-full max-w-md flex-grow">
        {renderContent()}
      </div>

      {/* НАВИГАЦИЯ СНИЗУ (МЕНЮ) */}
      <div className="fixed bottom-6 w-full max-w-xs bg-[#161616]/80 backdrop-blur-lg border border-white/10 rounded-full p-2 flex justify-between shadow-2xl">
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1.5 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`text-[10px] font-medium tracking-wide ${activeTab === item.id ? 'block' : 'hidden'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
