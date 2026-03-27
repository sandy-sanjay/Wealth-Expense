import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/transactions';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // On mount, load data from API
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      console.error('Error fetching:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...transaction,
          date: new Date().toISOString()
        }),
      });
      if (!response.ok) throw new Error('Failed to add transaction');
      const newTx = await response.json();
      setTransactions(prev => [newTx, ...prev]);
    } catch (err) {
      console.error('Error adding:', err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete transaction');
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  // Math totals calculation logic
  const totals = transactions.reduce((acc, curr) => {
    const amount = Number(curr.amount) || 0;
    if (curr.type === 'income') {
      acc.income += amount;
      acc.balance += amount;
    } else {
      acc.expense += amount;
      acc.balance -= amount;
    }
    return acc;
  }, { income: 0, expense: 0, balance: 0 });

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    totals,
    isLoading,
    error
  };
};
