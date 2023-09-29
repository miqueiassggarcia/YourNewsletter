import { Outlet } from "react-router-dom"
import logo from "./images/logo.png"
import "./styles/header.css"
import "./styles/footer.css"

function Root() {
  return (
    <div className="container">
      <header className="app-header">
        <div className="app-name">
          <img src={logo} alt="yournewsletter icon" />
          <span>Yournewsletter</span>
        </div>
        <div className="menu-items">
          <a href="">Log in</a>
          <a href="">Suporte</a>
        </div>
      </header>
      <Outlet />
      <footer className="app-footer">
        <span>© 2023 Yournewsletter</span>
        <a href="">Suporte</a>
      </footer>
    </div>
  );
}

export default Root;
