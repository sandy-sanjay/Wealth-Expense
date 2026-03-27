import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const CATEGORIES = ['Salary', 'Food', 'Rent', 'Utilities', 'Entertainment', 'Shopping', 'Other'];

const TransactionForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    const numericAmount = Number(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }
    
    if (numericAmount > 1000000000000) {
      setError('Amount exceeds maximum allowed limit (Rs 1,000 Billion)');
      return;
    }

    onAdd({
      title: title.trim(),
      amount: numericAmount,
      type,
      category,
    });

    // Reset form
    setTitle('');
    setAmount('');
  };

  return (
    <div className="glass-panel animate-slide-up" style={{ padding: '1.5rem', height: '100%' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add Transaction</h3>
      
      {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.875rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Title</label>
          <input 
            type="text" 
            className="input-control" 
            placeholder="e.g., Monthly Rent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Amount (Rs)</label>
          <input 
            type="number" 
            step="0.01"
            className="input-control" 
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Type</label>
          <select 
            className="input-control"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              // auto switch category if type changes and current cat doesn't match roughly
              if (e.target.value === 'income') setCategory('Salary');
              if (e.target.value === 'expense' && category === 'Salary') setCategory('Food');
            }}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="input-group">
          <label>Category</label>
          <select 
            className="input-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {type === 'income' ? (
              <>
                <option value="Salary">Salary</option>
                <option value="Investments">Investments</option>
                <option value="Gift">Gift</option>
                <option value="Other">Other</option>
              </>
            ) : CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
          <PlusCircle size={20} /> Add new record
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
