import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

const supabase = createClient(
  'https://ozkiafjaupilvtmtvkhr.supabase.co', 
  'sb_publishable_AtquiuoGJilSzhSFc_8llG_qcaxXb6f00e9095648834455883838383838383'
);
const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState('create');
  const [receiver, setReceiver] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    if (tg) { 
      tg.ready(); 
      tg.expand(); 
      tg.headerColor = '#000000';
    } 
  }, []);

  const saveCapsule = async () => {
    if (!receiver || !date || !message) { 
      tg?.showAlert("Заполните все поля"); 
      return; 
    }
    setLoading(true);
    const { error } = await supabase.from('capsules').insert([{ 
      user_id: tg?.initDataUnsafe?.user?.id?.toString() || '0', 
      receiver, 
      open_date: date, 
      message 
    }]);

    if (error) {
      tg?.showAlert("Ошибка: " + error.message);
    } else { 
      tg?.HapticFeedback?.impactOccurred('medium'); 
      tg?.showAlert("Запечатано! 🔒"); 
      setActiveTab('archive'); 
      setReceiver(''); setDate(''); setMessage('');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        {activeTab === 'create' && (
          <section>
            <h1 className="title">Создать</h1>
            <div className="glass-card">
              <label className="input-label">КОМУ ПОСЛАНИЕ</label>
              <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="@username" />
              
              <label className="input-label" style={{marginTop:'15px'}}>ГОД ОТКРЫТИЯ</label>
              <input value={date} onChange={e => setDate(e.target.value)} type="number" placeholder="2045" />
              
              <label className="input-label" style={{marginTop:'15px'}}>ВАША ИСТОРИЯ</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Напишите что-то важное..." rows="5" />
              
              <button onClick={saveCapsule} className="action-btn">
                {loading ? 'ЗАГРУЗКА...' : 'ЗАПЕЧАТАТЬ 🔒'}
              </button>
            </div>
          </section>
        )}

        {activeTab === 'archive' && (
          <section>
            <h1 className="title">Архив</h1>
            <div className="glass-card center">
              <div style={{fontSize: '50px'}}>📦</div>
              <p style={{color: '#8e8e93'}}>Ваш список пуст</p>
            </div>
          </section>
        )}

        {activeTab === 'pro' && (
          <section>
            <h1 className="title">Premium</h1>
            <div className="glass-card">
              <h3 style={{color: '#FFD700', margin: '0'}}>VIP Доступ 💎</h3>
              <p style={{color: '#8e8e93', fontSize: '14px'}}>Хранение файлов и видео на 100 лет.</p>
              <button className="action-btn" style={{background: '#FFD700', color: '#000'}}>УЛУЧШИТЬ ⭐</button>
            </div>
          </section>
        )}
      </div>

      <nav className="bottom-nav">
        <button className={activeTab === 'create' ? 'active' : ''} onClick={() => setActiveTab('create')}>
          <span>➕</span><small>Создать</small>
        </button>
        <button className={activeTab === 'archive' ? 'active' : ''} onClick={() => setActiveTab('archive')}>
          <span>📦</span><small>Архив</small>
        </button>
        <button className={activeTab === 'pro' ? 'active' : ''} onClick={() => setActiveTab('pro')}>
          <span>⭐</span><small>PRO</small>
        </button>
      </nav>
    </div>
  );
}
