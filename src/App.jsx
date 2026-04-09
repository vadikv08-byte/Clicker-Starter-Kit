import React, { useState, useEffect } from 'react';
import './App.css';

const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState('capsule');
  const user = tg?.initDataUnsafe?.user;

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  // ФУНКЦИЯ ДЛЯ КНОПКИ (ГЛАВНАЯ)
  const onSealClick = (e) => {
    e.preventDefault(); // Предотвращаем любые баги браузера
    
    if (tg) {
      tg.HapticFeedback.notificationOccurred('success'); // Вибрация
      tg.showAlert("Ваша капсула времени успешно запечатана и сохранена в архиве!");
    } else {
      alert("Капсула запечатана (Браузерный режим)");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col overflow-hidden">
      
      {/* КОНТЕНТ */}
      <div className="flex-grow overflow-y-auto pb-32">
        
        {/* ВКЛАДКА СОЗДАТЬ */}
        {activeTab === 'capsule' && (
          <div className="p-4 space-y-6 animate-fadeIn">
            
            {/* ПРОФИЛЬ */}
            <div className="bg-[#1c1c1e] border border-white/10 rounded-3xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white/10 overflow-hidden">
                {user?.photo_url ? <img src={user.photo_url} className="w-full h-full object-cover" /> : <span className="text-xl font-bold">V</span>}
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{user?.first_name || "Пользователь"}</span>
                  <span className="bg-blue-600 text-[8px] px-1.5 py-0.5 rounded font-black uppercase">Хранитель</span>
                </div>
                <div className="text-[10px] text-gray-500 font-bold">ID: {user?.id || "7222570439"}</div>
              </div>
            </div>

            <h1 className="text-2xl font-black text-center uppercase tracking-tighter">Новая капсула</h1>

            {/* ФОРМА */}
            <div className="bg-[#1c1c1e] rounded-[32px] p-6 border border-white/5 space-y-4">
              <div className="text-left">
                <label className="text-[10px] text-white/30 uppercase font-black ml-1 mb-1 block">Получатель</label>
                <input type="text" placeholder="@MrV77777" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-blue-500" />
              </div>
              
              <div className="text-left">
                <label className="text-[10px] text-white/30 uppercase font-black ml-1 mb-1 block">Дата открытия</label>
                <input type="text" placeholder="9 апр. 2026 г." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none" />
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-[24px] p-4 text-left">
                <label className="text-[10px] text-yellow-600 uppercase font-black ml-1 mb-1 block">Денежный вклад</label>
                <input type="text" placeholder="Сумма (USDT/TON)" className="w-full bg-transparent text-sm text-white outline-none font-bold placeholder:text-yellow-700/30" />
              </div>

              {/* КНОПКА С ПРЯМЫМ ВЫЗОВОМ */}
              <button 
                type="button"
                onClick={onSealClick}
                style={{ cursor: 'pointer', zIndex: 100 }}
                className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl text-base shadow-lg active:scale-95 transition-all"
              >
                ЗАПЕЧАТАТЬ ПАМЯТЬ 🔒
              </button>
            </div>
          </div>
        )}

        {/* ДРУГИЕ ВКЛАДКИ (ДЛЯ ПРИМЕРА) */}
        {activeTab === 'feed' && <div className="p-10 text-center text-gray-500 italic">Лента пуста</div>}
        {activeTab === 'heritage' && <div className="p-10 text-center text-gray-500 italic">Наследие скоро...</div>}
      </div>

      {/* МЕНЮ */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-2 flex justify-between shadow-2xl">
        {[
          { id: 'feed', icon: '🌍', label: 'Лента' },
          { id: 'capsule', icon: '🔒', label: 'Создать' },
          { id: 'heritage', icon: '🌳', label: 'Наследие' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-2 px-5 py-4 rounded-[30px] transition-all ${activeTab === item.id ? 'bg-blue-600 text-white' : 'text-white/40'}`}
          >
            <span>{item.icon}</span>
            {activeTab === item.id && <span className="text-[11px] font-black uppercase">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
