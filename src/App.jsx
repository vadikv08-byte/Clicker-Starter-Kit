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

  if (showIntro) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <div className="w-24 h-24 bg-blue-600 rounded-[30px] flex items-center justify-center mb-10 rotate-3 shadow-2xl shadow-blue-500/40 border border-white/20">
          <span className="text-5xl">📜</span>
        </div>
        <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter">Хранитель Памяти</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-12 px-4">
          Ваш личный цифровой архив для передачи истории, ценностей и активов через поколения.
        </p>
        <button 
          onClick={startApp}
          className="w-full max-w-xs bg-white text-black font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-all uppercase tracking-widest"
        >
          Начать работу
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
            
            {/* ШАПКА С ПРОФИЛЕМ */}
            <div className="bg-[#1c1c1e] rounded-3xl p-4 flex items-center gap-4 border border-white/10 shadow-lg">
               <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center border-2 border-white/10">
                 <span className="text-2xl font-bold">{user?.first_name?.charAt(0) || '👤'}</span>
               </div>
               <div className="text-left">
                 <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{user?.first_name || 'Хранитель'}</span>
                 </div>
                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Статус: Хранитель Рода</div>
               </div>
            </div>

            {/* ОПИСАНИЕ ГЛАВНОЙ ФУНКЦИИ */}
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 text-left">
              <h3 className="text-blue-400 text-xs font-black uppercase mb-1">Как это работает?</h3>
              <p className="text-[10px] text-gray-400 leading-tight">
                Создайте капсулу времени: напишите письмо, прикрепите файлы или цифровой вклад. Она будет надежно запечатана и доставлена получателю точно в указанную вами дату, даже спустя десятки лет.
              </p>
            </div>

            {/* ФОРМА */}
            <div className="bg-[#1c1c1e] rounded-[35px] p-6 border border-white/5 space-y-5 shadow-2xl relative">
              <div className="text-left">
                <label className="text-[9px] text-white/30 uppercase font-black ml-2 mb-1 block tracking-widest italic text-left">Кому передаем память?</label>
                <input type="text" placeholder="Email или @Telegram получателя" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-blue-500 transition-colors" />
                <p className="text-[8px] text-gray-600 mt-1 ml-2 text-left">Укажите контакт того, кто должен получить доступ к архиву.</p>
              </div>

              <div className="text-left">
                <label className="text-[9px] text-white/30 uppercase font-black ml-2 mb-1 block tracking-widest italic text-left">Когда вскрыть замок?</label>
                <input type="text" placeholder="Например: 01.01.2040" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none" />
                <p className="text-[8px] text-gray-600 mt-1 ml-2 text-left">До этой даты никто (включая вас) не сможет открыть содержимое.</p>
              </div>

              {/* БЛОК ФИНАНСОВОГО НАСЛЕДИЯ */}
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-[28px] p-5 text-left">
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-xl">💰</span>
                   <label className="text-[9px] text-yellow-600 uppercase font-black tracking-widest">Цифровое Наследство</label>
                </div>
                <input type="text" placeholder="Сумма (USDT/TON)" className="w-full bg-transparent text-sm text-white outline-none font-bold placeholder:text-yellow-700/30 mb-2" />
                <p className="text-[8px] text-yellow-700/60 leading-tight italic">
                  Вы можете зарезервировать активы, которые станут доступны получателю вместе с вашим посланием. Это ваш личный семейный траст.
                </p>
              </div>

              <button onClick={handleSeal} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all tracking-widest">
                ЗАПЕЧАТАТЬ ПАМЯТЬ 🔒
              </button>
            </div>
          </div>
        )}

        {/* ВКЛАДКА: НАСЛЕДИЕ (КВЕСТЫ С ОПИСАНИЕМ) */}
        {activeTab === 'heritage' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-left px-2">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Квесты Рода</h2>
                <p className="text-xs text-gray-500 leading-tight mt-1">
                  Выполняйте задания, чтобы восполнить пробелы в истории вашей семьи и получить статус Старшего Хранителя.
                </p>
            </div>
            <div className="space-y-4">
                {[
                  { icon: '🎤', title: 'Живой голос', xp: '+250 XP', desc: 'Запишите аудио-интервью с дедушкой или бабушкой. Спросите об их самом ярком детском воспоминании.' },
                  { icon: '📸', title: 'Альбом предков', xp: '+100 XP', desc: 'Оцифруйте и загрузите 5 старых фотографий. Искусственный интеллект поможет улучшить их качество.' },
                  { icon: '🌳', title: 'Корни древа', xp: '+50 XP', desc: 'Укажите полные имена и даты жизни ваших прадедушек. Это важно для генеалогического архива.' }
                ].map((item, i) => (
                  <div key={i} className="bg-[#1c1c1e] p-5 rounded-[30px] border border-white/5 flex flex-col gap-3 active:scale-[0.98] transition-all text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-2xl border border-white/5">{item.icon}</div>
                      <div className="flex-grow">
                          <div className="flex justify-between items-center">
                              <span className="font-black text-white uppercase text-[11px] tracking-widest">{item.title}</span>
                              <span className="text-blue-500 font-black text-[9px] bg-blue-500/10 px-2 py-0.5 rounded-full">{item.xp}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-medium leading-snug mt-1">{item.desc}</p>
                      </div>
                    </div>
                    <button className="w-full bg-white/5 border border-white/10 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Приступить</button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ВКЛАДКА: ЛЕНТА */}
        {activeTab === 'feed' && (
          <div className="space-y-6 animate-fadeIn text-left">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Глобальный Архив</h2>
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4">
               <p className="text-[10px] text-blue-400 font-medium leading-relaxed">
                 Здесь отображаются капсулы, которые были отмечены как «Публичные». Это коллективная память человечества, истории, которые люди решили оставить не только своей семье, но и всему миру.
               </p>
            </div>
            
            <div className="bg-[#1c1c1e] p-6 rounded-[30px] border border-white/5 text-left opacity-60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-xs">📜</div>
                  <div className="text-[10px] font-black text-white uppercase tracking-widest">История Хранителя #482</div>
                </div>
                <p className="text-[11px] text-gray-500 italic">"Сегодня я запечатал свое первое послание. Надеюсь, мой сын увидит его в 2045 году..."</p>
            </div>
          </div>
        )}

      </div>

      {/* НАВИГАЦИЯ */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#1c1c1e]/95 backdrop-blur-3xl border border-white/10 rounded-[45px] p-2 flex justify-between z-50 shadow-2xl">
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
              activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-500'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            {activeTab === item.id && <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
