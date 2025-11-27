import { useState } from 'react'

function ExpenseForm({ onAddExpense }) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('other')

  const categories = ['Food', 'Transportation', 'Housing', 'Entertainment', 'Other']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (amount && description) {
      onAddExpense(amount, description, category)
      setAmount('')
      setDescription('')
      setCategory('other')
    }
  }

  return (
    <div className="form-container">
      
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat.toLowerCase()} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  )
}

export default ExpenseForm
