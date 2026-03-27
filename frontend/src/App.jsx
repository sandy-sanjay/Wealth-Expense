import React from 'react';
import './App.css';
import { useTransactions } from './hooks/useTransactions';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';

function App() {
  const { transactions, addTransaction, deleteTransaction, totals } = useTransactions();

  return (
    <div className="app-container">
      <header className="animate-fade-in">
        <h1>Wealth & Expense</h1>
        <p>Your personal finance command center.</p>
      </header>
      
      <SummaryCards totals={totals} />

      <main className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div>
          <TransactionForm onAdd={addTransaction} />
        </div>
        <div>
          <ExpenseChart transactions={transactions} />
        </div>
      </main>

      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <TransactionList 
          transactions={transactions} 
          onDelete={deleteTransaction} 
        />
      </div>
    </div>
  );
}

export default App;
