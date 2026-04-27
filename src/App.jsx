import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PlusCircle, Archive, Star } from 'lucide-react';
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

  useEffect(() => { if (tg) { tg.ready(); tg.expand(); } }, []);

  const saveCapsule = async () => {
    if (!receiver || !date || !message) { tg.showAlert("Заполните все поля"); return; }
    setLoading(true);
    const { error } = await supabase.from('capsules').insert([{ 
      user_id: tg?.initDataUnsafe?.user?.id?.toString() || '0', 
      receiver, open_date: date, message 
    }]);
    if (error) tg.showAlert("Ошибка: " + error.message);
    else { tg.HapticFeedback.impactOccurred('medium'); tg.showAlert("Запечатано! 🔒"); setActiveTab('archive'); }
    setLoading(false);
  };

  return (
    <div className="app-container">
      {activeTab === 'create' && (
        <section>
          <h1 style={{fontSize: '28px', fontWeight: '800'}}>Создать</h1>
          <div className="glass-card">
            <label style={{color: '#8e8e93', fontSize: '12px'}}>КОМУ</label>
            <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="@username" />
            <label style={{color: '#8e8e93', fontSize: '12px', display:'block', marginTop:'15px'}}>ГОД ОТКРЫТИЯ</label>
            <input value={date} onChange={e => setDate(e.target.value)} type="number" placeholder="2045" />
            <label style={{color: '#8e8e93', fontSize: '12px', display:'block', marginTop:'15px'}}>ПОСЛАНИЕ</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Ваша история..." rows="5" />
            <button onClick={saveCapsule} className="action-btn">{loading ? 'Загрузка...' : 'ЗАПЕЧАТАТЬ'}</button>
          </div>
        </section>
      )}

      {activeTab === 'archive' && (
        <section>
          <h1 style={{fontSize: '28px', fontWeight: '800'}}>Архив</h1>
          <div className="glass-card" style={{textAlign: 'center', padding: '50px 20px'}}>
            <Archive size={48} color="#8e8e93" style={{marginBottom: '15px'}}/>
            <p style={{color: '#8e8e93'}}>Ваш архив пока пуст</p>
          </div>
        </section>
      )}

      {activeTab === 'pro' && (
        <section>
          <h1 style={{fontSize: '28px', fontWeight: '800'}}>Premium</h1>
          <div className="glass-card">
            <h3 style={{color: '#FFD700'}}>Тариф "Вечность"</h3>
            <p style={{color: '#8e8e93', fontSize: '14px'}}>Хранение файлов до 100 лет и видео-послания.</p>
            <button className="action-btn" style={{background: '#FFD700', color: 'black'}}>КУПИТЬ ЗА 50 ⭐</button>
          </div>
        </section>
      )}

      <nav className="nav-bar">
        <div className={`nav-item ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')}>
          <PlusCircle size={24} /><span>Создать</span>
        </div>
        <div className={`nav-item ${activeTab === 'archive' ? 'active' : ''}`} onClick={() => setActiveTab('archive')}>
          <Archive size={24} /><span>Архив</span>
        </div>
        <div className={`nav-item ${activeTab === 'pro' ? 'active' : ''}`} onClick={() => setActiveTab('pro')}>
          <Star size={24} /><span>PRO</span>
        </div>
      </nav>
    </div>
  );
}
