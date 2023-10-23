import { GoCrossReference } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";

import "../styles/components/newsletterItem.css"
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import api from "../services/api";
import { FormEvent, useState } from "react";

export interface newsletterProps {
  id: number;
  userName: string;
  name: string;
  description: string;
}

interface newsletterItemProps {
  newsletter: newsletterProps;
  userItem: boolean;
  callbackUpdate?: (newsletterId: number) => void;
}

const NewsletterItem: React.FC<newsletterItemProps> = ({newsletter, userItem, callbackUpdate}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>();
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>();
  const [name, setName] = useState(newsletter.name);
  const [description, setDescription] = useState(newsletter.description);

  async function deleteNewsletter() {
    await api.delete("/delete_newsletter", {
      data: {"id": newsletter.id},
      withCredentials: true
    })
    .then(() => {
      closeDeleteDialog();
      callbackUpdate!(newsletter.id);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function editNewsletter(event: FormEvent) {
    event.preventDefault();

    if(name !== newsletter.name) {
      api.put("/update_newsletter_name", {
        data: {
          "id": newsletter.id,
          "new_name": name
        },
        withCredentials: true
      })
      .then(() => {
        alert("nome alterado");
      })
      .catch((error) => {
        alert(error);
      })
    }

    if(description !== newsletter.description) {
      api.put("/update_newsletter_description", {
        data: {
          "id": newsletter.id,
          "new_description": description
        },
        withCredentials: true
      })
      .then(() => {
        alert("descrição alterada");
      })
      .catch((error) => {
        alert(error);
      })
    }

    closeEditDialog();
  }

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);
  const openEditDialog = () => setEditDialogOpen(true);
  const closeEditDialog = () => setEditDialogOpen(false);

  return (
    <div className="newsletter-item-container">
      <div className="content-newsletter-item" style={userItem ? {width: "95%"} : {}}>
        <div className="header-newsletter-item">
          <h1 className="title-newsletter-item">{newsletter.name}</h1>
        </div>
        <p className="description-newsletter-item">{newsletter.description}</p>
      </div>
        {userItem ?
          <div className="options-newsletter-item">
              <MdDeleteForever className="delete-button-newsletter-item" size={30} onClick={openDeleteDialog}/>
              <AiFillEdit className="edit-button-newsletter-item" size={25} onClick={openEditDialog} />
          </div>
          :
          <button type="button" className="subscribe-button-newsletter-item">
            Se increver
            <GoCrossReference size={20} style={{marginLeft: ".4rem"}}/>
          </button>
        }
        {deleteDialogOpen &&
          <dialog className="delete-newsletter-dialog">
            <div className="delete-newsletter-dialog-content">
              <h1>Você tem certeza em deletar sua newsletter</h1>
              <div className="delete-newsletter-dialog-buttons">
                <button className="delete-button-newsletter-dialog" onClick={deleteNewsletter}>Deletar</button>
                <button className="cancel-button-newsletter-dialog" onClick={closeDeleteDialog}>Cancelar</button>
              </div>
            </div>
          </dialog>
        }
        {editDialogOpen &&
          <dialog className="edit-newsletter-dialog">
            <AiFillCloseCircle className="close-edit-newsletter-button" size={25} onClick={closeEditDialog}/>
            <form className="form-edit-newsletter" onSubmit={editNewsletter}>
              <label htmlFor="newsletter-name" className="label-edit-newsletter">Edite o nome da sua newsletter</label>
              <input
                type="text"
                name="newsletter-name"
                id="newsletter-name"
                className="name-edit-newsletter"
                placeholder="Digite aqui o nome"
                value={name}
                onChange={(event) => {setName(event.target.value)}}
              />
              <label htmlFor="descricao" className="label-edit-newsletter">Edite a descrição da sua newsletter</label>
              <textarea
                name="descricao"
                id="descricao"
                cols={30}
                rows={10}
                className="textarea-edit-newsletter"
                placeholder="Digite aqui a descrição"
                value={description}
                onChange={(event) => {setDescription(event.target.value)}}
              />
              <button type="submit" className="button-edit-newsletter">Editar</button>
            </form>
          </dialog>
        }
    </div>
  )
}

export default NewsletterItem;