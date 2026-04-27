import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// ВСТАВЬ СВОИ ДАННЫЕ ИЗ SUPABASE НИЖЕ
const supabaseUrl = 'https://ozkiafjaupilvtmtvkhr.supabase.co'; 
const supabaseAnonKey = 'ТВОЙ_КЛЮЧ_ANON_PUBLIC'; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState('create');
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
      tg.showAlert("Заполните все поля");
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
      tg.showAlert("Капсула запечатана! 🔒");
      setReceiver(''); setDate(''); setMessage('');
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-6">
          <span className="text-4xl">📜</span>
        </div>
        <h1 className="text-2xl font-bold mb-4 uppercase">Хранитель Памяти</h1>
        <p className="text-gray-400 text-sm mb-10">Ваш личный архив для передачи истории через поколения.</p>
        <button onClick={() => setShowIntro(false)} className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase text-xs">Начать работу</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="text-xl font-bold uppercase mb-6">Новая капсула</h2>
      <div className="bg-[#1c1c1e] rounded-[30px] p-6 space-y-4 border border-white/5">
        <input value={receiver} onChange={e => setReceiver(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" placeholder="Кому (Имя или @ник)" />
        <input value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" placeholder="Дата открытия (например, 2045)" />
        <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none min-h-[120px]" placeholder="Ваше послание..." />
        <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl uppercase text-sm">
          {loading ? 'СОХРАНЕНИЕ...' : 'ЗАПЕЧАТАТЬ 🔒'}
        </button>
      </div>
    </div>
  );
}
