

import type React from "react"
import { useState } from "react"
import styles from "./TransactionHistory.module.scss"

interface Transaction {
  chatId: string
  orderNumber: string
  product: string
  date: string
}

interface TransactionTableProps {
  filters?: {
    chatId?: string
    orderNumber?: string
  }
}

// Генерируем больше тестовых данных
const generateTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, (_, i) => ({
    chatId: `${11123123 + i}`,
    orderNumber: `EASCX-${231 + i}`,
    product: `${1000 + i * 100} JOY`,
    date: "01.01.2025",
  }))
}

const transactions: Transaction[] = generateTransactions(20)

const TransactionHistory: React.FC<TransactionTableProps> = () => {
  const [filters, setFilters] = useState({
    chatId: "",
    orderNumber: "",
  })

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchChatId = transaction.chatId.toLowerCase().includes(filters.chatId.toLowerCase())
    const matchOrderNumber = transaction.orderNumber.toLowerCase().includes(filters.orderNumber.toLowerCase())
    return matchChatId && matchOrderNumber
  })

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          name="chatId"
          placeholder="Chat ID"
          value={filters.chatId}
          onChange={handleFilterChange}
          className={styles.searchInput}
        />
        <input
          type="text"
          name="orderNumber"
          placeholder="Ном. Заказа"
          value={filters.orderNumber}
          onChange={handleFilterChange}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Chat ID</th>
              <th>Номер заказа</th>
              <th>Товар</th>
              <th>Дата и время</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.chatId}</td>
                <td>{transaction.orderNumber}</td>
                <td className={styles.productColumn}>{transaction.product}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionHistory

