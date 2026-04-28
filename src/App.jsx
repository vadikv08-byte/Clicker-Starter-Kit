import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

const supabase = createClient(
  'https://ozkiafjaupilvtmtvkhr.supabase.co',
  'sb_publishable_AtquiuoGJilSzhSFc_8lLg_qcaxX6C7' 
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
      tg?.showAlert("Ошибка: " + error.message);
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
            <div className="input-group">
              <label className="input-label">КОМУ ПОСЛАНИЕ</label>
              <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="@username или имя" />
            </div>
            
            <div className="input-group">
              <label className="input-label">КОГДА ОТКРЫТЬ (ДАТА И ВРЕМЯ)</label>
              <input type="datetime-local" value={openDate} onChange={e => setOpenDate(e.target.value)} className="date-input" />
            </div>
            
            <div className="input-group">
              <label className="input-label">ВАША ИСТОРИЯ</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Напишите послание в будущее..." />
            </div>
            
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
            <div className="glass-card center">
              <span style={{fontSize: '50px'}}>📦</span>
              <p>У вас пока нет запечатанных писем</p>
            </div>
          ) : (
            capsules.map(cap => (
              <div key={cap.id} className="glass-card archive-item">
                <div className="archive-info">
                  <span className="receiver-name">ДЛЯ: {cap.receiver}</span>
                  <span className="open-time">🔓 {new Date(cap.open_date).toLocaleString('ru-RU')}</span>
                </div>
                <div className="status-badge">Запечатано</div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'pro' && (
        <div className="fade-in">
          <h1 className="title">PREMIUM</h1>
          <div className="glass-card pro-card">
            <div className="pro-header">
              <span className="pro-icon">💎</span>
              <h2 className="pro-title">VIP ДОСТУП</h2>
              <p className="pro-subtitle">Максимальные возможности для ваших воспоминаний</p>
            </div>
            
            <ul className="pro-features">
              <li>✅ Хранение посланий до 100 лет</li>
              <li>✅ Фото, видео и аудио файлы (скоро)</li>
              <li>✅ Уведомление получателю в Telegram</li>
              <li>✅ Точное время открытия (до минуты)</li>
              <li>✅ Личный архив без ограничений</li>
            </ul>

            <div className="pro-footer">
              <div className="price-tag">
                <span>Единоразовый доступ:</span>
                <span className="price">499 ₽</span>
              </div>
              <button onClick={() => tg?.showAlert("Оплата через Telegram Stars скоро будет доступна!")} className="pro-btn">
                СТАТЬ VIP ⭐
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="bottom-nav">
        <button onClick={() => setActiveTab('create')} className={activeTab === 'create' ? 'active' : ''}>
          <span className="nav-icon">➕</span> Создать
        </button>
        <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? 'active' : ''}>
          <span className="nav-icon">📦</span> Архив
        </button>
        <button onClick={() => setActiveTab('pro')} className={activeTab === 'pro' ? 'active' : ''}>
          <span className="nav-icon">⭐</span> PRO
        </button>
      </nav>
    </div>
  );
}
