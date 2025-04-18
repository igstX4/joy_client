"use client"

import type React from "react"
import { useState, useEffect } from "react"
import styles from "./AddBlackList.module.scss"

interface BlacklistModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { chatId: string; reason: string }) => void
  initialData?: { chatId: string; reason: string } | null
}

const BlacklistModal: React.FC<BlacklistModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    chatId: "",
    reason: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        chatId: "",
        reason: "",
      })
    }
  }, [initialData])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ chatId: "", reason: "" })
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
        <h2>Добавить в ЧС</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Chat ID</label>
            <input
              type="text"
              name="chatId"
              value={formData.chatId}
              onChange={handleChange}
              placeholder="123331230"
              disabled={!!initialData}
            />
          </div>

          <div className={styles.field}>
            <label>Введите причину</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Введите причину"
            />
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton}>
              {initialData ? "Сохранить" : "Добавить"}
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

export default BlacklistModal

