import { useEffect, useState } from "react";
import { newsletterProps } from "../../components/NewsletterItem";
import api from "../../services/api";

import "../../styles/newsletter/userNewsletters.css"
import NewsletterUserItem from "../../components/NewsletterUserItem";
import { AiOutlinePlus } from "react-icons/ai";

export function UserNewslettersPage() {
  const [newsletters, setNewsletters] = useState<newsletterProps[]>([]);
  const [postsIsOpen, setPostIsOpen] = useState<boolean>(false);
  const [newsletterSelectedId, setNewsletterSelectedId] = useState<number>();

  async function getUserNewsletters() {
    const newsletters = await api.get("get_my_newsletters", {
      withCredentials: true,
    });
    setNewsletters(newsletters.data);
  }

  const openPosts = (id: number) => {
    setPostIsOpen(true);
    setNewsletterSelectedId(id);
  }
  const closePosts = () => setPostIsOpen(false);

  useEffect(() => {
    getUserNewsletters();
  }, [])

  return (
    <div className="container-user-newsletters">
      {postsIsOpen ? 
      <>
        <button className="create-newsletter-post-button">
          Adicionar post
          <AiOutlinePlus size={25} className="create-newsletter-post-icon"/>
        </button>
        <p>{newsletterSelectedId}</p>
      </>
      :
      <>
        {newsletters.map((newsletter) => {
          return <NewsletterUserItem key={newsletter.id} newsletter={newsletter} callbackUpdate={getUserNewsletters} callbackOpenPost={openPosts} />
        })}
      </>
      }
    </div>
  )
}