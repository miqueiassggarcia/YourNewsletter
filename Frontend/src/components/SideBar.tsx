import { AiFillCloseCircle, AiFillHome, AiFillSetting } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"
import { IoNewspaperSharp } from "react-icons/io5"
import { MdMarkEmailRead } from "react-icons/md"

import "../styles/components/sidebar.css"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

type activeProps = {
  active: () => void
}

export function SideBar({ active }: activeProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    await api.get("/logout")
    .then(() => {
      localStorage.removeItem("validate");
      active()
      navigate("/")
    })
    .catch((error) => {
      if(error.response.status === 401) {
        localStorage.removeItem("validate");
        alert("Sua sessão expirou");
        navigate("/authentication/singin");
      }
    })
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar-items">
        <div className="sidebar-buttons">
          <div className="logout" onClick={handleLogout}>
          <BiLogOut className="logout-button" size={25}/>
          <span>Logout</span>
          </div>
          <AiFillCloseCircle onClick={active} className="close-button" size={25}/>
        </div>
        <div className="items-elements" onClick={() => {active(); navigate("/home")}}>
          <span>Home</span>
          <AiFillHome className="sidebar-items-icons" size={25}/>
        </div>
        <div className="items-elements" onClick={() => {active();  navigate("/user-subscriptions")}}>
          <span>Inscrições</span>
          <MdMarkEmailRead className="sidebar-items-icons" size={25}/>
        </div>
        <div className="items-elements" onClick={() => {active(); navigate("/user-newsletters")}}>
          <span>Newsletters</span>
          <IoNewspaperSharp className="sidebar-items-icons" size={25}/>
        </div>
        <div className="items-elements" onClick={() => {active(); navigate("/configuration")}}>
          <span>Configurações</span>
          <AiFillSetting className="sidebar-items-icons" size={25}/>
        </div>
      </div>
    </div>
  )
}