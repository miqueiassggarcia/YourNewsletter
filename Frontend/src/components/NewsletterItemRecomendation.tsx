import { GoCrossReference } from "react-icons/go";

import "../styles/components/newsletterItem.css"
import { AiFillCheckCircle } from "react-icons/ai";
import api from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface newsletterRecomendationProps {
  id: number;
  userUsername: string;
  name: string;
  description: string;
  newsletter_subscribers: string;
}

interface newsletterRecomendationItemProps {
  newsletter: newsletterRecomendationProps;
  callbackSubscribe?: () => void;
}

const NewsletterRecomendationItem: React.FC<newsletterRecomendationItemProps> = ({newsletter, callbackSubscribe}) => {
  const navigate = useNavigate();
  const [unsubscribeDialogOpen, setUnsubscribeDialogOpen] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    api.get(`check_newsletter_subscription/?id_newsletter=${newsletter.id}`, {
      withCredentials: true
    })
    .then((response) => {
      setIsSubscribed(response.data.message)
    })
    .catch((error) => {
      if(error.response.status === 401) {
        localStorage.removeItem("validate");
        alert("Sua sessão expirou");
        navigate("/authentication/singin");
      }
    })
  }, [newsletter.id]);

  function changeSubscription() {
    if(isSubscribed) {
      api.post("newsletter_unsubscribe",
        {
          "id_newsletter": newsletter.id,
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        if(callbackSubscribe) {
          callbackSubscribe()
        } else {
          setIsSubscribed(false);
        }
      })
      .catch((error) => {
        if(error.response.status === 401) {
          localStorage.removeItem("validate");
          alert("Sua sessão expirou");
          navigate("/authentication/singin");
        }
      })
      setIsSubscribed(false);
    } else {
      api.post("newsletter_subscribe",
        {
          "id_newsletter": newsletter.id,
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        setIsSubscribed(true);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          localStorage.removeItem("validate");
          alert("Sua sessão expirou");
          navigate("/authentication/singin");
        }
      })  
    }
  }

  return (
    <div className="newsletter-item-container">
      <div className="content-newsletter-item">
        <div className="header-newsletter-item">
          <h1 className="title-newsletter-item">{newsletter.name}</h1>
        </div>
        <p className="description-newsletter-item">{newsletter.description}</p>
      </div>
      <div className="newsletter-recomendation-content">
        <p>Número de incritos: {newsletter.newsletter_subscribers}</p>
        {isSubscribed ?
          <button type="button" className="subscribed-button-newsletter-item" onClick={() => setUnsubscribeDialogOpen(true)}>
            Inscrito
            <AiFillCheckCircle size={20} style={{marginLeft: ".4rem"}}/>
          </button>
          :
          <button type="button" className="subscribe-button-newsletter-item" onClick={changeSubscription}>
            Se increver
            <GoCrossReference size={20} style={{marginLeft: ".4rem"}}/>
          </button>
        }
        {unsubscribeDialogOpen &&
          <dialog className="unsubscribe-newsletter-dialog">
            <div className="unsubscribe-newsletter-dialog-content">
              <h1>Desinscrever da newsletter</h1>
              <div className="unsubscribe-newsletter-dialog-buttons">
                <button className="unsubscribe-button-newsletter-dialog" onClick={() => {changeSubscription(); setUnsubscribeDialogOpen(false)}}>Desinscrever</button>
                <button className="cancel-button-newsletter-dialog" onClick={() => {setUnsubscribeDialogOpen(false)}}>Cancelar</button>
              </div>
            </div>
          </dialog>
        }
      </div>
    </div>
  )
}

export default NewsletterRecomendationItem;