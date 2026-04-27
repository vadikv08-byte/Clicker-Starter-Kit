import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// Твои данные из Supabase (уже вставлены)
const supabaseUrl = 'https://ozkiafjaupilvtmtvkhr.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_AtquiuoGJilSzhSFc_8llG_qcaxXb6f00e9095648834455883838383838383'; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const tg = window.Telegram?.WebApp;

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [receiver, setReceiver] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  const handleSave = async () => {
    if (!receiver || !date || !message) {
      tg.showAlert("Пожалуйста, заполните все поля.");
      return;
    }
    setLoading(true);
    
    const { error } = await supabase
      .from('capsules')
      .insert([{ 
        user_id: tg?.initDataUnsafe?.user?.id?.toString() || '0', 
        receiver, 
        open_date: date, 
        message 
      }]);
    
    setLoading(false);
    
    if (error) {
      tg.showAlert("Ошибка базы: " + error.message);
    } else {
      tg.showAlert("Капсула времени успешно запечатана! 🔒");
      setReceiver(''); setDate(''); setMessage('');
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-6">
          <span className="text-4xl">📜</span>
        </div>
        <h1 className="text-2xl font-bold mb-2 uppercase">Хранитель Памяти</h1>
        <p className="text-gray-400 text-sm mb-10">Ваш личный архив для передачи истории через поколения.</p>
        <button onClick={() => setShowIntro(false)} className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase text-xs">Войти в архив</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="text-xl font-bold uppercase mb-6 italic">Новая капсула</h2>
      <div className="bg-[#1c1c1e] rounded-[30px] p-6 space-y-4 border border-white/5 text-left">
        <label className="text-[10px] text-gray-500 uppercase ml-2">Кому</label>
        <input value={receiver} onChange={e => setReceiver(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" placeholder="@username" />
        
        <label className="text-[10px] text-gray-500 uppercase ml-2">Дата открытия</label>
        <input value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" placeholder="2045" />
        
        <label className="text-[10px] text-gray-500 uppercase ml-2">Послание</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none min-h-[120px]" placeholder="Напишите что-то важное..." />
        
        <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl uppercase text-sm">
          {loading ? 'СОХРАНЕНИЕ...' : 'ЗАПЕЧАТАТЬ ПАМЯТЬ 🔒'}
        </button>
      </div>
    </div>
  );
}
