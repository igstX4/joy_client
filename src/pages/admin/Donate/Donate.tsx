"use client"

import type React from "react"
import { useState } from "react"
import styles from "./Donate.module.scss"
import CollectionModal from "../Modals/DonateModal/DonateModal"

interface Collection {
  id: string
  name: string
  cover?: File
}

interface DonateItem {
  id: string
  name: string
  cover?: File
}

const initialCollections: Collection[] = [
  { id: "1", name: "FC25" },
  { id: "2", name: "Fortnite" },
  { id: "3", name: "NBA2K25" },
  { id: "4", name: "RDR GOLD" },
  { id: "5", name: "COD UC" },
]

const initialDonateItems: DonateItem[] = [
  { id: "1", name: "Донат 100 монет" },
  { id: "2", name: "Донат 500 монет" },
  { id: "3", name: "Донат 1000 монет" },
]

const Donate: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>(initialCollections)
  const [donateItems, setDonateItems] = useState<DonateItem[]>(initialDonateItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [selectedDonateItem, setSelectedDonateItem] = useState<DonateItem | null>(null)
  const [activeTab, setActiveTab] = useState<"collections" | "donate">("collections")

  const handleOpenAddModal = () => {
    if (activeTab === "collections") {
      setSelectedCollection(null)
    } else {
      setSelectedDonateItem(null)
    }
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (item: Collection | DonateItem) => {
    if (activeTab === "collections") {
      setSelectedCollection(item as Collection)
    } else {
      setSelectedDonateItem(item as DonateItem)
    }
    setIsModalOpen(true)
  }

  const handleDeleteCollection = (id: string) => {
    setCollections(collections.filter((collection) => collection.id !== id))
  }

  const handleDeleteDonate = (id: string) => {
    setDonateItems(donateItems.filter((item) => item.id !== id))
  }

  const handleSubmit = (data: { name: string; cover?: File }) => {
    if (activeTab === "collections") {
      if (selectedCollection) {
        // Редактирование коллекции
        setCollections(
          collections.map((collection) =>
            collection.id === selectedCollection.id ? { ...collection, ...data } : collection,
          ),
        )
      } else {
        // Добавление коллекции
        const newCollection: Collection = {
          id: `c${collections.length + 1}`,
          ...data,
        }
        setCollections([...collections, newCollection])
      }
    } else {
      if (selectedDonateItem) {
        // Редактирование доната
        setDonateItems(donateItems.map((item) => (item.id === selectedDonateItem.id ? { ...item, ...data } : item)))
      } else {
        // Добавление доната
        const newDonateItem: DonateItem = {
          id: `d${donateItems.length + 1}`,
          ...data,
        }
        setDonateItems([...donateItems, newDonateItem])
      }
    }
    setIsModalOpen(false)
    setSelectedCollection(null)
    setSelectedDonateItem(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCollection(null)
    setSelectedDonateItem(null)
  }

  const getModalTitle = () => {
    if (activeTab === "collections") {
      return selectedCollection ? "Редактировать подборку" : "Добавить подборку"
    } else {
      return selectedDonateItem ? "Редактировать донат" : "Добавить донат"
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "collections" ? styles.active : ""}`}
          onClick={() => setActiveTab("collections")}
        >
          Подборки
        </button>
        <button
          className={`${styles.tab} ${activeTab === "donate" ? styles.active : ""}`}
          onClick={() => setActiveTab("donate")}
        >
          Донат
        </button>
      </div>

      <button className={styles.addButton} onClick={handleOpenAddModal}>
        {activeTab === "collections" ? "Добавить подборку" : "Добавить донат"}
      </button>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Детали</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activeTab === "collections"
              ? collections.map((collection) => (
                  <tr key={collection.id}>
                    <td>{collection.name}</td>
                    <td>
                      <button className={styles.viewButton} onClick={() => handleOpenEditModal(collection)}>
                        Посмотреть
                        <span className={styles.arrow}>›</span>
                      </button>
                    </td>
                    <td>
                      <button className={styles.deleteButton} onClick={() => handleDeleteCollection(collection.id)}>
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))
              : donateItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <button className={styles.viewButton} onClick={() => handleOpenEditModal(item)}>
                        Посмотреть
                        <span className={styles.arrow}>›</span>
                      </button>
                    </td>
                    <td>
                      <button className={styles.deleteButton} onClick={() => handleDeleteDonate(item.id)}>
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <CollectionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={activeTab === "collections" ? selectedCollection : selectedDonateItem}
        title={getModalTitle()}
      />
    </div>
  )
}

export default Donate

