import { useEffect, useState } from "react";
import "../../styles/newsletter/userSubscriptions.css"
import NewsletterItem, { newsletterProps } from "../../components/NewsletterItem";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export function UserSubscriptions() {
  const navigate = useNavigate();
  const [newsletters, setNewsletters] = useState<newsletterProps[]>([]);

  function getUserSubscriptionsNewsletters() {
    api.get("my_subscribed_newsletters", {
      withCredentials: true,
    })
    .then((response) => {
      setNewsletters(response.data);
    })
    .catch((error) => {
      if(error.response.status === 401) {
        localStorage.removeItem("logged");
        alert("Sua sessão expirou");
        navigate("/authentication/singin");
      }
    })
  }

  useEffect(() => {
    getUserSubscriptionsNewsletters();
  }, [])

  return (
    <div className="container-subscriptions-newsletters">
      {newsletters.length < 1 ?
      <>
        <h1 style={{marginBottom: "1rem"}}>Suas inscrições aparecerão aqui</h1>
        <h1>Pesquise e encontre as melhores newsletters</h1>
      </>
        :
        <></>
      }
      {newsletters.map((newsletter) => {
        return <NewsletterItem key={newsletter.id} newsletter={newsletter} callbackUpdate={getUserSubscriptionsNewsletters} />
      })}
    </div>
  )
}