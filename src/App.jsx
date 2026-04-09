import React, { useState, useEffect } from 'react';
import './App.css';

const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState('create'); 
  const [showIntro, setShowIntro] = useState(true);   
  const user = tg?.initDataUnsafe?.user;

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.headerColor = '#000000';
    }
  }, []);

  const startApp = () => {
    if (tg) tg.HapticFeedback.impactOccurred('medium');
    setShowIntro(false);
  };

  const handleSeal = () => {
    if (tg) {
      tg.HapticFeedback.notificationOccurred('success');
      tg.showAlert("Ваша капсула времени успешно запечатана и сохранена в архиве!");
    }
  };

  // --- ЭКРАН ПРИВЕТСТВИЯ ---
  if (showIntro) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <div className="w-24 h-24 bg-blue-600 rounded-[30px] flex items-center justify-center mb-10 rotate-3 shadow-2xl shadow-blue-500/40 border border-white/20">
          <span className="text-5xl">📜</span>
        </div>
        <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter italic">Хранитель Памяти</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-12 px-4">
          Создавайте послания, которые преодолеют десятилетия. Ваша история — это лучшее наследство для ваших потомков.
        </p>
        
        <div className="w-full space-y-3 mb-12">
          <div className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5 flex items-center gap-4 text-left">
            <span className="text-2xl">🔒</span>
            <div className="text-xs text-gray-300 font-medium">Безопасное хранение данных на 50+ лет</div>
          </div>
          <div className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5 flex items-center gap-4 text-left">
            <span className="text-2xl">💎</span>
            <div className="text-xs text-gray-300 font-medium">Возможность прикрепить цифровые активы</div>
          </div>
        </div>

        <button 
          onClick={startApp}
          className="w-full max-w-xs bg-white text-black font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-all uppercase tracking-widest"
        >
          Войти в архив
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans overflow-hidden">
      <div className="flex-grow overflow-y-auto pb-32 p-4">
        
        {/* ВКЛАДКА: СОЗДАТЬ */}
        {activeTab === 'create' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#1c1c1e] rounded-3xl p-4 flex items-center gap-4 border border-white/10 shadow-lg">
               <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center border-2 border-white/10">
                 <span className="text-2xl font-bold">{user?.first_name?.charAt(0) || '👤'}</span>
               </div>
               <div className="text-left">
                 <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{user?.first_name || 'Хранитель'}</span>
                    <span className="bg-green-500/20 text-green-500 text-[8px] px-1.5 py-0.5 rounded font-black uppercase">Online</span>
                 </div>
                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">ID: {user?.id || '7222570439'}</div>
               </div>
            </div>

            <h2 className="text-2xl font-black uppercase text-center tracking-tighter">Новая капсула</h2>

            <div className="bg-[#1c1c1e] rounded-[35px] p-6 border border-white/5 space-y-5 shadow-2xl relative">
              <div className="text-left">
                <label className="text-[9px] text-white/30 uppercase font-black ml-2 mb-1 block tracking-widest">Получатель</label>
                <input type="text" placeholder="Email или @Telegram" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="text-left">
                <label className="text-[9px] text-white/30 uppercase font-black ml-2 mb-1 block tracking-widest">Дата вскрытия</label>
                <input type="text" placeholder="Например: 12 мая 2045" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-[28px] p-5 text-left">
                <label className="text-[9px] text-blue-400 uppercase font-black mb-1 block tracking-widest">Денежный вклад</label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <input type="text" placeholder="Сумма (USDT/TON)" className="w-full bg-transparent text-sm text-white outline-none font-bold" />
                </div>
              </div>
              <button onClick={handleSeal} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all tracking-widest">
                ЗАПЕЧАТАТЬ ПАМЯТЬ 🔒
              </button>
            </div>
            <p className="text-[10px] text-gray-600 italic">* Послание будет доставлено, даже если вы не выйдете на связь</p>
          </div>
        )}

        {/* ВКЛАДКА: НАСЛЕДИЕ */}
        {activeTab === 'heritage' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-left px-2">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Квесты</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Очки Хранителя (XP)</p>
            </div>
            <div className="space-y-4">
                {[
                  { icon: '🎤', title: 'Интервью', xp: '+250 XP', desc: 'Запишите аудио с воспоминаниями старших.' },
                  { icon: '📸', title: 'Оцифровка', xp: '+100 XP', desc: 'Загрузите 5 архивных фото семьи.' },
                  { icon: '🌳', title: 'Древо', xp: '+50 XP', desc: 'Добавьте биографию прадедушки.' }
                ].map((item, i) => (
                  <div key={i} className="bg-[#1c1c1e] p-5 rounded-[30px] border border-white/5 flex items-center gap-5 active:scale-[0.98] transition-all">
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5">{item.icon}</div>
                    <div className="flex-grow text-left">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-black text-white uppercase text-xs">{item.title}</span>
                            <span className="text-blue-500 font-black text-[10px] bg-blue-500/10 px-2 py-0.5 rounded-full">{item.xp}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ВКЛАДКА: ЛЕНТА */}
        {activeTab === 'feed' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-black text-left uppercase tracking-tighter">Лента Хранителей</h2>
            <div className="bg-gradient-to-br from-zinc-800 to-black rounded-[35px] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 blur-[50px]"></div>
                <div className="text-[10px] text-gray-500 uppercase font-black mb-2 tracking-[0.2em] text-left">Глобальная статистика</div>
                <div className="text-5xl font-black text-white text-left tracking-tighter">12,854</div>
                <div className="text-xs text-blue-500 font-bold uppercase mt-1 text-left">Капсул запечатано сегодня</div>
            </div>
            <div className="bg-[#1c1c1e] p-6 rounded-[30px] border border-white/5 text-left relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10">🌍</div>
                  <div>
                    <div className="text-xs font-black text-white uppercase">Александр П.</div>
                    <div className="text-[9px] text-gray-600 font-bold uppercase">Запечатано 12.04.2024</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 italic leading-relaxed font-medium">"Это послание для моих внуков. Я хочу, чтобы вы знали, каким был мир в 2024 году..."</p>
                <div className="mt-6 flex justify-between items-center">
                    <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        <span className="text-[9px] text-gray-500 font-bold uppercase">Откроется через 20 лет</span>
                    </div>
                    <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/5 px-3 py-1.5 rounded-xl border border-blue-500/10">Подробнее</button>
                </div>
            </div>
          </div>
        )}

      </div>

      {/* НАВИГАЦИЯ */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#1c1c1e]/90 backdrop-blur-3xl border border-white/10 rounded-[45px] p-2 flex justify-between z-50 shadow-2xl shadow-black">
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
            className={`flex items-center gap-3 px-6 py-4 rounded-[35px] transition-all duration-500 ${
              activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-gray-500'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            {activeTab === item.id && <span className="text-[10px] font-black uppercase tracking-[0.1em]">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
