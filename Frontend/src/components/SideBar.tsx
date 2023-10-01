import { AiFillCloseCircle, AiFillHome, AiFillSetting } from "react-icons/ai"

import "../styles/sidebar.css"
import { IoNewspaperSharp } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"

type activeProps = {
  active: () => void
}

export function SideBar({ active }: activeProps) {
  return (
    <div className="sidebar-container">
      <AiFillCloseCircle onClick={active} className="close-button"/>
      <div className="sidebar-items">
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