import { MdDeleteForever, MdOutlineAccessTimeFilled, MdScheduleSend } from "react-icons/md";
import "../styles/components/newsletterPosts.css"
import { AiFillEdit } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";
import { FaCalendarDay } from "react-icons/fa";

export interface newsletterPostProps {
  id: number;
  id_newsletter: number;
  scheduling_date: Date;
  send_date: Date | null;
  sent: boolean;
  subject: string;
  html: string;
  style: string;
}

interface newsletterPostsProps {
  newsletterPost: newsletterPostProps;
}

interface dayNameProps {
  [key: number]: string
}

const NewsletterPosts: React.FC<newsletterPostsProps> = ({newsletterPost}) => {
  let date;
  
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


    if(newsletterPost.send_date !== null) {
      date = new Date(newsletterPost.send_date);
      return dayName[date.getDay()];
    } else {
      date = new Date(newsletterPost.scheduling_date);
      return dayName[date.getDay()];
    }
  }

  function getTime() {
    if(newsletterPost.send_date  !== null) {
      date = new Date(newsletterPost.send_date);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
    } else {
      date = new Date(newsletterPost.scheduling_date);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
    }
  }

  function getDate() {
    if(newsletterPost.send_date !== null) {
      date = new Date(newsletterPost.send_date);
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    } else {
      date = new Date(newsletterPost.scheduling_date);
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
  }

  return (
    <div className="newsletter-post-container">
      <h1 className="title-newsletter-post" style={newsletterPost.subject.length > 25 ? {marginLeft: "2rem"} : {}}>{newsletterPost.subject}</h1>
      <div className="newsletter-post-content">
        <div className="description-newsletter-post">
          {newsletterPost.send_date ?
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