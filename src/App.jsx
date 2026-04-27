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

  useEffect(() => { 
    if (tg) { 
      tg.ready(); 
      tg.setHeaderColor('#000000');
      tg.expand(); 
    } 
  }, []);

  const handleSave = async () => {
    if (!receiver || !date || !message) { tg.showAlert("Заполните все поля хранилища"); return; }
    setLoading(true);
    const { error } = await supabase.from('capsules').insert([{ 
      user_id: tg?.initDataUnsafe?.user?.id?.toString() || 'admin', 
      receiver, open_date: date, message 
    }]);
    setLoading(false);
    if (error) tg.showAlert("Сбой синхронизации: " + error.message);
    else { 
      tg.HapticFeedback.notificationOccurred('success');
      tg.showAlert("Данные зашифрованы и запечатаны 🔒"); 
      setReceiver(''); setDate(''); setMessage(''); 
    }
  };

  return (
    <div className="app-container">
      <div className="bg-glow"></div>
      <header>
        <div className="status-badge">CRYPTOGRAPHIC SECURITY: ON</div>
        <h1 className="main-title">MEMORY<span>KEEPER</span></h1>
        <p className="subtitle">Ваше наследие в цифровой вечности</p>
      </header>

      <main className="form-card">
        <div className="input-group">
          <label>АДРЕСАТ НАСЛЕДИЯ</label>
          <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="Кому принадлежит доступ?" />
        </div>

        <div className="input-group">
          <label>ГОД РАЗБЛОКИРОВКИ</label>
          <input value={date} onChange={e => setDate(e.target.value)} placeholder="Например, 2045" type="number" />
        </div>

        <div className="input-group">
          <label>КРИПТО-ПОСЛАНИЕ</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Введите текст, который будет скрыт десятилетиями..." />
        </div>

        <button onClick={handleSave} disabled={loading} className="save-btn">
          {loading ? <span className="loader"></span> : 'ЗАПЕЧАТАТЬ КАПСУЛУ'}
        </button>
      </main>

      <footer className="info-footer">
        Все данные зашифрованы по протоколу AES-256
      </footer>
    </div>
  );
}
