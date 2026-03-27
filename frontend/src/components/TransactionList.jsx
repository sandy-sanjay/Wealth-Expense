import React from 'react';
import { formatCurrency } from '../utils/currency';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';

const TransactionList = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="glass-panel animate-slide-up" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>History Log</h3>
        <p className="text-muted">Get started by adding your first transaction!</p>
      </div>
    );
  }

  return (
    <div className="glass-panel animate-slide-up" style={{ padding: '1.5rem' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recent Transactions</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {transactions.map(t => (
          <div key={t.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            background: 'var(--card-bg)',
            borderRadius: '12px',
            border: '1px solid var(--card-border)',
            transition: 'background 0.2s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                padding: '0.75rem',
                borderRadius: '8px',
                background: t.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                color: t.type === 'income' ? 'var(--income)' : 'var(--expense)'
              }}>
                {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              </div>
              <div>
                <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{t.title}</h4>
                <span className="text-muted" style={{ fontSize: '0.875rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {t.category} 
                  <span style={{ fontSize: '0.6rem' }}>•</span>
                  {new Date(t.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{
                fontWeight: '700',
                color: t.type === 'income' ? 'var(--income)' : 'var(--text-main)',
                wordBreak: 'break-all',
                maxWidth: '200px',
                textAlign: 'right'
              }}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </span>
              <button 
                onClick={() => onDelete(t.id)}
                className="btn-icon danger"
                title="Delete transaction"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
