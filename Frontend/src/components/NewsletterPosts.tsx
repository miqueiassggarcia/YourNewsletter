import { MdDeleteForever, MdOutlineAccessTimeFilled, MdScheduleSend } from "react-icons/md";
import "../styles/components/newsletterPosts.css"
import { AiFillEdit } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";
import { FaCalendarDay } from "react-icons/fa";

export interface newsletterPostProps {
  id: number;
  newsletterId: number;
  schedulingDate: Date;
  sendDate?: Date;
  send: boolean;
  subject: string;
  html: string;
  style: string;
}

interface newsletterPostsProps {
  newsletterPost: newsletterPostProps;
  callbackCreate?: () => void;
}

interface dayNameProps {
  [key: number]: string
}

const NewsletterPosts: React.FC<newsletterPostsProps> = ({newsletterPost, callbackCreate}) => {
  function currentDayName():string {
    let dayName: dayNameProps = {
      0: "Domingo",
      1: "Segunda",
      2: "Terça",
      3: "Quarta",
      4: "Quinta",
      5: "Sexta",
      6: "Sábado"
    }

    if(newsletterPost.sendDate) {
      return dayName[newsletterPost.sendDate.getDay()];
    } else {
      return dayName[newsletterPost.schedulingDate.getDay()];
    }
  }

  function getTime() {
    if(newsletterPost.sendDate) {
      return `${newsletterPost.sendDate.getHours()}:${newsletterPost.sendDate.getMinutes()}:${newsletterPost.sendDate.getSeconds()}`
    } else {
      return `${newsletterPost.schedulingDate.getHours()}:${newsletterPost.schedulingDate.getMinutes()}:${newsletterPost.schedulingDate.getSeconds()}`
    }
  }

  function getDate() {
    if(newsletterPost.sendDate) {
      return `${newsletterPost.sendDate.getDate()}/${newsletterPost.sendDate.getMonth()}/${newsletterPost.sendDate.getFullYear()}`
    } else {
      return `${newsletterPost.schedulingDate.getDate()}/${newsletterPost.schedulingDate.getMonth()}/${newsletterPost.schedulingDate.getFullYear()}`
    }
  }

  return (
    <div className="newsletter-post-container">
      <h1 className="title-newsletter-post">{newsletterPost.subject}</h1>
      <div className="newsletter-post-content">
        <div className="description-newsletter-post">
          {newsletterPost.sendDate ?
            <div className="state-newsletter-post">
              <BsFillCheckCircleFill className="sended-icon-newsletter-post" size={25} />
              <p>Post enviado</p>
            </div>
            :
            <div className="state-newsletter-post">
              <MdScheduleSend className="not-sended-icon-newsletter-post" size={25} />
              <p>Post agendado</p>
            </div>
          }
          <div className="time-newsletter-post">
            <MdOutlineAccessTimeFilled className="time-icon-newsletter-post"/>
            <p>{getTime()}</p>
          </div>
          <div className="date-newsletter-post">
            <div className="day-newsletter-post">
              <FaCalendarDay className="date-icon-newsletter-post"/>
              <p>{currentDayName()}</p>
            </div>
            <div className="day-newsletter-post">
              <IoCalendar className="date-icon-newsletter-post"/>
              <p>{getDate()}</p>
            </div>
          </div>
        </div>
        <div className="options-newsletter-post">
          <MdDeleteForever className="delete-button-newsletter-post" size={30}/>
          <AiFillEdit className="edit-button-newsletter-post" size={25}/>
        </div>
      </div>
    </div>
  )
}

export default NewsletterPosts;