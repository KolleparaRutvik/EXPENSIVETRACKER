import { useState } from 'react'

function IncomeForm({ onAddIncome }) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (amount && description) {
      onAddIncome(amount, description)
      setAmount('')
      setDescription('')
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
        <button type="submit">Add Income</button>
      </form>
    </div>
  )
}


export default IncomeForm
