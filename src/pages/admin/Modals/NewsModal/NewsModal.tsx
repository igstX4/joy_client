import type React from "react"
import { useState } from "react"
import styles from "./NewsModal.module.scss"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormData) => void
  initialData?: FormData
  isEdit?: boolean
}

interface FormData {
  title: string
  link: string
  cover?: File
}

const NewsModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, initialData, isEdit = false }) => {
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || "",
    link: initialData?.link || "",
    cover: initialData?.cover,
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === "cover" && files) {
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

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{isEdit ? "Редактировать новость" : "Добавить новость"}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Название:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Зимняя распродажа"
            />
          </div>

          <div className={styles.field}>
            <label>Ссылка:</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://t.me/post/123031232"
            />
          </div>

          <div className={styles.field}>
            <label>Обложка:</label>
            <input type="file" name="cover" onChange={handleChange} accept="image/*" />
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

export default NewsModal

