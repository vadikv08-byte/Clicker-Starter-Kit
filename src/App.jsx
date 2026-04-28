import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// Инициализация Supabase
const supabase = createClient(
  'https://ozkiafjaupilvtmtvkhr.supabase.co',
  'sb_publishable_AtquiuoGJilSzhSFc_8lLg_qcaxX6C7'
);

const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState('create');
  const [receiver, setReceiver] = useState('');
  const [openDate, setOpenDate] = useState('');
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
    if (!receiver || !openDate || !message) {
      tg?.showAlert("Заполните все поля");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('capsules').insert([{
        user_id: tg?.initDataUnsafe?.user?.id?.toString() || '0',
        receiver: receiver,
        open_date: openDate,
        message: message
      }]);

      if (error) throw error;

      tg?.HapticFeedback.impactOccurred('medium');
      tg?.showAlert("Запечатано! 🔒");
      
      // Очистка полей
      setReceiver('');
      setOpenDate('');
      setMessage('');
      
    } catch (error) {
      tg?.showAlert("Ошибка: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Хранитель памяти</h1>

      {activeTab === 'create' ? (
        <div className="glass-card">
          <div className="input-group">
            <label className="input-label">КОМУ ПОСЛАНИЕ</label>
            <input 
              value={receiver} 
              onChange={e => setReceiver(e.target.value)} 
              placeholder="@username" 
            />
          </div>

          <div className="input-group">
            <label className="input-label">ДАТА И ВРЕМЯ ОТКРЫТИЯ</label>
            <input 
              type="datetime-local" 
              value={openDate} 
              onChange={e => setOpenDate(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label className="input-label">ВАША ИСТОРИЯ</label>
            <textarea 
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              placeholder="Напишите что-то важное..." 
            />
          </div>

          <button onClick={saveCapsule} className="action-btn" disabled={loading}>
            {loading ? 'СОХРАНЕНИЕ...' : 'ЗАПЕЧАТАТЬ 🔒'}
          </button>
        </div>
      ) : (
        <div className="center">
          <div style={{fontSize: '50px', marginBottom: '10px'}}>📦</div>
          <p>Ваш архив пока пуст</p>
        </div>
      )}

      <nav className="bottom-nav">
        <button 
          className={activeTab === 'create' ? 'active' : ''} 
          onClick={() => setActiveTab('create')}
        >
          <span>➕</span>
          <span>Создать</span>
        </button>
        <button 
          className={activeTab === 'archive' ? 'active' : ''} 
          onClick={() => setActiveTab('archive')}
        >
          <span>📦</span>
          <span>Архив</span>
        </button>
        <button 
          onClick={() => tg?.showAlert("Доступно в версии PRO")}
        >
          <span>⭐</span>
          <span>PRO</span>
        </button>
      </nav>
    </div>
  );
}
