import { ConfirmButton } from "../components/ConfirmButton";
import "../styles/homePageLogged.css"

export function HomePageLogged() {
  return (
    <div className="home-logged-container">
      <div className="new-newsletter-container">
        <h1>Crie uma nova newsletter</h1>
        <p>Crie a sua própria newsletter, definindo seus textos, horário e muito mais!</p>
        <ConfirmButton type="button">Criar newsletter</ConfirmButton>
      </div>
      <div className="subscribe-newsletter-container">
        <h1>Se increva na sua newsletter favorita</h1>
        <p>Procure o que mais lhe agrada e encontre as melhores newsletters para melhorar o seu dia!</p>
        <ConfirmButton type="button">Procurar agora</ConfirmButton>
      </div>
    </div>
  );
}