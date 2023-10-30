import { GoCrossReference } from "react-icons/go";

import "../styles/components/newsletterItem.css"
import { AiFillCheckCircle } from "react-icons/ai";
import api from "../services/api";
import { useState } from "react";

export interface newsletterProps {
  id: number;
  userUsername: string;
  name: string;
  description: string;
}

interface newsletterItemProps {
  newsletter: newsletterProps;
  callbackUpdate?: () => void;
}

const NewsletterItem: React.FC<newsletterItemProps> = ({newsletter, callbackUpdate}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

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
        setIsSubscribed(false);
      })
      .catch((error) => {
        alert(error);
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
        alert(error);
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
      {isSubscribed ?
        <button type="button" className="subscribed-button-newsletter-item" onClick={changeSubscription}>
          Inscrito
          <AiFillCheckCircle size={20} style={{marginLeft: ".4rem"}}/>
        </button>
        :
        <button type="button" className="subscribe-button-newsletter-item" onClick={changeSubscription}>
          Se increver
          <GoCrossReference size={20} style={{marginLeft: ".4rem"}}/>
        </button>
      }
    </div>
  )
}

export default NewsletterItem;