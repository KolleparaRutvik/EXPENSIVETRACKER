import { useState, useEffect } from 'react'
import IncomeForm from './components/IncomeForm'
import ExpenseForm from './components/ExpenseForm'
import PieChartView from './components/PieChartView'
import TransactionHistory from './components/TransactionHistory'
import Summary from './components/Summary'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [transactions, setTransactions] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'))
    if (savedTransactions) {
      setTransactions(savedTransactions)
      setTotalIncome(savedTransactions.reduce((sum, t) => sum + t.amount, 0))
      setTotalExpenses(savedTransactions.reduce((sum, t) => sum + t.amount, 0))
    }
  }, [])

  const addIncome = (amount, description) => {
    const newTransaction = {
      id: Date.now(),
      type: 'income',
      amount: parseFloat(amount),
      description,
      date: new Date().toLocaleDateString()
    }
    setTransactions([...transactions, newTransaction])
    setTotalIncome(prev => prev + parseFloat(amount))
  }

  const addExpense = (amount, description, category) => {
    const newTransaction = {
      id: Date.now(),
      type: 'expense',
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toLocaleDateString()
    }
    setTransactions([...transactions, newTransaction])
    setTotalExpenses(prev => prev + parseFloat(amount))
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
