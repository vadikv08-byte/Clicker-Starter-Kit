<div className="glass-card">
  <div className="input-group">
    <label className="input-label">КОМУ ПОСЛАНИЕ</label>
    <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="@username" />
  </div>
  
  <div className="input-group">
    <label className="input-label">ДАТА И ВРЕМЯ ОТКРЫТИЯ</label>
    <input type="datetime-local" value={openDate} onChange={e => setOpenDate(e.target.value)} />
  </div>
  
  <div className="input-group">
    <label className="input-label">ВАША ИСТОРИЯ</label>
    <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Напишите что-то важное..." />
  </div>
  
  <button onClick={saveCapsule} className="action-btn" disabled={loading}>
    {loading ? 'СОХРАНЕНИЕ...' : 'ЗАПЕЧАТАТЬ 🔒'}
  </button>
</div>
