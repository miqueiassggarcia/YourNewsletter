import { Outlet, useNavigate } from "react-router-dom"
import logo from "./images/logo.png"
import "./styles/header.css"
import "./styles/footer.css"
import { FaBars } from "react-icons/fa"
import { useState } from "react"
import { SideBar } from "./components/SideBar"

function Root() {
  const [sideBar, setSideBar] = useState(true);

  const navigate = useNavigate();

  function navigateToSingin() {
    navigate("/authentication/singin")
  }

  function navigateToHome() {
    navigate("/")
  }

  function changeSideBar():void {
    setSideBar(!sideBar);
  }

  return (
    <div className="container">
      <header className="app-header">
        <div className="app-name">
          <img src={logo} alt="yournewsletter icon" />
          <span onClick={navigateToHome}>Yournewsletter</span>
        </div>
        {localStorage.getItem("user") ?
          <div className="menu-items">    
            {
              sideBar ?
              <SideBar active={changeSideBar} />:
              <FaBars style={{color: "white"}} onClick={changeSideBar}/>}
          </div>
          :
          <div className="menu-items">    
              <span onClick={navigateToSingin}>Login</span>
              <span>Suporte</span>
          </div>
        }
      </header>
      <Outlet />
      <footer className="app-footer">
        <span>© 2023 Yournewsletter</span>
        <span>Suporte</span>
      </footer>
    </div>
  );
}

export default Root;
