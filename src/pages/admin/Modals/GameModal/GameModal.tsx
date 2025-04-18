import type React from "react"
import { useState, useEffect } from "react"
import styles from "./GameModal.module.scss"

interface Game {
  id: string
  name: string
}

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (game: Game) => void
  isEditMode?: boolean
  initialGame?: Game | null
}

// Моковые данные для поиска
const mockGames: Game[] = [
  { id: "1", name: "Helldivers 1" },
  { id: "2", name: "Helldivers 2" },
  { id: "3", name: "Counter-Strike 2" },
  { id: "4", name: "Dota 2" },
  { id: "5", name: "PUBG" },
]

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, onSubmit, isEditMode = false, initialGame = null }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (initialGame) {
      setSelectedGame(initialGame)
      setSearchQuery(initialGame.name)
    } else {
      setSelectedGame(null)
      setSearchQuery("")
    }
    setShowResults(false)
  }, [initialGame])

  const filteredGames = mockGames.filter((game) => game.name.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedGame) {
      onSubmit(selectedGame)
      setSearchQuery("")
      setSelectedGame(null)
      setShowResults(false)
    }
  }

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game)
    setSearchQuery(game.name)
    setShowResults(false)
  }

  const handleSearchFocus = () => {
    setShowResults(true)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowResults(true)
    // Если поисковый запрос пустой или не соответствует выбранной игре, сбрасываем выбор
    if (
      e.target.value === "" ||
      (selectedGame && !selectedGame.name.toLowerCase().includes(e.target.value.toLowerCase()))
    ) {
      setSelectedGame(null)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{isEditMode ? "Редактировать игру" : "Добавить игру"}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              placeholder="Поиск"
              className={styles.searchInput}
            />
          </div>

          {showResults && searchQuery && (
            <div className={styles.searchResults}>
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className={`${styles.searchItem} ${selectedGame?.id === game.id ? styles.selected : ""}`}
                  onClick={() => handleGameSelect(game)}
                >
                  {game.name}
                </div>
              ))}
              {filteredGames.length === 0 && <div className={styles.noResults}>Ничего не найдено</div>}
            </div>
          )}

          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton} disabled={!selectedGame}>
              {isEditMode ? "Сохранить" : "Добавить"}
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

export default GameModal

