"use client"

import type React from "react"
import { useState } from "react"
import styles from './GamesInSection.module.scss'
import GameModal from "../Modals/GameModal/GameModal"

interface Game {
  id: string
  name: string
}

// Моковые данные для списка игр
const initialGames: Game[] = [
  { id: "1", name: "Helldivers 1" },
  { id: "2", name: "Helldivers 2" },
]

const GamesInSection: React.FC = () => {
  const [games, setGames] = useState<Game[]>(initialGames)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [selectedSection, setSelectedSection] = useState("")

  const handleOpenAddModal = () => {
    setIsEditMode(false)
    setSelectedGame(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (game: Game) => {
    setIsEditMode(true)
    setSelectedGame(game)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setGames(games.filter((game) => game.id !== id))
  }

  const handleSubmit = (game: Game) => {
    if (isEditMode) {
      // Обновляем существующую игру или заменяем на новую
      setGames(games.map((g) => (g.id === selectedGame?.id ? game : g)))
    } else {
      // Добавляем новую игру
      // Проверяем, не существует ли уже игра с таким id
      if (!games.some((g) => g.id === game.id)) {
        setGames([...games, game])
      }
    }
    setIsModalOpen(false)
    setSelectedGame(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <select
          className={styles.sectionSelect}
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="" disabled>
            Выбрать раздел
          </option>
          <option value="section1">Раздел 1</option>
          <option value="section2">Раздел 2</option>
          <option value="section3">Раздел 3</option>
        </select>

        <button className={styles.addButton} onClick={handleOpenAddModal}>
          Добавить игру
        </button>
      </div>

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
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.name}</td>
                <td>
                  <button className={styles.viewButton} onClick={() => handleOpenEditModal(game)}>
                    Посмотреть
                    <span className={styles.arrow}>›</span>
                  </button>
                </td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleDelete(game.id)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GameModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedGame(null)
        }}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        initialGame={selectedGame}
      />
    </div>
  )
}

export default GamesInSection

