import { useEffect, useState } from "react";
import "../../styles/newsletter/userSubscriptions.css"
import NewsletterItem, { newsletterProps } from "../../components/NewsletterItem";
import api from "../../services/api";

export function UserSubscriptions() {
  const [newsletters, setNewsletters] = useState<newsletterProps[]>([]);
  const [unsubscribeDialogOpen, setUnsubscribeDialogOpen] = useState<boolean>(true);

  async function getUserSubscriptionsNewsletters() {
    // const newsletters = await api.get("get_my_subscriptions", {
    //   withCredentials: true,
    // });
    // setNewsletters(newsletters.data);
    setNewsletters(
      [
        {
            "id": 5,
            "userUsername": "miqueias",
            "name": "Minha newsletter sobre programação",
            "description": "Nessa newsletter irei falar sobre diversos assuntos da programação no geral"
        },
        {
            "id": 6,
            "userUsername": "miqueias",
            "name": "Minha newsletter sobre programação",
            "description": "Nessa newsletter irei falar sobre diversos assuntos da programação no geral"
        },
        {
            "id": 7,
            "userUsername": "miqueias",
            "name": "Minha newsletter sobre programação",
            "description": "Nessa newsletter irei falar sobre diversos assuntos da programação no geral"
        }
      ]
    )
  }

  useEffect(() => {
    getUserSubscriptionsNewsletters();
  }, [])

  return (
    <div className="container-subscriptions-newsletters">
      {newsletters.map((newsletter) => {
        return <NewsletterItem key={newsletter.id} newsletter={newsletter} callbackUpdate={getUserSubscriptionsNewsletters} />
      })}
      {unsubscribeDialogOpen &&
          <dialog className="unsubscribe-newsletter-dialog">
            <div className="unsubscribe-newsletter-dialog-content">
              <h1>Desinscrever da newsletter</h1>
              <div className="unsubscribe-newsletter-dialog-buttons">
                <button className="unsubscribe-button-newsletter-dialog" onClick={() => {setUnsubscribeDialogOpen(false)}}>Desinscrever</button>
                <button className="cancel-button-newsletter-dialog" onClick={() => {setUnsubscribeDialogOpen(false)}}>Cancelar</button>
              </div>
            </div>
          </dialog>
        }
    </div>
  )
}