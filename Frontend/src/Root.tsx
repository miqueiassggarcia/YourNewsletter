import { Outlet, useNavigate } from "react-router-dom"
import logo from "./images/logo.png"
import "./styles/header.css"
import "./styles/footer.css"

function Root() {
  const navigate = useNavigate();

  function navigateToSingin() {
    navigate("/authentication/singin")
  }

  function navigateToHome() {
    navigate("/")
  }

  return (
    <div className="container">
      <header className="app-header">
        <div className="app-name">
          <img src={logo} alt="yournewsletter icon" />
          <span onClick={navigateToHome}>Yournewsletter</span>
        </div>
        <div className="menu-items">
          <span onClick={navigateToSingin}>Login</span>
          <span>Suporte</span>
        </div>
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
