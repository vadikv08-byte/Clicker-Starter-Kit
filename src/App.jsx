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
  const [capsules, setCapsules] = useState([]);
  const [formData, setFormData] = useState({ receiver: '', date: '', message: '' });
  const [loading, setLoading] = useState(false);

  const userId = tg?.initDataUnsafe?.user?.id?.toString() || 'demo_user';

  // Загрузка писем из базы
  const fetchCapsules = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('capsules')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (!error) setCapsules(data);
    setLoading(false);
  };

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
    fetchCapsules();
  }, [userId]);

  const saveCapsule = async () => {
    if (!formData.receiver || !formData.date || !formData.message) {
      tg?.showAlert("Заполните все поля");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('capsules').insert([{
      user_id: userId,
      receiver: formData.receiver,
      open_date: formData.date,
      message: formData.message
    }]);

    if (error) {
      tg?.showAlert("Ошибка: " + error.message);
    } else {
      tg?.HapticFeedback?.impactOccurred('medium');
      // Очищаем форму и уходим в архив
      setFormData({ receiver: '', date: '', message: '' });
      await fetchCapsules(); // Обновляем список
      setActiveTab('archive'); 
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        
        {activeTab === 'create' && (
          <section className="fade-in">
            <h1 className="title">Создать</h1>
            <div className="glass-card">
              <label className="input-label">КОМУ ПОСЛАНИЕ</label>
              <input 
                value={formData.receiver} 
                onChange={e => setFormData({...formData, receiver: e.target.value})} 
                placeholder="@username или имя" 
              />
              
              <label className="input-label" style={{marginTop:'15px'}}>ГОД ОТКРЫТИЯ</label>
              <input 
                value={formData.date} 
                type="number"
                onChange={e => setFormData({...formData, date: e.target.value})} 
                placeholder="Напр: 2030" 
              />
              
              <label className="input-label" style={{marginTop:'15px'}}>ВАША ИСТОРИЯ</label>
              <textarea 
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})} 
                placeholder="Напишите послание в будущее..." 
                rows="5" 
              />
              
              <button onClick={saveCapsule} className="action-btn" disabled={loading}>
                {loading ? 'ЗАПЕЧАТЫВАЕМ...' : 'ЗАПЕЧАТАТЬ 🔒'}
              </button>
            </div>
          </section>
        )}

        {activeTab === 'archive' && (
          <section className="fade-in">
            <h1 className="title">Архив</h1>
            {capsules.length === 0 ? (
              <div className="glass-card center gray-text">
                <div style={{fontSize: '50px', marginBottom: '10px'}}>📦</div>
                <p>У вас пока нет запечатанных писем</p>
              </div>
            ) : (
              <div className="capsule-list">
                {capsules.map(item => (
                  <div key={item.id} className="glass-card capsule-item">
                    <div className="capsule-header">
                      <span className="status-badge">ЗАКРЫТО</span>
                      <span className="year-tag">{item.open_date}</span>
                    </div>
                    <div className="capsule-body">
                      <strong>Для: {item.receiver}</strong>
                      <p className="truncate">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'pro' && (
          <section className="fade-in">
            <h1 className="title">PREMIUM</h1>
            <div className="glass-card pro-card">
              <div className="pro-badge">VIP Доступ 💎</div>
              <ul className="pro-features">
                <li>✅ Хранение фото и видео</li>
                <li>✅ Передача по наследству</li>
                <li>✅ Срок хранения: 100 лет</li>
              </ul>
              <button className="pro-btn">УЛУЧШИТЬ ⭐</button>
            </div>
          </section>
        )}
      </div>

      <nav className="bottom-nav">
        <button className={activeTab === 'create' ? 'active' : ''} onClick={() => setActiveTab('create')}>
          <span className="nav-icon">➕</span>
          <small>Создать</small>
        </button>
        <button className={activeTab === 'archive' ? 'active' : ''} onClick={() => setActiveTab('archive')}>
          <span className="nav-icon">📦</span>
          <small>Архив</small>
        </button>
        <button className={activeTab === 'pro' ? 'active' : ''} onClick={() => setActiveTab('pro')}>
          <span className="nav-icon">⭐</span>
          <small>PRO</small>
        </button>
      </nav>
    </div>
  );
}
