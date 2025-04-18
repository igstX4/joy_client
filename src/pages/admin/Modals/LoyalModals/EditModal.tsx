"use client"

import type React from "react"
import { useState } from "react"
import styles from "./Modal.module.scss"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  type: "edit-joy" | "edit-joy-plus"
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSubmit, type }) => {
  const [formData, setFormData] = useState({
    percent: "",
    steps: {
      "100": "",
      "1000": "",
      "3000": "",
      "5000": "",
    },
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(type === "edit-joy" ? formData.steps : formData.percent)
    setFormData({
      percent: "",
      steps: {
        "100": "",
        "1000": "",
        "3000": "",
        "5000": "",
      },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (type === "edit-joy") {
      setFormData((prev) => ({
        ...prev,
        steps: {
          ...prev.steps,
          [name]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        percent: value,
      }))
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{type === "edit-joy" ? "Изменить Joy" : "Изменить Joy+"}</h2>

        <form onSubmit={handleSubmit}>
          {type === "edit-joy" ? (
            <>
              <h3 className={styles.subtitle}>Ступенчатый процент скидки:</h3>
              <div className={styles.stepsContainer}>
                <div className={styles.field}>
                  <label>От 100₽</label>
                  <input type="text" name="100" value={formData.steps["100"]} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                  <label>От 1000₽</label>
                  <input type="text" name="1000" value={formData.steps["1000"]} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                  <label>От 3000₽</label>
                  <input type="text" name="3000" value={formData.steps["3000"]} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                  <label>От 5000₽</label>
                  <input type="text" name="5000" value={formData.steps["5000"]} onChange={handleChange} />
                </div>
              </div>
            </>
          ) : (
            <div className={styles.field}>
              <label>Ступенчатый процент кэшбэка:</label>
              <input
                type="text"
                name="percent"
                value={formData.percent}
                onChange={handleChange}
                placeholder="Введите процент"
              />
            </div>
          )}

          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton}>
              Изменить
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

export default EditModal

