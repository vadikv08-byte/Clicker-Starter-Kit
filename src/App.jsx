import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

const supabase = createClient(
  'https://ozkiafjaupilvtmtvkhr.supabase.co', 
  'sb_publishable_AtquiuoGJilSzhSFc_8llG_qcaxXb6f00e9095648834455883838383838383'
);
const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState('create'); // create, archive, pro
  const [receiver, setReceiver] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (tg) { tg.ready(); tg.expand(); } }, []);

  const saveCapsule = async () => {
    if (!receiver || !date || !message) { tg.showAlert("Заполните все поля"); return; }
    setLoading(true);
    const { error } = await supabase.from('capsules').insert([{ 
      user_id: tg?.initDataUnsafe?.user?.id?.toString() || '0', 
      receiver, open_date: date, message 
    }]);
    setLoading(true);
    if (error) tg.showAlert("Ошибка: " + error.message);
    else { tg.HapticFeedback.impactOccurred('medium'); tg.showAlert("Запечатано! 🔒"); setActiveTab('archive'); }
    setLoading(false);
  };

  return (
    <div className="app-container">
      {/* ВКЛАДКА: СОЗДАНИЕ */}
      {activeTab === 'create' && (
        <section>
          <h1 style={{fontSize: '24px', fontWeight: '800'}}>НОВАЯ КАПСУЛА</h1>
          <div className="glass-card">
            <label style={{fontSize: '11px', color: '#8E8E93'}}>КОМУ</label>
            <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="@username" />
            
            <label style={{fontSize: '11px', color: '#8E8E93', display: 'block', marginTop: '15px'}}>ГОД ОТКРЫТИЯ</label>
            <input value={date} onChange={e => setDate(e.target.value)} type="number" placeholder="2045" />
            
            <label style={{fontSize: '11px', color: '#8E8E93', display: 'block', marginTop: '15px'}}>ПОСЛАНИЕ</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Ваша история..." rows="4" />
            
            <button onClick={saveCapsule} className="action-btn">ЗАПЕЧАТАТЬ 🔒</button>
          </div>
        </section>
      )}

      {/* ВКЛАДКА: АРХИВ */}
      {activeTab === 'archive' && (
        <section>
          <h1 style={{fontSize: '24px', fontWeight: '800'}}>МОЙ АРХИВ</h1>
          <p style={{color: '#8E8E93'}}>Здесь будут ваши запечатанные капсулы...</p>
          <div className="glass-card" style={{textAlign: 'center', padding: '40px 20px'}}>
            <span style={{fontSize: '40px'}}>📁</span>
            <p>У вас пока нет активных капсул</p>
          </div>
        </section>
      )}

      {/* ВКЛАДКА: PRO (МОНЕТИЗАЦИЯ) */}
      {activeTab === 'pro' && (
        <section>
          <div className="premium-badge">PREMIUM ДОСТУП</div>
          <h1 style={{fontSize: '24px', fontWeight: '800', marginTop: '10px'}}>УЛУЧШИТЬ ХРАНИЛИЩЕ</h1>
          <div className="glass-card">
            <h3>Тариф "Вечность"</h3>
            <ul style={{paddingLeft: '20px', color: '#8E8E93'}}>
              <li>Хранение до 100 лет</li>
              <li>Прикрепление фото и видео</li>
              <li>Приоритетная доставка уведомлений</li>
            </ul>
            <button className="action-btn" style={{background: '#FFD700', color: 'black'}}>КУПИТЬ ЗА 50 ⭐</button>
          </div>
        </section>
      )}

      {/* НИЖНЯЯ НАВИГАЦИЯ */}
      <nav className="nav-bar">
        <div className={`nav-item ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')}>
          <div>➕</div><div>Создать</div>
        </div>
        <div className={`nav-item ${activeTab === 'archive' ? 'active' : ''}`} onClick={() => setActiveTab('archive')}>
          <div>📦</div><div>Архив</div>
        </div>
        <div className={`nav-item ${activeTab === 'pro' ? 'active' : ''}`} onClick={() => setActiveTab('pro')}>
          <div>⭐</div><div>PRO</div>
        </div>
      </nav>
    </div>
  );
}
