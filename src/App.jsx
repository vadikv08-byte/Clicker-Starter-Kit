import React, { useState, useEffect } from 'react';
import './App.css';

const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState('create'); // Основная вкладка
  const [showIntro, setShowIntro] = useState(true);   // Показ приветствия
  const user = tg?.initDataUnsafe?.user;

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  // Функция для кнопки на Welcome-экране
  const startApp = () => {
    if (tg) tg.HapticFeedback.impactOccurred('medium');
    setShowIntro(false);
  };

  // Функция "Запечатать"
  const handleSeal = () => {
    if (tg) {
      tg.HapticFeedback.notificationOccurred('success');
      tg.showAlert("Ваша капсула времени успешно запечатана и сохранена в архиве!");
    }
  };

  // --- ЭКРАН ПРИВЕТСТВИЯ (INTRO) ---
  if (showIntro) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/40">
          <span className="text-5xl">🔒</span>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Семейный Архив</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Создавайте цифровые капсулы времени, сохраняйте историю своей семьи и передавайте ценности через поколения.
        </p>
        <div className="space-y-4 w-full max-w-xs">
          <div className="flex items-center gap-3 text-left bg-[#1c1c1e] p-4 rounded-2xl border border-white/5">
            <span>🚀</span>
            <div className="text-xs text-gray-300">Создавайте послания, которые откроются через 10, 20 или 50 лет.</div>
          </div>
          <div className="flex items-center gap-3 text-left bg-[#1c1c1e] p-4 rounded-2xl border border-white/5">
            <span>💰</span>
            <div className="text-xs text-gray-300">Прикрепляйте цифровые активы и подарки своим потомкам.</div>
          </div>
        </div>
        <button 
          onClick={startApp}
          className="w-full max-w-xs bg-blue-600 text-white font-black py-5 rounded-2xl mt-12 shadow-lg active:scale-95 transition-all"
        >
          НАЧАТЬ ПУТЕШЕСТВИЕ
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col overflow-hidden">
      
      {/* ОСНОВНОЙ КОНТЕНТ */}
      <div className="flex-grow overflow-y-auto pb-32">
        
        {/* ВКЛАДКА: СОЗДАТЬ (ГЛАВНАЯ) */}
        {activeTab === 'create' && (
          <div className="p-4 space-y-6 animate-fadeIn">
            <div className="bg-[#1c1c1e] border border-white/10 rounded-3xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center border-2 border-white/10">
                <span className="text-xl font-bold">{user?.first_name?.charAt(0) || 'V'}</span>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{user?.first_name || "Хранитель"}</span>
                  <span className="bg-blue-600 text-[8px] px-1.5 py-0.5 rounded font-black uppercase">Online</span>
                </div>
                <div className="text-[10px] text-gray-500 font-bold">ID: {user?.id || "7222570439"}</div>
              </div>
            </div>

            <h2 className="text-2xl font-black text-center uppercase">Новая капсула</h2>

            <div className="bg-[#1c1c1e] rounded-[32px] p-6 border border-white/5 space-y-4">
              <div className="text-left">
                <label className="text-[10px] text-white/30 uppercase font-black ml-1 mb-1 block">Получатель</label>
                <input type="text" placeholder="Email или @Telegram" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-blue-500" />
              </div>
              <div className="text-left">
                <label className="text-[10px] text-white/30 uppercase font-black ml-1 mb-1 block">Дата вскрытия (через 1-50 лет)</label>
                <input type="text" placeholder="9 апр. 2026 г." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none" />
              </div>
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-[24px] p-4 text-left">
                <label className="text-[10px] text-yellow-600 uppercase font-black ml-1 mb-1 block">Денежный подарок (Цифровой траст)</label>
                <input type="text" placeholder="Сумма или ссылка на баланс" className="w-full bg-transparent text-sm text-white outline-none font-bold placeholder:text-yellow-700/30" />
              </div>
              <button onClick={handleSeal} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl text-base shadow-lg active:scale-95 transition-all">
                ЗАПЕЧАТАТЬ МОМЕНТ 🔒
              </button>
            </div>
          </div>
        )}

        {/* ВКЛАДКА: НАСЛЕДИЕ (КВЕСТЫ) */}
        {activeTab === 'heritage' && (
          <div className="p-4 space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-center">Квесты Наследия</h2>
            <p className="text-xs text-gray-500 text-center px-4">Выполняйте задания, чтобы оживить историю вашей семьи</p>
            
            <div className="space-y-4">
              {[
                { icon: '🎤', title: 'Интервью с бабушкой', xp: '+250 XP', desc: 'Запишите аудио-воспоминания о её детстве.' },
                { icon: '📸', title: 'Оцифровка архива', xp: '+100 XP', desc: 'Загрузите 5 старых семейных фотографий.' },
                { icon: '🌳', title: 'Ветвь древа', xp: '+50 XP', desc: 'Пропишите биографию прадедушки в древе.' }
              ].map((quest, i) => (
                <div key={i} className="bg-[#1c1c1e] rounded-[28px] p-5 border border-white/5 flex items-center gap-4 active:scale-[0.98] transition-all">
                  <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-3xl shadow-inner">{quest.icon}</div>
                  <div className="flex-grow text-left">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-white">{quest.title}</h4>
                      <span className="text-[9px] font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{quest.xp}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 leading-tight">{quest.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ВКЛАДКА: ЛЕНТА (АРХИВ) */}
        {activeTab === 'feed' && (
          <div className="p-4 space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-left">Лента Хранителей</h2>
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 shadow-xl text-left">
              <div className="text-[10px] text-white/50 uppercase font-black mb-1">ВСЕГО СОХРАНЕНО</div>
              <div className="text-4xl font-black">12,854 <span className="text-sm font-normal opacity-60 italic">капсул</span></div>
            </div>
            <div className="bg-[#1c1c1e] rounded-3xl p-4 border border-white/5 text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">⏳</div>
                <div className="text-xs font-bold">Капсула от: Александр П.</div>
              </div>
              <p className="text-xs text-gray-400 italic">"Это послание для моих детей. Откройте его, когда станете взрослыми..."</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Откроется через 14 лет</span>
                <button className="text-[9px] text-blue-400 font-black uppercase">Подробнее</button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* НИЖНЯЯ НАВИГАЦИЯ */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-2 flex justify-between shadow-2xl z-50">
        {[
          { id: 'feed', icon: '🌍', label: 'Лента' },
          { id: 'create', icon: '🔒', label: 'Создать' },
          { id: 'heritage', icon: '🌳', label: 'Наследие' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => {
              if (tg) tg.HapticFeedback.impactOccurred('light');
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
