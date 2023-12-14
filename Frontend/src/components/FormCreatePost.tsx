import { FormEvent, useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/components/formCreatePost.css";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface formCreatePostProps {
  newsletter_id: number;
  callbackCloseForm: () => void;
}

const FormCreatePost: React.FC<formCreatePostProps> = ({newsletter_id, callbackCloseForm}) => {
  const navigate = useNavigate();
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const currentTime = formatTime(new Date());
  const today = new Date().toISOString().split('T')[0];

  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const emailEditorRef = useRef<EditorRef>(null);
  
  const [subject, setSubject] = useState<string>("");
  const [publicIstantly, setPublicIstantly] = useState<boolean>(false);
  const [time, setTime] = useState<string>(currentTime);
  const [date, setDate] = useState<string>(today);
  const [htmlDesign, setHtmlDesign] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { html } = data;
      setHtml(html);
    });
  };
  
  const saveDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design } = data;
      setHtmlDesign(JSON.stringify(design));
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    unlayer.addEventListener('design:updated', () => {
      saveDesign();
      exportHtml();
      localStorage.setItem("design", htmlDesign);
    });

    let currentDesign = localStorage.getItem("design");
    if(currentDesign) {
      let newDesign = JSON.parse(currentDesign);
      unlayer.loadDesign(newDesign);
    }
  };

  function handleChangeNextContent(event: FormEvent) {
    event.preventDefault();
    setIsLastPage(true);
  }

  function handleChangePreviousContent(event: FormEvent) {
    event.preventDefault();
    if(!isLastPage) {
      let confirmed = window.confirm("Todos os dados do cadastro serão perdidos");
      confirmed && callbackCloseForm();
    } else {
      localStorage.setItem("design", htmlDesign);
      setIsLastPage(false);
    }
  }

  function handleCreatePost(event: FormEvent) {
    event.preventDefault();
    saveDesign();
    exportHtml();

    api.post("/send_post", {
      "id_newsletter": newsletter_id,
      "send_immediately": publicIstantly,
      "scheduling_date": new Date(`${date}T${time}`),
      "subject": subject,
      "style": htmlDesign,
      "html": html
    },
    {
      withCredentials: true
    }).then((response) => {
      callbackCloseForm();
    }).catch((error) => {
      if(error.response.status === 401) {
        localStorage.removeItem("validate");
        alert("Sua sessão expirou");
        navigate("/authentication/singin");
      }
    })
  }

  return (
    <div className="form-create-post-container">
      <form className="form-create-post">  
          {isLastPage ?
            <div className="email-editor-form-create-post">
              <EmailEditor ref={emailEditorRef} onReady={onReady} />
            </div>
            :
            <div className="form-create-post-content">
              <label htmlFor="title">Assunto</label>
              <input
                type="text"
                id="title"
                name="title"
                className="subject-form-create-post"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Esse será o assunto do seu email enviado"
              />
              <div className="checkbox-form-create-post-container">
                <input
                  type="checkbox"
                  className="checkbox-form-create-post"
                  id="public-instantly"
                  name="public-instantly"
                  checked={publicIstantly}
                  onChange={() => setPublicIstantly(!publicIstantly)}
                  />
                <label htmlFor="public-instantly" className="text-checkbox-form-create-post">Publicar instantaneamente</label>
              </div>
              <label htmlFor="time" style={publicIstantly ? {opacity: 0.4} : {}}>Hora de publicação</label>
              <input
                type="time"
                className="time-form-create-post"
                disabled={publicIstantly}
                name="time"
                id="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                style={publicIstantly ? {opacity: 0.4} : {}}
                />
              <label htmlFor="date" style={publicIstantly ? {opacity: 0.4} : {}}>Data de publicação</label>
              <input
                type="date"
                className="date-form-create-post"
                disabled={publicIstantly}
                name="date"
                id="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                style={publicIstantly ? {opacity: 0.4} : {}}
                />
            </div>
          }
          
        <div className="bottom-button-form-create-post">
          <button type="button" className="button-form-create-post" onClick={handleChangePreviousContent}><FaChevronLeft className="button-left-icon-form-create-post" /> Voltar</button>
          {isLastPage ?
            <button type="submit" className="button-form-create-post" onClick={handleCreatePost}>Criar <FaCheckCircle className="button-right-icon-form-create-post" /></button>
            :
            <button type="button" className="button-form-create-post" onClick={handleChangeNextContent}>Avançar <FaChevronRight className="button-right-icon-form-create-post" /></button>
          }
        </div>
      </form>
    </div>
  )
}

export default FormCreatePost;