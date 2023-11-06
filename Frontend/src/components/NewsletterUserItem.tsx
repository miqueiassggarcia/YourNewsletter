import { MdDeleteForever } from "react-icons/md";

import "../styles/components/newsletterItem.css"
import "../styles/components/newsletterUserItem.css"
import { AiFillEdit } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import api from "../services/api";
import { FormEvent, useState } from "react";
import { newsletterProps } from "./NewsletterItem";

interface newsletterItemProps {
  newsletter: newsletterProps;
  userItem: boolean;
  callbackUpdate?: () => void;
}

const NewsletterUserItem: React.FC<newsletterItemProps> = ({newsletter, userItem, callbackUpdate}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>();
  const [editActive, setEditActive] = useState<boolean>();
  const [name, setName] = useState(newsletter.name);
  const [description, setDescription] = useState(newsletter.description);

  async function deleteNewsletter() {
    await api.delete("/delete_newsletter", {
      data: {"id": newsletter.id},
      withCredentials: true
    })
    .then(() => {
      closeDeleteDialog();
      callbackUpdate!();
    })
    .catch((error) => {
      alert(error);
    });
  }

  function closeEdit(event: FormEvent) {
    event.preventDefault();

    if(name !== newsletter.name) {
      api.put("/update_newsletter_name", {
        "id": newsletter.id,
        "new_name": name
      },
      {
        withCredentials: true
      }
      ).then(() => {
        callbackUpdate!();
      }).catch((error) => {
        alert(error)
      })
    }
    
    if(description !== newsletter.description) {
      api.put("/update_newsletter_description", {
        "id": newsletter.id,
        "new_description": description
      },
      {
        withCredentials: true
      }
      ).then(() => {
        callbackUpdate!();
      }).catch((error) => {
        alert(error)
      })
    }

    setEditActive(false);
  }

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);
  const openEdit = () => setEditActive(true);

  return (
    <div className="newsletter-item-container">
      <div className="content-newsletter-item" style={{width: "95%"}}>
        <div className="header-newsletter-item">
          {editActive ?
              <input
                type="text"
                className="user-newsletter-item-edit-title-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            :
              <h1 className="title-newsletter-item title-newsletter-item-edit">{newsletter.name}</h1>
          }
        </div>
          {editActive ?
            <input
              type="text"
              className="user-newsletter-item-edit-description-input"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          :
            <p className="description-newsletter-item  description-newsletter-item-edit">{newsletter.description}</p>
          }
      </div>
        <div className="options-newsletter-item">
            <MdDeleteForever className="delete-button-newsletter-item" size={30} onClick={openDeleteDialog}/>
            {editActive ?
              <BsFillCheckCircleFill className="confirm-edit-button-newsletter-item" size={25} onClick={closeEdit} />
            :
              <AiFillEdit className="edit-button-newsletter-item" size={25} onClick={openEdit} />
            }
        </div>
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
    </div>
  )
}

export default NewsletterUserItem;