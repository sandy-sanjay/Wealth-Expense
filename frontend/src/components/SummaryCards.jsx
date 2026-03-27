import React from 'react';
import { formatCurrency } from '../utils/currency';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const SummaryCards = ({ totals }) => {
  return (
    <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
      
      <div className="glass-panel animate-slide-up" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', animationDelay: '0.1s' }}>
        <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: 'var(--income)' }}>
          <TrendingUp size={32} />
        </div>
        <div>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Total Income</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{formatCurrency(totals.income)}</h2>
        </div>
      </div>

      <div className="glass-panel animate-slide-up" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', animationDelay: '0.2s' }}>
        <div style={{ padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '12px', color: 'var(--expense)' }}>
          <TrendingDown size={32} />
        </div>
        <div>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Total Expenses</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{formatCurrency(totals.expense)}</h2>
        </div>
      </div>

      <div className="glass-panel animate-slide-up" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', animationDelay: '0.3s' }}>
        <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', color: 'var(--accent)' }}>
          <Wallet size={32} />
        </div>
        <div>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Net Balance</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: totals.balance < 0 ? 'var(--danger)' : 'inherit' }}>
            {formatCurrency(totals.balance)}
          </h2>
        </div>
      </div>

    </div>
  );
};

export default SummaryCards;
