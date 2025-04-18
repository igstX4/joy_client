"use client"

import type React from "react"
import { useState } from "react"
import styles from "./Modal.module.scss"

interface ActionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { chatId: string; amount: string }) => void
  type: "add-joy" | "remove-joy" | "add-joy-plus" | "remove-joy-plus"
}

const getTitleByType = (type: ActionModalProps["type"]) => {
  switch (type) {
    case "add-joy":
      return "Добавить Joy"
    case "remove-joy":
      return "Убрать Joy"
    case "add-joy-plus":
      return "Добавить Joy+"
    case "remove-joy-plus":
      return "Убрать Joy+"
    default:
      return ""
  }
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, onSubmit, type }) => {
  const [formData, setFormData] = useState({
    chatId: "",
    amount: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ chatId: "", amount: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{getTitleByType(type)}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Chat ID</label>
            <input type="text" name="chatId" value={formData.chatId} onChange={handleChange} placeholder="123331230" />
          </div>

          <div className={styles.field}>
            <label>Введите количество</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Введите количество"
            />
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton}>
              {type.startsWith("add") ? "Добавить" : "Убрать"}
            </button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ActionModal

