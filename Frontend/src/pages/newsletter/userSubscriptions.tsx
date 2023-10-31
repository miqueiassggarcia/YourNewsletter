import { useEffect, useState } from "react";
import "../../styles/newsletter/userSubscriptions.css"
import NewsletterItem, { newsletterProps } from "../../components/NewsletterItem";
import api from "../../services/api";

export function UserSubscriptions() {
  const [newsletters, setNewsletters] = useState<newsletterProps[]>([]);

  function getUserSubscriptionsNewsletters() {
    api.get("my_subscribed_newsletters", {
      withCredentials: true,
    })
    .then((response) => {
      setNewsletters(response.data);
    })
    .catch((error) => {
      alert(error);
    })
  }

  useEffect(() => {
    getUserSubscriptionsNewsletters();
  }, [])

  return (
    <div className="container-subscriptions-newsletters">
      {newsletters.map((newsletter) => {
        return <NewsletterItem key={newsletter.id} newsletter={newsletter} callbackUpdate={getUserSubscriptionsNewsletters} />
      })}
    </div>
  )
}