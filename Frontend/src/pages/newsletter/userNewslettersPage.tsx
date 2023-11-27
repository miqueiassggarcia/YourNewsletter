import { useEffect, useState } from "react";
import { newsletterProps } from "../../components/NewsletterItem";
import api from "../../services/api";

import "../../styles/newsletter/userNewsletters.css"
import NewsletterUserItem from "../../components/NewsletterUserItem";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import NewsletterPosts, { newsletterPostProps } from "../../components/NewsletterPosts";
import FormCreatePost from "../../components/FormCreatePost";
import { useNavigate } from "react-router-dom";

export function UserNewslettersPage() {
  const navigate = useNavigate();
  const [newsletters, setNewsletters] = useState<newsletterProps[]>([]);
  const [postsIsOpen, setPostIsOpen] = useState<boolean>(false);
  const [createIsOpen, setCreateIsOpen] = useState<boolean>(false);
  const [newsletterSelectedId, setNewsletterSelectedId] = useState<number>(-1);
  const [newsletterPosts, setNewsletterPosts] = useState<newsletterPostProps[]>([]);

  function getUserNewsletters() {
    api.get("get_my_newsletters", {
      withCredentials: true,
    }).then((response) => {
      setNewsletters(response.data);
    }).catch((error) => {
      if(error.response.status === 401) {
        localStorage.removeItem("validate");
        alert("Sua sessão expirou");
        navigate("/authentication/singin");
      }
    })
  }

  useEffect(() => {
    getNewsletterPosts(newsletterSelectedId);
  }, [newsletterSelectedId])

  function getNewsletterPosts(id: number) {
    if(id !== -1) {
      api.get(`get_posts_from_newsletter/?id_newsletter=${id}`, {
        withCredentials: true,
      }).then((response) => {
        setNewsletterPosts(response.data);
      }).catch((error) => {
        if(error.response.status === 401) {
          localStorage.removeItem("validate");
          alert("Sua sessão expirou");
          navigate("/authentication/singin");
        }
      })
    }
  }
  
  useEffect(() => {
    getUserNewsletters();
  }, [])

  const openPosts = async (id: number) => {
    setPostIsOpen(true);
    setNewsletterSelectedId(id);
  }

  const closePosts = () => setPostIsOpen(false);

  const openCreatePost = () => {
    setCreateIsOpen(true);
  }
  const closeCreatePost = () => {
    setCreateIsOpen(false)
    getNewsletterPosts(newsletterSelectedId);
  };


  return (
    <div className="container-user-newsletters" style={createIsOpen ? {padding: 0}: {}}>
      {createIsOpen ?
        <>
          <FormCreatePost newsletter_id={newsletterSelectedId} callbackCloseForm={closeCreatePost} />
        </>
      :
        <>
          {postsIsOpen ? 
          <div className="create-newsletter-posts-container">
            <AiOutlineArrowLeft size={30} className="create-newsletter-posts-back-button" onClick={closePosts}/>
            <div className="list-newsletter-post">
              {
                <>
                  {newsletterPosts.map((newsletterPost) => {
                    return <NewsletterPosts key={newsletterPost.id} newsletterPost={newsletterPost} />
                  })}
                </>
              }
            </div>
            <button className="create-newsletter-posts-button" onClick={openCreatePost}>
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
        </>
      }
    </div>
  )
}