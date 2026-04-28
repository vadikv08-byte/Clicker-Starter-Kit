import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

const supabase = createClient(
  'https://ozkiafjaupilvtmtvkhr.supabase.co',
  'YOUR_SUPABASE_KEY' // Замени на свой актуальный ключ
);

const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState('create');
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Поля формы
  const [receiver, setReceiver] = useState('');
  const [openDate, setOpenDate] = useState(''); 
  const [message, setMessage] = useState('');

  const userId = tg?.initDataUnsafe?.user?.id?.toString() || '0';

  useEffect(() => {
    tg?.ready();
    tg?.expand(); // Разворачиваем на весь экран
    // Авто-подстройка под клавиатуру
    tg?.enableClosingConfirmation();
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

  const handlePayment = () => {
    // В Telegram Mini Apps оплата инициируется через бота
    // Отправляем данные боту, чтобы он выставил счет (Invoice)
    tg?.sendData(JSON.stringify({ action: 'buy_pro', price: 500 })); 
    tg?.showAlert("Запрос на оплату отправлен боту! Проверьте чат.");
  };

  const saveCapsule = async () => {
    if (!receiver || !openDate || !message) {
      tg?.showAlert("Пожалуйста, заполните все поля!");
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
      tg?.showConfirm("Послание запечатано! Перейти в архив?", (ok) => {
        if(ok) setActiveTab('archive');
      });
      setReceiver(''); setOpenDate(''); setMessage('');
      fetchCapsules();
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {activeTab === 'create' && (
          <div className="fade-in">
            <h1 className="title">СОЗДАТЬ</h1>
            <div className="glass-card">
              <div className="input-group">
                <label className="input-label">КОМУ ПОСЛАНИЕ</label>
                <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="@username" />
              </div>
              
              <div className="input-group">
                <label className="input-label">ДАТА ОТКРЫТИЯ</label>
                <input type="datetime-local" value={openDate} onChange={e => setOpenDate(e.target.value)} />
              </div>
              
              <div className="input-group">
                <label className="input-label">ВАША ИСТОРИЯ</label>
                <textarea 
                  value={message} 
                  onChange={e => setMessage(e.target.value)} 
                  placeholder="Напишите что-то важное..." 
                  className="story-textarea"
                />
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
              <div className="empty-state">
                <span className="big-icon">📦</span>
                <p>У вас пока нет капсул времени</p>
              </div>
            ) : (
              capsules.map(cap => (
                <div key={cap.id} className="glass-card archive-item">
                  <div className="archive-info">
                    <strong>ДЛЯ: {cap.receiver}</strong>
                    <p>🔓 Доступно: {new Date(cap.open_date).toLocaleDateString()}</p>
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
                <h2>VIP ДОСТУП</h2>
              </div>
              <ul className="pro-list">
                <li>✨ Безлимитные капсулы</li>
                <li>📹 Прикрепление видео и фото</li>
                <li>🔒 Повышенная защита данных</li>
              </ul>
              <button onClick={handlePayment} className="pro-btn">КУПИТЬ ЗА 500 ⭐</button>
            </div>
          </div>
        )}
      </div>

      <nav className="bottom-nav">
        <button onClick={() => setActiveTab('create')} className={activeTab === 'create' ? 'active' : ''}>
          <span>➕</span> Создать
        </button>
        <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? 'active' : ''}>
          <span>📦</span> Архив
        </button>
        <button onClick={() => setActiveTab('pro')} className={activeTab === 'pro' ? 'active' : ''}>
          <span>⭐</span> PRO
        </button>
      </nav>
    </div>
  );
}
