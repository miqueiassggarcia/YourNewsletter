import { useEffect, useState } from "react";
import { newsletterProps } from "../../components/NewsletterItem";
import api from "../../services/api";

import "../../styles/newsletter/userNewsletters.css"
import NewsletterUserItem from "../../components/NewsletterUserItem";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import NewsletterPosts, { newsletterPostProps } from "../../components/NewsletterPosts";

export function UserNewslettersPage() {
  const navigate = useNavigate();
  const [newsletters, setNewsletters] = useState<newsletterProps[]>([]);
  const [postsIsOpen, setPostIsOpen] = useState<boolean>(true);
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
    localStorage.setItem("NewsletterIdEdited", `${newsletterSelectedId}`);
  }

  const newsletterPostData:newsletterPostProps = {
    id: 1,
    newsletterId: 1,
    schedulingDate: new Date(1995, 11, 25, 20, 30, 0),
    // sendDate: new Date(2000, 11, 1, 9, 30, 0),
    send: false,
    subject: "Minha newsletter",
    html: "",
    style: ""
  }

  const newsletterPostData1:newsletterPostProps = {
    id: 1,
    newsletterId: 1,
    schedulingDate: new Date(1995, 11, 25, 20, 30, 0),
    sendDate: new Date(2000, 11, 1, 9, 30, 0),
    send: false,
    subject: "Minha newsletter",
    html: "",
    style: ""
  }

  return (
    <div className="container-user-newsletters">
      {postsIsOpen ? 
      <div className="create-newsletter-posts-container">
        <AiOutlineArrowLeft size={30} className="create-newsletter-posts-back-button" onClick={closePosts}/>
        <div className="list-newsletter-post">
          {
            <>
              <NewsletterPosts newsletterPost={newsletterPostData} callbackCreate={() => {}} />
              <NewsletterPosts newsletterPost={newsletterPostData1} callbackCreate={() => {}} />
              <NewsletterPosts newsletterPost={newsletterPostData1} callbackCreate={() => {}} />
            </>
          }
        </div>
        <button className="create-newsletter-posts-button" onClick={() => {setStateOfTheCurrentPost(); navigate("/create-newsletter-post")}}>
          Adicionar post
          <AiOutlinePlus size={25} className="create-newsletter-posts-icon"/>
        </button>
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