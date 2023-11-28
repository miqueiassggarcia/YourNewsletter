import { useEffect, useState } from "react";
import api from "../../services/api";

import "../../styles/share.css"
import { newsletterRecomendationProps } from "../../components/NewsletterItemRecomendation";
import { useNavigate } from "react-router-dom";
import { GoCrossReference } from "react-icons/go";
import { AiFillCheckCircle } from "react-icons/ai";

export default function SharePage() {
  const navigate = useNavigate();
  const [newsletter, setNewsletter] = useState<newsletterRecomendationProps>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>();

  useEffect(() => {
    if(newsletter) {
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
    }
  }, [newsletter, navigate]);

  useEffect(() => {
    let url = new URL(window.location.href);
    let idParam = url.searchParams.values().next().value;
    api.get(`get_newsletter_from_id/?id_newsletter=${idParam}`,
      {
        withCredentials: true
      }
    ).then((response) => {
      setNewsletter(response.data)
    }).catch((error) => {
      if(error.response.status === 401) {
        localStorage.removeItem("validate");
        alert("Sua sessão expirou");
        navigate("/authentication/singin");
      }
    })
  }, [navigate])

  function changeSubscription() {
    if(isSubscribed) {
      api.post("newsletter_unsubscribe",
        {
          "id_newsletter": newsletter?.id,
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        setIsSubscribed(false);
        newsletter!.subscribers_total = newsletter!.subscribers_total - 1;
      })
      .catch((error) => {
        if(error.response.status === 401) {
          localStorage.removeItem("validate");
          alert("Sua sessão expirou");
          navigate("/authentication/singin");
        }
      })
    } else {
      api.post("newsletter_subscribe",
        {
          "id_newsletter": newsletter?.id,
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        setIsSubscribed(true);
        newsletter!.subscribers_total = newsletter!.subscribers_total + 1;
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
    <div className="share-container">
        <div className="newsletter-data-share">
          <div>
            <h1 className="newsletter-title-share">{newsletter?.name}</h1>
            <p className="newsletter-description-share">{newsletter?.description}</p>
          </div>
          <div className="container-newsletter-data-share">
            <p className="subscribers-newsletter-share">{newsletter?.subscribers_total} {newsletter?.subscribers_total !== 1 ? "inscritos" : "inscrito"}</p>
            <p className="posts-newsletter-share">{newsletter?.posts_total} {newsletter?.posts_total !== 1 ? "posts" : "post"}</p>
          </div>
        </div>
        <div className="share-subscription">
          <h1 className="share-subscription-title">Garanta agora os conteúdos exclusivos dessa newsletter</h1>
          {isSubscribed ?
            <button type="button" className="share-subscription-button" onClick={changeSubscription} >
              Inscrito
              <AiFillCheckCircle size={20} style={{marginLeft: ".4rem"}}/>
            </button>
            :
            <button type="button" className="share-subscription-button" onClick={changeSubscription} >
              Se increver
              <GoCrossReference size={20} style={{marginLeft: ".4rem"}}/>
            </button>
          }
          <span className="back-home-share" onClick={() => navigate("/home")}>Voltar para home</span>
        </div>
    </div>
  );
}