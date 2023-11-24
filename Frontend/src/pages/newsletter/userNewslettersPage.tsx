import { useEffect, useState } from "react";
import { newsletterProps } from "../../components/NewsletterItem";
import api from "../../services/api";

import "../../styles/newsletter/userNewsletters.css"
import NewsletterUserItem from "../../components/NewsletterUserItem";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import { JSONTemplate } from "state/types/index";

export interface postCacheProps {
  newsletter_id?: number,
  data?: JSONTemplate
}

export function UserNewslettersPage() {
  const navigate = useNavigate();
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

  function setStateOfTheCurrentPost() {
    let postData: postCacheProps = {
      "newsletter_id": newsletterSelectedId,
      // "data": 
    }
    localStorage.setItem("Newsletter", JSON.stringify(postData));
    console.log(JSON.parse(localStorage.getItem("Newsletter")!));
  }

  return (
    <div className="container-user-newsletters">
      {postsIsOpen ? 
      <div className="create-newsletter-posts-container">
        <AiOutlineArrowLeft size={30} className="create-newsletter-posts-back-button" onClick={closePosts}/>
        <button className="create-newsletter-posts-button" onClick={() => {setStateOfTheCurrentPost(); navigate("/create-newsletter-post")}}>
          Adicionar post
          <AiOutlinePlus size={25} className="create-newsletter-posts-icon"/>
        </button>
        <p>{newsletterSelectedId}</p>
      </div>
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