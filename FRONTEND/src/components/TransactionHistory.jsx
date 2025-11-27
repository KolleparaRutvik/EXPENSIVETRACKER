function TransactionHistory({ transactions }) {
  return (
    <div className="history-container">
      
      <div className="transactions-list">
        {transactions.map(transaction => (
          <div 
            key={transaction.id} 
            className={`transaction-item ${transaction.type}`}
          >
            <span>{transaction.date}</span>
            <span>{transaction.description}</span>
            <span className="amount">
              {transaction.type === 'income' ? '+' : '-'}
              ${transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionHistory
