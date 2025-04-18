"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import styles from "./DonateModal.module.scss"

interface CollectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; cover?: File }) => void
  initialData?: { id?: string; name: string; cover?: File } | null
  title?: string
}

const CollectionModal: React.FC<CollectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  title = "Добавить подборку",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    cover: undefined as File | undefined,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        cover: initialData.cover,
      })
    } else {
      setFormData({
        name: "",
        cover: undefined,
      })
    }
  }, [initialData])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ name: "", cover: undefined })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === "cover" && files?.length) {
      setFormData((prev) => ({
        ...prev,
        cover: files[0],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleCoverClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Название</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите название"
            />
          </div>

          <div className={styles.field}>
            <label>Обложка</label>
            <div className={styles.coverUpload} onClick={handleCoverClick}>
              {formData.cover ? (
                <div className={styles.selectedFile}>{formData.cover.name}</div>
              ) : (
                <div className={styles.uploadPlaceholder}>Нажмите, чтобы загрузить</div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              name="cover"
              onChange={handleChange}
              accept="image/*"
              className={styles.hiddenInput}
            />
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton}>
              {initialData ? "Изменить" : "Добавить"}
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

export default CollectionModal
