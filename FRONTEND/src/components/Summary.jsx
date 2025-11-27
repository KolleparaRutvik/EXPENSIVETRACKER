function Summary({ totalIncome, totalExpenses }) {
  const balance = totalIncome - totalExpenses

  return (
    <div className="summary-container">
      
      <div className="summary-items">
        <div className="summary-item">
          <span>Total Income:</span>
          <span className="income">${totalIncome}</span>
        </div>
        <div className="summary-item">
          <span>Total Expenses:</span>
          <span className="expense">${totalExpenses}</span>
        </div>
        <div className="summary-item">
          <span>Balance:</span>
          <span className={balance >= 0 ? 'income' : 'expense'}>
            ${balance}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Summary
