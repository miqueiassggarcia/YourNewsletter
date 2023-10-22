import { FormEvent, useEffect, useState } from "react";
import "../../styles/newsletter/createNewsletter.css"
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export function CreateNewsletterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const validate = localStorage.getItem("validate");
    if(!validate) {
      navigate("/")
    }
  }, [navigate])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDialogOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [dialogOpen])

  function handleCreateNewsletter(event: FormEvent) {
    event.preventDefault();

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
          onChange={(event) => {setName(event.target.value)}}
        />
        <label htmlFor="descricao" className="label-new-newsletter">Dê uma breve descrição para sua newsletter</label>
        <textarea
          name="descricao"
          id="descricao"
          cols={30}
          rows={10}
          className="textarea-new-newsletter"
          placeholder="Digite aqui a descrição"
          value={description}
          onChange={(event) => {setDescription(event.target.value)}}
        />
        <button type="submit" className="button-new-newsletter">Criar</button>
      </form>
      {dialogOpen &&
          <dialog className="dialog">
            <h1>Newsletter criada</h1>
          </dialog>
        }
    </div>
  );
}