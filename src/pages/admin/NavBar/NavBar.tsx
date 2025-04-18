import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./NavBar.module.scss"
import { ArrowTop, ListIcon } from "../../../components/svgs/adminSvgs"
import { RightArrow } from "../../../components/svgs/svgs"

interface MenuItem {
  id: string
  label: string
  active?: boolean
  route: string
}

interface MenuSection {
  id: string
  title: string
  expanded: boolean
  items: MenuItem[]
}

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sections, setSections] = useState<MenuSection[]>([
    {
      id: "general",
      title: "Общие",
      expanded: true,
      items: [
        { id: "news", label: "Новостник", active: true, route: "/panel/news" },
        { id: "prices", label: "Цены", route: "/panel/prices" },
        { id: "add-admins", label: "Добавление админов", route: "/panel/add-admins" },
        { id: "loyalty", label: "Лояльность", route: "/panel/loyalty" },
        { id: "transaction-history", label: "История транзакций", route: "/panel/transaction-history" },
        { id: "blacklist", label: "Черный список", route: "/panel/blacklist" },
      ],
    },
    {
      id: "games",
      title: "Игры в мейне",
      expanded: false,
      items: [
        { id: "games-in-sections", label: "Игры в разделах", route: "/panel/games-in-sections" },
        { id: "donate", label: "Донат", route: "/panel/donate" }
      ],
    },
  ])

  useEffect(() => {
    setSections(prevSections => 
      prevSections.map(section => {
        const hasActiveItem = section.items.some(item => location.pathname === item.route);
        
        return {
          ...section,
          expanded: hasActiveItem ? true : section.expanded,
          items: section.items.map(item => ({
            ...item,
            active: location.pathname === item.route
          }))
        }
      })
    )
  }, [location.pathname])

  const toggleSection = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => (section.id === sectionId ? { ...section, expanded: !section.expanded } : section)),
    )
  }

  const setActiveItem = (sectionId: string, itemId: string, route: string) => {
    navigate(route)
  }

  return (
    <div className={styles.navbar}>
      {sections.map((section) => (
        <div key={section.id} className={styles.section}>
          <div className={styles.header} onClick={() => toggleSection(section.id)}>
            <span className={styles.dot}><ListIcon /></span>
            <span className={styles.title}>{section.title}</span>
            <span className={`${styles.arrow} ${section.expanded ? styles.expanded : ""}`}><ArrowTop /></span>
          </div>
          <div className={`${styles.content} ${section.expanded ? styles.expanded : ""}`}>
            {section.items.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.item} ${item.active ? styles.active : ""}`}
                onClick={() => setActiveItem(section.id, item.id, item.route)}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Navbar
