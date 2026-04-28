import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// ПОСЛЕ НАЖАТИЯ "RESUME" ВОЗЬМИ КЛЮЧ В SETTINGS -> API
const supabase = createClient(
  'https://ozkiafjaupilvtmtvkhr.supabase.co',
  'ВСТАВЬ_СЮДА_СВОЙ_ANON_KEY' 
);

const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState('create');
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [receiver, setReceiver] = useState('');
  const [openDate, setOpenDate] = useState(''); 
  const [message, setMessage] = useState('');

  const userId = tg?.initDataUnsafe?.user?.id?.toString() || '0';

  useEffect(() => {
    tg?.ready();
    tg?.expand();
    if (userId !== '0') fetchCapsules();
  }, [userId]);

  const fetchCapsules = async () => {
    const { data, error } = await supabase
      .from('capsules')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (!error) setCapsules(data);
  };

  const saveCapsule = async () => {
    if (!receiver || !openDate || !message) {
      tg?.showAlert("Заполните все поля!");
      return;
    }
    setLoading(true);
    
    const { error } = await supabase.from('capsules').insert([{
      user_id: userId,
      receiver: receiver,
      open_date: openDate,
      message: message
    }]);

    setLoading(false);

    if (error) {
      tg?.showAlert("Ошибка базы: " + error.message);
    } else {
      tg?.HapticFeedback?.impactOccurred('medium');
      tg?.showAlert("Запечатано! 🔒");
      setReceiver(''); setOpenDate(''); setMessage('');
      fetchCapsules();
      setActiveTab('archive');
    }
  };

  return (
    <div className="app-container">
      {activeTab === 'create' && (
        <div className="fade-in">
          <h1 className="title">СОЗДАТЬ</h1>
          <div className="glass-card">
            <label className="input-label">КОМУ ПОСЛАНИЕ</label>
            <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="@username" />
            
            <label className="input-label" style={{marginTop: '15px'}}>ДАТА И ВРЕМЯ ОТКРЫТИЯ</label>
            <input 
              type="datetime-local" 
              value={openDate}
              onChange={e => setOpenDate(e.target.value)}
              className="date-input"
            />
            
            <label className="input-label" style={{marginTop: '15px'}}>ВАША ИСТОРИЯ</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Напишите что-то важное..." />
            
            <button onClick={saveCapsule} className="action-btn" disabled={loading}>
              {loading ? 'СОХРАНЕНИЕ...' : 'ЗАПЕЧАТАТЬ 🔒'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'archive' && (
        <div className="fade-in">
          <h1 className="title">АРХИВ</h1>
          {capsules.length === 0 ? (
            <div className="glass-card center">Ваш список пуст</div>
          ) : (
            capsules.map(cap => (
              <div key={cap.id} className="glass-card">
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#8e8e93'}}>
                  <span>ДЛЯ: {cap.receiver}</span>
                  <span>{new Date(cap.open_date).toLocaleString('ru-RU')}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <nav className="bottom-nav">
        <button onClick={() => setActiveTab('create')} className={activeTab === 'create' ? 'active' : ''}>➕ Создать</button>
        <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? 'active' : ''}>📦 Архив</button>
      </nav>
    </div>
  );
}
