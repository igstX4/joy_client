

import type React from "react"
import { useState } from "react"
import styles from "./Blacklist.module.scss"
import BlacklistModal from "../Modals/AddBlackList/AddBlackList"

interface BlacklistItem {
  chatId: string
  reason: string
}

const initialBlacklist: BlacklistItem[] = [
  { chatId: "12314124", reason: "Причина блокировки" },
  { chatId: "12314334", reason: "Причина блокировки" },
  { chatId: "12317134", reason: "Причина блокировки" },
  { chatId: "15314134", reason: "Причина блокировки" },
  { chatId: "12311134", reason: "Причина блокировки" },
]

const Blacklist: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [blacklist, setBlacklist] = useState<BlacklistItem[]>(initialBlacklist)
  const [selectedItem, setSelectedItem] = useState<BlacklistItem | null>(null)

  const handleAdd = (data: BlacklistItem) => {
    setBlacklist([...blacklist, data])
    setIsModalOpen(false)
  }

  const handleView = (item: BlacklistItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = (chatId: string) => {
    setBlacklist(blacklist.filter((item) => item.chatId !== chatId))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Черный список</h1>
        <button
          className={styles.addButton}
          onClick={() => {
            setSelectedItem(null)
            setIsModalOpen(true)
          }}
        >
          Добавить в ЧС
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ChatID</th>
              <th>Причина</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {blacklist.map((item, index) => (
              <tr key={index}>
                <td>{item.chatId}</td>
                <td>
                  <button className={styles.viewButton} onClick={() => handleView(item)}>
                    Посмотреть
                  </button>
                </td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleDelete(item.chatId)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlacklistModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedItem(null)
        }}
        onSubmit={handleAdd}
        initialData={selectedItem}
      />
    </div>
  )
}

export default Blacklist

