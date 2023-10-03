import { AiFillCloseCircle, AiFillHome, AiFillSetting } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"
import { IoNewspaperSharp } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"

import "../styles/sidebar.css"
import api from "../services/api"

type activeProps = {
  active: () => void
}

export function SideBar({ active }: activeProps) {
  async function handleLogout() {
    await api.post("/logout")
    .then(() => {
      localStorage.removeItem("username")
      localStorage.removeItem("first_name")
      localStorage.removeItem("last_name")
      localStorage.removeItem("email")
      localStorage.removeItem("validate")
    })
    .catch((error) => {
      if(error.response.status === 401) {
        alert("Erro ao fazer logout, por favor, tente novamente")
      }
    })
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar-items">
        <div className="sidebar-buttons">
          <div className="logout" onClick={handleLogout}>
          <BiLogOut className="logout-button" size={25}/>
          <span>logout</span>
          </div>
          <AiFillCloseCircle onClick={active} className="close-button" size={25}/>
        </div>
        <div className="items-elements">
          <span>Home</span>
          <AiFillHome className="sidebar-items-icons" size={25}/>
        </div>
        <div className="items-elements">
          <span>Usuário</span>
          <FaUserCircle className="sidebar-items-icons" size={25}/>
        </div>
        <div className="items-elements">
          <span>Newsletters</span>
          <IoNewspaperSharp className="sidebar-items-icons" size={25}/>
        </div>
        <div className="items-elements">
          <span>Configurações</span>
          <AiFillSetting className="sidebar-items-icons" size={25}/>
        </div>
      </div>
    </div>
  )
}