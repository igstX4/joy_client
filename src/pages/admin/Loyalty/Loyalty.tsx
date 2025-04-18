import type React from "react"
import { useState } from "react"
import styles from "./Loyalty.module.scss"
import ActionModal from "../Modals/LoyalModals/ActionModal"
import EditModal from "../Modals/LoyalModals/EditModal"

interface ModalState {
  type: "add-joy" | "remove-joy" | "add-joy-plus" | "remove-joy-plus" | "edit-joy" | "edit-joy-plus" | null
  isOpen: boolean
}

const Loyalty: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    isOpen: false,
  })

  const handleOpenModal = (type: ModalState["type"]) => {
    setModalState({ type, isOpen: true })
  }

  const handleCloseModal = () => {
    setModalState({ type: null, isOpen: false })
  }

  const handleSubmit = (data: any) => {
    console.log("Submitting:", modalState.type, data)
    handleCloseModal()
  }

  return (
    <div className={styles.pricesContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.section}>
          <h1>Лояльность</h1>

          <div className={styles.actionSection}>
            <h3>Действия</h3>
            <div className={styles.buttonGroup}>
              <button className={styles.addButton} onClick={() => handleOpenModal("add-joy")}>
                Добавить Joy
              </button>
              <button className={styles.addButton} onClick={() => handleOpenModal("add-joy-plus")}>
                Добавить Joy+
              </button>
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.removeButton} onClick={() => handleOpenModal("remove-joy")}>
                Убрать Joy
              </button>
              <button className={styles.removeButton} onClick={() => handleOpenModal("remove-joy-plus")}>
                Убрать Joy+
              </button>
            </div>
          </div>

          <div className={styles.percentSection}>
            <h3>Процентики</h3>
            <div className={styles.buttonGroup}>
              <button className={styles.editButton} onClick={() => handleOpenModal("edit-joy")}>
                Joy
              </button>
              <button className={styles.editButton} onClick={() => handleOpenModal("edit-joy-plus")}>
                Joy+
              </button>
            </div>
          </div>
        </div>
      </div>

      <ActionModal
        isOpen={
          modalState.isOpen &&
          ["add-joy", "remove-joy", "add-joy-plus", "remove-joy-plus"].includes(modalState.type || "")
        }
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        type={modalState.type as "add-joy" | "remove-joy" | "add-joy-plus" | "remove-joy-plus"}
      />

      <EditModal
        isOpen={modalState.isOpen && ["edit-joy", "edit-joy-plus"].includes(modalState.type || "")}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        type={modalState.type as "edit-joy" | "edit-joy-plus"}
      />
    </div>
  )
}

export default Loyalty

