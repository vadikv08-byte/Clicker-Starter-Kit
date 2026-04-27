import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// Твои настройки (Меняем только тут)
const supabaseUrl = 'https://ozkiafjaupilvtmtvkhr.supabase.co'; 
const supabaseAnonKey = 'ВСТАВЬ_СЮДА_ДЛИННЫЙ_КЛЮЧ_ИЗ_SUPABASE'; 

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
      tg.showAlert("Заполните все поля!");
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
        tg.showAlert("Ошибка: " + error.message);
    } else {
        tg.showAlert("Готово! Капсула запечатана 🔒");
        setReceiver(''); setDate(''); setMessage('');
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">ХРАНИТЕЛЬ ПАМЯТИ</h1>
        <button onClick={() => setShowIntro(false)} className="w-full bg-white text-black font-bold py-4 rounded-xl">НАЧАТЬ</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <input value={receiver} onChange={e => setReceiver(e.target.value)} className="w-full bg-white/10 rounded-xl p-3 mb-4" placeholder="Кому" />
      <input value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white/10 rounded-xl p-3 mb-4" placeholder="Когда открыть" />
      <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-white/10 rounded-xl p-3 mb-4 min-h-[100px]" placeholder="Текст" />
      <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 py-4 rounded-xl font-bold">
        {loading ? 'СОХРАНЯЮ...' : 'ЗАПЕЧАТАТЬ 🔒'}
      </button>
    </div>
  );
}
