"use client"

import type React from "react"
import { useState, useEffect } from "react"
import styles from "./AddAdmin.module.scss"

interface AdminModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (login: string, password: string, role: string) => void
    isEdit?: boolean
    initialData?: {
      login?: string
      password?: string
      role?: string
    }
}

const initialAddState = {
  login: "",
  password: "",
  role: "",
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onSubmit, isEdit = false, initialData = {} }) => {
  const [addFormData, setAddFormData] = useState(initialAddState)
  const [editFormData, setEditFormData] = useState({
    login: initialData.login || "",
    password: initialData.password || "",
    role: initialData.role || "",
  })

  // Обновляем данные формы редактирования только при изменении initialData
  useEffect(() => {
    if (isEdit && initialData) {
      const newData = {
        login: initialData.login || "",
        password: initialData.password || "",
        role: initialData.role || "",
      }
      
      // Проверяем, действительно ли данные изменились
      if (JSON.stringify(newData) !== JSON.stringify(editFormData)) {
        setEditFormData(newData)
      }
    }
  }, [isEdit, initialData.login, initialData.password, initialData.role])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const dataToSubmit = isEdit ? editFormData : addFormData
    onSubmit(dataToSubmit.login, dataToSubmit.password, dataToSubmit.role)
    
    if (!isEdit) {
      setAddFormData(initialAddState)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (isEdit) {
      setEditFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    } else {
      setAddFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const currentData = isEdit ? editFormData : addFormData

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? "Редактировать админа" : "Добавить админа"}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Логин</label>
            <input
              type="text"
              name="login"
              value={currentData.login}
              onChange={handleChange}
              placeholder="admin"
              disabled={isEdit}
              required={!isEdit}
            />
          </div>

          <div className={styles.field}>
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={currentData.password}
              onChange={handleChange}
              placeholder="adminadmin"
              disabled={isEdit}
              required={!isEdit}
            />
          </div>

          <div className={styles.field}>
            <label>Роль</label>
            <select 
              name="role" 
              value={currentData.role} 
              onChange={handleChange}
              required
            >
              <option value="">Выберите роль</option>
              <option value="admin">Администратор</option>
              <option value="moderator">Модератор</option>
              <option value="user">Пользователь</option>
            </select>
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton}>
              {isEdit ? "Изменить" : "Добавить"}
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

export default AdminModal