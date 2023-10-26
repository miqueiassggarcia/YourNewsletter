import { useNavigate } from "react-router-dom"
import "../../styles/home/homePage.css"
import { useEffect } from "react";

export function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const validate = localStorage.getItem("validate");
    if(validate) {
      navigate("/home")
    }
  }, [navigate])

  function navigateToSingup() {
    navigate("/authentication/singup")
  }

  return (
    <div className="home-container">
      <div className="text-container">
        <div className="create-text">
          <h1>Crie a sua própria newsletter</h1>
          <span>Crie a sua própria newsletter para o seu negócio ou hobby pessoal, planeje o horário de envio, os conteúdos a serem enviados e muito mais!</span>
        </div>
        <div className="singup-text">
          <h1>Se increva em newsletters</h1>
          <span>Procure o que mais lhe agrada e comece já a receber as suas newsletters favoritas</span>
        </div>
      </div>
      <div className="button-container">
        <button onClick={navigateToSingup}>Se increver</button>
      </div>
    </div>
  )
}