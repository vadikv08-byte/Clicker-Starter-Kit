import React, { useState, useEffect } from 'react';
import './App.css';

// Инициализируем объект Telegram
const tg = window.Telegram?.WebApp;

// --- КОМПОНЕНТ 1: ЛЕНТА ---
const FeedComponent = () => (
  <div className="animate-fadeIn space-y-5 px-4 pt-4">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">Лента Хранителей</h2>
      <span className="text-xl">🔔</span>
    </div>
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 shadow-xl">
      <div className="text-[10px] text-white/60 uppercase tracking-widest font-bold mb-1">СЕГОДНЯ ОТКРЫТО</div>
      <div className="text-4xl font-black text-white">3,241 <span className="text-lg font-normal opacity-70">капсула</span></div>
    </div>
    <div className="bg-[#1c1c1e] rounded-2xl p-4 border border-white/5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">⏳</div>
        <div>
          <div className="text-sm font-bold text-white">Алексей Н. (Одесса)</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase">Открыта сегодня</div>
        </div>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed italic">"Привет из 2014-го! Оставляю это видео для внуков. Надеюсь, вы там уже летаете на машинах."</p>
    </div>
  </div>
);

// --- КОМПОНЕНТ 2: СОЗДАТЬ (КАПСУЛА) ---
const CapsuleComponent = () => {
  const user = tg?.initDataUnsafe?.user; // Получаем данные пользователя

  return (
    <div className="animate-fadeIn space-y-6 px-4 pt-4 pb-20">
      {/* КАРТОЧКА ПРОФИЛЯ */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-3xl p-4 flex items-center gap-4 shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center overflow-hidden border-2 border-white/10">
          {user?.photo_url ? (
            <img src={user.photo_url} alt="Ava" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl text-white">👤</span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">
              {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : "Пользователь"}
            </span>
            <span className="bg-blue-600 text-[8px] px-1.5 py-0.5 rounded font-black uppercase text-white shadow-lg shadow-blue-600/20">Хранитель</span>
          </div>
          <div className="text-[10px] text-gray-500 font-bold mt-0.5 uppercase tracking-tighter">ID: {user?.id || "00000000"}</div>
        </div>
        <div className="ml-auto bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-lg">
           <span className="text-[9px] text-green-500 font-black uppercase tracking-widest">Online</span>
        </div>
      </div>

      <h1 className="text-2xl font-black text-center text-white uppercase tracking-tighter">Новая капсула</h1>

      <div className="bg-[#1c1c1e] rounded-[32px] p-6 shadow-2xl border border-white/5 space-y-4">
        <div>
          <label className="text-[10px] text-white/30 uppercase font-black ml-1 mb-1 block">Получатель</label>
          <input type="text" placeholder="@Telegram или Email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="text-[10px] text-white/30 uppercase font-black ml-1 mb-1 block">Дата открытия</label>
          <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-blue-500 transition-all" />
        </div>
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-[24px] p-4">
          <label className="text-[10px] text-yellow-600 uppercase font-black ml-1 mb-1 block">Денежный вклад</label>
          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <input type="text" placeholder="Сумма (USDT/TON)" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-yellow-700/30 font-bold" />
          </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl text-base shadow-lg shadow-blue-500/30 active:scale-95 transition-all mt-2">
          ЗАПЕЧАТАТЬ ПАМЯТЬ 🔒
        </button>
      </div>
    </div>
  );
};

// --- КОМПОНЕНТ 3: НАСЛЕДИЕ ---
const HeritageComponent = () => (
  <div className="animate-fadeIn space-y-5 px-4 pt-4">
    <div>
      <h2 className="text-2xl font-bold text-white">Квесты Наследия</h2>
      <p className="text-xs text-gray-400 font-medium font-sans">Собирай историю семьи и получай очки XP</p>
    </div>
    {[
      { icon: '🎤', title: 'Интервью с близкими', xp: '+250 XP', desc: 'Запиши историю старшего поколения' },
      { icon: '📸', title: 'Оцифровка архива', xp: '+100 XP', desc: 'Загрузи 5 старых фото семьи' },
      { icon: '🌳', title: 'Семейное древо', xp: '+50 XP', desc: 'Добавь информацию о прадедах' }
    ].map((q, i) => (
      <div key={i} className="bg-[#1c1c1e] rounded-3xl p-4 border border-white/5 flex items-center justify-between active:scale-[0.98] transition-all">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center text-3xl shadow-inner">{q.icon}</div>
          <div>
            <div className="text-sm font-bold text-white font-sans">{q.title}</div>
            <div className="text-[10px] text-gray-500 leading-tight">{q.desc}</div>
          </div>
        </div>
        <div className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">{q.xp}</div>
      </div>
    ))}
  </div>
);

// --- ОСНОВНОЕ ПРИЛОЖЕНИЕ ---
export default function App() {
  const [activeTab, setActiveTab] = useState('capsule');

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand(); // Приложение на весь экран
    }
  }, []);

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
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <div className="flex-grow overflow-y-auto pb-32">
        {renderContent()}
      </div>

      {/* ФИКСИРОВАННОЕ МЕНЮ СНИЗУ */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-2 flex justify-between shadow-2xl z-50">
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => {
              if (tg) tg.HapticFeedback.impactOccurred('light'); // Вибрация
              setActiveTab(item.id);
            }}
            className={`flex items-center gap-2 px-5 py-4 rounded-[30px] transition-all duration-300 ${
              activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-white/40'
            }`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            {activeTab === item.id && <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
