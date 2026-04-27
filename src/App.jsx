import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

const supabase = createClient(
  'https://ozkiafjaupilvtmtvkhr.supabase.co', 
  'sb_publishable_AtquiuoGJilSzhSFc_8llG_qcaxXb6f00e9095648834455883838383838383'
);
const tg = window.Telegram?.WebApp;

export default function App() {
  const [receiver, setReceiver] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (tg) { tg.ready(); tg.expand(); } }, []);

  const handleSave = async () => {
    if (!receiver || !date || !message) { tg.showAlert("Заполните все поля!"); return; }
    setLoading(true);
    const { error } = await supabase.from('capsules').insert([{ 
      user_id: tg?.initDataUnsafe?.user?.id?.toString() || '0', 
      receiver, open_date: date, message 
    }]);
    setLoading(false);
    if (error) tg.showAlert("Ошибка: " + error.message);
    else { tg.showAlert("Запечатано! 🔒"); setReceiver(''); setDate(''); setMessage(''); }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-xl font-black mb-8 italic text-center">MEMORY KEEPER</h1>
      <div className="w-full space-y-4">
        <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="Кому послание" className="w-full bg-[#1c1c1e] p-4 rounded-2xl border border-white/5 outline-none focus:border-blue-500" />
        <input value={date} onChange={e => setDate(e.target.value)} placeholder="Год открытия" className="w-full bg-[#1c1c1e] p-4 rounded-2xl border border-white/5 outline-none focus:border-blue-500" />
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Ваша история..." className="w-full bg-[#1c1c1e] p-4 rounded-2xl border border-white/5 h-40 outline-none focus:border-blue-500" />
        <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 py-5 rounded-2xl font-bold uppercase active:scale-95 transition-all">
          {loading ? 'ЗАГРУЗКА...' : 'ЗАПЕЧАТАТЬ 🔒'}
        </button>
      </div>
    </div>
  );
}
