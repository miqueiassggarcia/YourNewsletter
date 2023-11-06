import { useEffect, useState } from "react";
import { newsletterProps } from "../../components/NewsletterItem";
import api from "../../services/api";

import "../../styles/newsletter/userNewsletters.css"
import NewsletterUserItem from "../../components/NewsletterUserItem";

export function UserNewslettersPage() {
  const [newsletters, setNewsletters] = useState<newsletterProps[]>([]);

  async function getUserNewsletters() {
    const newsletters = await api.get("get_my_newsletters", {
      withCredentials: true,
    });
    setNewsletters(newsletters.data);
  }

  useEffect(() => {
    getUserNewsletters();
  }, [])

  return (
    <div className="container-user-newsletters">
      {newsletters.map((newsletter) => {
        return <NewsletterUserItem key={newsletter.id} newsletter={newsletter} userItem={true} callbackUpdate={getUserNewsletters} />
      })}
    </div>
  )
}