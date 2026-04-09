import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 font-sans flex flex-col items-center">
      {/* Шапка */}
      <div className="w-full max-w-md flex flex-col items-center mt-8 mb-6">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
          <span className="text-4xl text-white">🔒</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">СЕМЕЙНЫЙ АРХИВ</h1>
        <p className="text-blue-400 text-[10px] uppercase tracking-[0.3em] mt-1">Капсула времени</p>
      </div>

      {/* Основная форма */}
      <div className="w-full max-w-md bg-[#161616] rounded-[32px] p-6 shadow-2xl border border-white/5">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-white/30 uppercase ml-2 mb-1 block">Получатель</label>
            <input 
              type="text" 
              placeholder="Email или @Telegram" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] text-white/30 uppercase ml-2 mb-1 block">Дата вскрытия</label>
            <input 
              type="date" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
            <label className="text-[10px] text-yellow-500 uppercase ml-2 mb-1 block font-bold">Денежный подарок</label>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <input 
                type="text" 
                placeholder="Сумма или ссылка на банк" 
                className="w-full bg-transparent text-white outline-none placeholder:text-yellow-500/30"
              />
            </div>
          </div>

          <button 
            onClick={() => {
              setIsLocked(true);
              alert("Капсула успешно создана! Мы свяжемся с Хранителем.");
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl text-lg shadow-lg shadow-blue-500/20 active:scale-95 transition-all mt-4"
          >
            {isLocked ? "ЗАПЕЧАТАНО ✔️" : "ЗАПЕЧАТАТЬ ПАМЯТЬ"}
          </button>
        </div>
        
        <p className="text-[9px] text-gray-500 text-center mt-4 italic">
          * Послание будет доставлено даже через 30 лет через систему доверенных Хранителей.
        </p>
      </div>

      {/* Меню снизу */}
      <div className="fixed bottom-6 w-full max-w-xs bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 flex justify-around">
        <div className="flex flex-col items-center">
          <span className="text-xl">🏠</span>
          <span className="text-[9px] text-white/50">Создать</span>
        </div>
        <div className="flex flex-col items-center opacity-30">
          <span className="text-xl">📂</span>
          <span className="text-[9px] text-white/50">Архив</span>
        </div>
        <div className="flex flex-col items-center opacity-30">
          <span className="text-xl">⚙️</span>
          <span className="text-[9px] text-white/50">Опции</span>
        </div>
      </div>
    </div>
  );
}

export default App;
