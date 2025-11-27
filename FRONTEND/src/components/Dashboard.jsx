import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import PieChartView from './PieChartView';
import TransactionHistory from './TransactionHistory';
import Summary from './Summary';

function Dashboard() {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const addIncome = (amount, description) => {
    const newTransaction = {
      id: Date.now(),
      type: 'income',
      amount: parseFloat(amount),
      description,
      date: new Date().toLocaleDateString()
    };
    setTransactions(prev => [...prev, newTransaction]);
    setTotalIncome(prev => prev + parseFloat(amount));
  };

  const addExpense = (amount, description, category) => {
    const newTransaction = {
      id: Date.now(),
      type: 'expense',
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toLocaleDateString()
    };
    setTransactions(prev => [...prev, newTransaction]);
    setTotalExpenses(prev => prev + parseFloat(amount));
  };

  const balance = totalIncome - totalExpenses;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Welcome{user?.name ? `, ${user.name}` : ''}</h1>
        </div>

        {/* show only balance at top */}
        <div className="header-balance" aria-live="polite">
          <div className="balance-label">Balance</div>
          <div className="balance-value">${balance.toFixed(2)}</div>
        </div>

        <div className="header-actions">
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="main-content">
        {/* forms (left column) */}
        <section className="forms-container" id="forms-area">
          <div className="form-container">
            <h2>Add Income</h2>
            <IncomeForm onAddIncome={addIncome} />
          </div>

          <div className="form-container">
            <h2>Add Expense</h2>
            <ExpenseForm onAddExpense={addExpense} />
          </div>
        </section>

        {/* chart (center column) */}
        <div className="chart-card card">
          <h2>Expense Distribution</h2>
          <PieChartView expenses={transactions.filter(t => t.type === 'expense')} />
        </div>

        {/* summary (right column top) */}
        <div className="summary-container card">
          <h2>Financial Summary</h2>
          <Summary totalIncome={totalIncome} totalExpenses={totalExpenses} />
        </div>

        {/* history (right column below summary) */}
        <aside className="history-container card">
          <h2>Transaction History</h2>
          <TransactionHistory transactions={transactions} />
        </aside>
      </main>

    </div>
  );
}

export default Dashboard;
