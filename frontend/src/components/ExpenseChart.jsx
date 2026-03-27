import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#8b5cf6', '#10b981', '#f43f5e', '#f59e0b', '#3b82f6', '#ec4899', '#14b8a6'];

const ExpenseChart = ({ transactions }) => {
  // Group by category, ignore income
  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length === 0) return [];

    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});

    return Object.keys(grouped).map(key => ({
      name: key,
      value: grouped[key]
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (transactions.length === 0 || data.length === 0) {
    return (
      <div className="glass-panel animate-slide-up" style={{ height: '100%', minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <p className="text-muted" style={{ textAlign: 'center' }}>No expenses recorded yet. Add an expense to see your breakdown.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel animate-slide-up" style={{ padding: '1.5rem', height: '100%', minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Expense Breakdown</h3>
      <div style={{ flex: 1, minHeight: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="transparent"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `Rs ${Number(value).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
              contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
