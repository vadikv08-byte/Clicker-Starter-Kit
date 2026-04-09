import React, { useState, useEffect } from 'react';
import './App.css';

// Инициализация Telegram
const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState('capsule');
  const user = tg?.initDataUnsafe?.user;

  // Данные для формы
  const [formData, setFormData] = useState({
    receiver: '',
    date: '',
    amount: ''
  });

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  // Функция нажатия на кнопку "Запечатать"
  const handleSeal = () => {
    if (tg) {
      tg.HapticFeedback.notificationOccurred('success');
      tg.showAlert(`Капсула для ${formData.receiver || 'получателя'} успешно запечатана!`);
    } else {
      alert("Капсула запечатана!");
    }
  };

  // Вкладка: ЛЕНТА
  const Feed = () => (
    <div className="p-4 space-y-5 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white text-left">Лента Хранителей</h2>
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 shadow-xl">
        <div className="text-[10px] text-white/60 uppercase font-bold mb-1 text-left">СЕГОДНЯ ОТКРЫТО</div>
        <div className="text-4xl font-black text-white text-left">3,241 <span className="text-lg font-normal opacity-70">капсула</span></div>
      </div>
      <div className="bg-[#1c1c1e] rounded-2xl p-4 border border-white/5 text-left">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-xl">⏳</div>
          <div>
            <div className="text-sm font-bold text-white text-left">Алексей Н. (Одесса)</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase text-left">Открыта сегодня</div>
          </div>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed italic text-left">"Привет из 2014-го! Надеюсь, у вас там всё хорошо."</p>
      </div>
    </div>
  );

  // Вкладка: СОЗДАТЬ
  const Create = () => (
    <div className="p-4 space-y-6 animate-fadeIn pb-24">
      {/* КАРТОЧКА ПРОФИЛЯ */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-3xl p-4 flex items-center gap-4 shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden border-2 border-white/10">
          {user?.photo_url ? (
            <img src={user.photo_url} alt="Ava" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold">{user?.first_name?.charAt(0) || 'V'}</span>
          )}
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{user?.first_name || 'Пользователь'}</span>
            <span className="bg-blue-600 text-[8px] px-1.5 py-0.5 rounded font-black uppercase text-white">Хранитель</span>
          </div>
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">ID: {user?.id || '7222570439'}</div>
        </div>
        <div className="ml-auto bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-lg">
           <span className="text-[9px] text-green-500 font-black uppercase tracking-widest text-left">Online</span>
        </div>
      </div>

      <h1 className="text-2xl font-black text-center text-white uppercase">Новая капсула</h1>

      <div className="bg-[#1c1c1e] rounded-[32px] p-6 shadow-2xl border border-white/5 space-y-4">
        <div className="text-left">
          <label className="text-[10px] text-white/30 uppercase font-black ml-1 mb-1 block">Получатель</label>
          <input 
            type="text" 
            placeholder="@MrV77777" 
            value={formData.receiver}
            onChange={(e) => setFormData({...formData, receiver: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-blue-500" 
          />
        </div>
        <div className="text-left">
          <label className="text-[10px] text-white/30 uppercase font-black ml-1 mb-1 block">Дата открытия</label>
          <input 
            type="text" 
            placeholder="9 апр. 2026 г." 
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none" 
          />
        </div>
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-[24px] p-4 text-left">
          <label className="text-[10px] text-yellow-600 uppercase font-black ml-1 mb-1 block">Денежный вклад</label>
          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <input 
              type="text" 
              placeholder="Сумма (USDT/TON)" 
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full bg-transparent text-sm text-white outline-none font-bold placeholder:text-yellow-700/30" 
            />
          </div>
        </div>
        <button 
          onClick={handleSeal}
          className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl text-base shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
        >
          ЗАПЕЧАТАТЬ ПАМЯТЬ 🔒
        </button>
      </div>
    </div>
  );

  // Вкладка: НАСЛЕДИЕ
  const Heritage = () => (
    <div className="p-4 space-y-5 animate-fadeIn text-left">
      <h2 className="text-2xl font-bold text-white">Квесты Наследия</h2>
      <p className="text-xs text-gray-400 font-medium">Собирай историю семьи и получай XP</p>
      {[
        { icon: '🎤', title: 'Интервью с бабушкой', xp: '+250 XP' },
        { icon: '📸', title: 'Оцифровка архива', xp: '+100 XP' },
        { icon: '🌳', title: 'Добавить ветвь древа', xp: '+50 XP' }
      ].map((q, i) => (
        <div key={i} className="bg-[#1c1c1e] rounded-3xl p-4 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center text-3xl">{q.icon}</div>
            <div className="text-sm font-bold text-white">{q.title}</div>
          </div>
          <div className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">{q.xp}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans overflow-x-hidden">
      <div className="flex-grow">
        {activeTab === 'feed' && <Feed />}
        {activeTab === 'capsule' && <Create />}
        {activeTab === 'heritage' && <Heritage />}
      </div>

      {/* НАВИГАЦИЯ */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-2 flex justify-between shadow-2xl z-50">
        {[
          { id: 'feed', icon: '🌍', label: 'Лента' },
          { id: 'capsule', icon: '🔒', label: 'Создать' },
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
