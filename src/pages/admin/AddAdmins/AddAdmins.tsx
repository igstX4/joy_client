

import type React from "react"
import { useState } from "react"
import styles from "./AddAdmins.module.scss"
import AdminModal from "../Modals/AddAdmin/AddAdmin"
interface Admin {
  id: number
  login: string
  password: string
  rights: string
}

const initialAdmins: Admin[] = [
  { id: 1, login: "adminadmin", password: "adminadminadmin", rights: "adminadminadmin" },
  { id: 2, login: "adminadmin", password: "adminadminadmin", rights: "adminadminadmin" },
  { id: 3, login: "adminadmin", password: "adminadminadmin", rights: "adminadminadmin" },
  { id: 4, login: "adminadmin", password: "adminadminadmin", rights: "adminadminadmin" },
  { id: 5, login: "adminadmin", password: "adminadminadmin", rights: "adminadminadmin" },
  { id: 6, login: "adminadmin", password: "adminadminadmin", rights: "adminadminadmin" },
  { id: 7, login: "adminadmin", password: "adminadminadmin", rights: "adminadminadmin" },
  { id: 8, login: "adminadmin", password: "adminadminadmin", rights: "adminadminadmin" },
  { id: 9, login: "adminadmin", password: "adminadminadmin", rights: "adminadminadmin" },
  { id: 10, login: "adminadmin", password: "adminadminadmin", rights: "adminadminadmin" },
]

const AddAdmin: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)

  const handleView = (admin: Admin) => {
    setSelectedAdmin(admin)
    setIsEditModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id))
  }

  const handleAddAdmin = (login: string, password: string, role: string) => {
    const newAdmin: Admin = {
      id: admins.length + 1,
      login,
      password,
      rights: role,
    }
    setAdmins([...admins, newAdmin])
    setIsAddModalOpen(false)
  }

  const handleEditAdmin = (login: string, password: string, role: string) => {
    if (!selectedAdmin) return

    setAdmins(admins.map((admin) => (admin.id === selectedAdmin.id ? { ...admin, password, rights: role } : admin)))
    setIsEditModalOpen(false)
    setSelectedAdmin(null)
  }

  return (
    <div className={styles.container}>
      <button className={styles.createButton} onClick={() => setIsAddModalOpen(true)}>
        Добавить админа
      </button>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Логин</th>
              <th>Пароль</th>
              <th>Права</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.login}</td>
                <td>{admin.password}</td>
                <td>{admin.rights}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.viewButton} onClick={() => handleView(admin)}>
                      Посмотреть
                    </button>
                    <button className={styles.deleteButton} onClick={() => handleDelete(admin.id)}>
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddAdmin} />

      <AdminModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedAdmin(null)
        }}
        onSubmit={handleEditAdmin}
        isEdit
        initialData={
          selectedAdmin
            ? {
                login: selectedAdmin.login,
                password: selectedAdmin.password,
                role: selectedAdmin.rights,
              }
            : undefined
        }
      />
    </div>
  )
}

export default AddAdmin


