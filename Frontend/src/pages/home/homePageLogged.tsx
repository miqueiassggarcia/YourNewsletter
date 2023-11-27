import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ConfirmButton } from "../../components/ConfirmButton";
import "../../styles/home/homePageLogged.css"
import api from "../../services/api";
import NewsletterRecomendationItem, { newsletterRecomendationProps } from "../../components/NewsletterItemRecomendation";

export function HomePageLogged() {
  const navigate = useNavigate();
  const [newsletterRecomendations, setNewsletterRecomendations] = useState<newsletterRecomendationProps[]>([]);

  useEffect(() => {
    const validate = localStorage.getItem("validate");
    if(!validate) {
      navigate("/")
    }
  }, [navigate])

  useEffect(() => {
    api.get("/get_newsletter_recommendations/?max_newsletters=10", 
    {
      withCredentials: true
    }).then((response) => {
      setNewsletterRecomendations(response.data)
    }).catch((error) => {
      alert(error)
    })
  }, [])

  function navigateToCreateNewsletter() {
    navigate("/create-newsletter")
  }

  function navigateToSeachNewsletter() {
    navigate("/search-newsletter")
  }
  
  return (
    <div className="home-logged-container">
      <h1>Encontre as melhores newsletter aqui</h1>
      {
        newsletterRecomendations.map((newsletter) => {
          return <NewsletterRecomendationItem key={newsletter.id} newsletter={newsletter} callbackSubscribe={() => {}}/>
        })
      }
    </div>
  );
}

// {/* <div className="new-newsletter-container">
//   <h1>Crie uma nova newsletter</h1>
//   <p>Crie a sua própria newsletter, definindo seus textos, horário e muito mais!</p>
//   <ConfirmButton type="button" onClick={navigateToCreateNewsletter} className="button-newsletter-container">Criar newsletter</ConfirmButton>
// </div>
// <div className="subscribe-newsletter-container">
//   <h1>Se increva na sua newsletter favorita</h1>
//   <p>Procure o que mais lhe agrada e encontre as melhores newsletters para melhorar o seu dia!</p>
//   <ConfirmButton type="button" onClick={navigateToSeachNewsletter} className="button-newsletter-container">Procurar agora</ConfirmButton>
// </div> */}