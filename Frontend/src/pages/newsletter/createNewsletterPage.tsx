import { FormEvent, useEffect, useState } from "react";
import "../../styles/newsletter/createNewsletter.css"
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";
import { validateNewsletterDescription, validateNewsletterName } from "../../validation/createUserFormValidation";

export function CreateNewsletterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newsletterNameFeedback, setNewsletterNameFeedback] = useState("");
  const [newsletterDescriptionFeedback, setNewsletterDescriptionFeedback] = useState("");

  useEffect(() => {
    const validate = localStorage.getItem("validate");
    if(!validate) {
      navigate("/")
    }
  }, [navigate])

  const closeDialog = () => setDialogOpen(false);

  function handleCreateNewsletter(event: FormEvent) {
    event.preventDefault();

    if(newsletterNameFeedback.length === 0 && newsletterDescriptionFeedback.length === 0) {
      api.post("/create_newsletter", {
        "name": name,
        "description": description
      },
      {
        withCredentials: true
      }
      ).then(() => {
        setDialogOpen(true);
      }).catch((error) => {
        alert(error.response.data.message)
        alert(error.response.status)
      })
    }
  }

  return (
    <div className="container-new-newsletter">
      <form className="form-new-newsletter" onSubmit={handleCreateNewsletter}>
        <h1>Crie a sua newsletter</h1>
        <label htmlFor="newsletter-name" className="label-new-newsletter">Dê um nome para sua newsletter</label>
        <input
          type="text"
          name="newsletter-name"
          id="newsletter-name"
          className="name-new-newsletter"
          placeholder="Digite aqui o nome"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            setNewsletterNameFeedback(validateNewsletterName(event.target.value));
          }}
        />
        <p className="feedback">{newsletterNameFeedback}</p>
        <label htmlFor="descricao" className="label-new-newsletter">Dê uma breve descrição para sua newsletter</label>
        <textarea
          name="descricao"
          id="descricao"
          cols={30}
          rows={10}
          className="textarea-new-newsletter"
          placeholder="Digite aqui a descrição"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setNewsletterDescriptionFeedback(validateNewsletterDescription(event.target.value));
          }}
        />
        <p className="feedback">{newsletterDescriptionFeedback}</p>
        <button type="submit" className="new-newsletter-button">Criar</button>
      </form>
      {dialogOpen &&
        <AlertMessage title={"Newsletter criada"} hasDescription={false} callbackClose={closeDialog} />
      }
    </div>
  );
}