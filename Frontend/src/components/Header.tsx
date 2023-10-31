import { FaBars } from "react-icons/fa";
import { SideBar } from "./SideBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.png";

import "../styles/components/header.css"

export function Header() {
  const [sideBar, setSideBar] = useState(false);

  const navigate = useNavigate();

  function navigateToSingin() {
    navigate("/authentication/singin")
  }

  function navigateToHome() {
    navigate("/home")
  }

  function changeSideBar():void {
    setSideBar(!sideBar);
  }

  return (
    <header className="app-header">
        <div className="app-name">
          <img src={logo} alt="yournewsletter icon" />
          <span onClick={navigateToHome}>Yournewsletter</span>
        </div>
        {localStorage.getItem("validate") ?
          <div className="menu-items">    
            {
              sideBar ?
              <SideBar active={changeSideBar} />:
              <FaBars style={{color: "white"}} onClick={changeSideBar}/>}
          </div>
          :
          <div className="menu-items">    
              <span className="span-menu-items" onClick={navigateToSingin}>Login</span>
              <span className="span-menu-items">Suporte</span>
          </div>
        }
      </header>
  )
}