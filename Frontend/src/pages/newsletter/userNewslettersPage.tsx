import { useEffect, useState } from "react";
import NewsletterItem, { newsletterProps } from "../../components/NewsletterItem";
import api from "../../services/api";

import "../../styles/newsletter/userNewsletters.css"

export function UserNewslettersPage() {
  const [newsletters, setNewsletters] = useState<newsletterProps[]>([]);

  async function getUserNewsletters() {
    const newsletters = await api.get("get_my_newsletters", {
      withCredentials: true,
    });
    setNewsletters(newsletters.data);
  }

  function updateNewsletterList (newsletterId: number): void {
    setNewsletters(newsletters.filter((value) => value.id !== newsletterId));
  }

  useEffect(() => {
    getUserNewsletters();
  }, [])

  return (
    <div className="container-user-newsletters">
      {newsletters.map((newsletter) => {
        return <NewsletterItem key={newsletter.id} newsletter={newsletter} userItem={true} callbackUpdate={updateNewsletterList} />
      })}
    </div>
  )
}