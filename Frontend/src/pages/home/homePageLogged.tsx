import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      console.log(response.data)
    }).catch((error) => {
      if(error.response.status === 401) {
        localStorage.removeItem("validate");
        alert("Sua sessão expirou");
        navigate("/authentication/singin");
      }
    })
  }, [navigate])
  
  return (
    <div className="home-logged-container">
      {newsletterRecomendations.length > 0 ?
        <h1 style={{marginTop: "1rem", marginBottom: "1rem"}}>Encontre as melhores newsletter aqui</h1>  
        :
        <>
          <h1 style={{marginTop: "1rem", marginBottom: "1rem"}}>Ainda não temos nenhuma newsletter para lhe recomendar</h1>  
          <h1 style={{marginTop: "1rem", marginBottom: "1rem"}}>Acesse o menu lateral para procurar e criar suas próprias newsletter</h1>  
        </>
      }
      <div className="home-newsletter-recomendations">
        {
          newsletterRecomendations.map((newsletter) => {
            if (newsletter.name.length > 20) {
              newsletter.name = newsletter.name.replace(/(.{20})/g, '$1\n');
            }
            if (newsletter.description.length > 45) {
              newsletter.description = newsletter.description.replace(/(.{45})/g, '$1\n');
            }
            return <NewsletterRecomendationItem key={newsletter.id} newsletter={newsletter} callbackSubscribe={() => {}}/>
          })
        }
      </div>
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