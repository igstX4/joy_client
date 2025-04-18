
import type React from "react"
import { useState } from "react"
import styles from "./News.module.scss"
import NewsModal from "../Modals/NewsModal/NewsModal"
interface TableItem {
  id: number
  name: string
  redirect: string
  cover?: File
}

const tableData: TableItem[] = [
  { id: 1, name: "Зимняя распродажа", redirect: "Ссылку" },
  { id: 2, name: "Розыгрыш", redirect: "Ссылку" },
  { id: 3, name: "Пример", redirect: "Ссылку" },
  { id: 4, name: "Пример", redirect: "Ссылку" },
  { id: 5, name: "Пример", redirect: "Ссылку" },
  { id: 6, name: "Летняя акция", redirect: "Ссылку" },
  { id: 7, name: "Черная пятница", redirect: "Ссылку" },
  { id: 8, name: "Киберпонедельник", redirect: "Ссылку" },
  { id: 9, name: "Новогодняя акция", redirect: "Ссылку" },
  { id: 10, name: "День рождения", redirect: "Ссылку" },
  { id: 11, name: "Пример", redirect: "Ссылку" },
  { id: 12, name: "Пример", redirect: "Ссылку" },
  { id: 13, name: "Пример", redirect: "Ссылку" },
  { id: 14, name: "Пример", redirect: "Ссылку" },
  { id: 15, name: "Пример", redirect: "Ссылку" },
]

const News: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TableItem | null>(null)
  const [items, setItems] = useState<TableItem[]>(tableData)

  const handleCreate = () => {
    setIsAddModalOpen(true)
  }

  const handleEdit = (item: TableItem) => {
    setEditingItem(item)
    setIsEditModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleAddSubmit = (formData: { title: string; link: string; cover?: File }) => {
    const newItem: TableItem = {
      id: items.length + 1,
      name: formData.title,
      redirect: formData.link,
      cover: formData.cover,
    }
    setItems([...items, newItem])
    setIsAddModalOpen(false)
  }

  const handleEditSubmit = (formData: { title: string; link: string; cover?: File }) => {
    if (!editingItem) return

    setItems(
      items.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: formData.title,
              redirect: formData.link,
              cover: formData.cover,
            }
          : item,
      ),
    )
    setIsEditModalOpen(false)
    setEditingItem(null)
  }

  return (
    <div className={styles.container}>
      <button className={styles.createButton} onClick={handleCreate}>
        Создать подборку
      </button>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Редирект на</th>
              <th>Детали</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.redirect}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.viewButton} onClick={() => handleEdit(item)}>
                      Посмотреть
                    </button>
                    <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewsModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddSubmit} />

      <NewsModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingItem(null)
        }}
        onSubmit={handleEditSubmit}
        initialData={
          editingItem
            ? {
                title: editingItem.name,
                link: editingItem.redirect,
                cover: editingItem.cover,
              }
            : undefined
        }
        isEdit
      />
    </div>
  )
}

export default News

