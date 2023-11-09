import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";

import "../../styles/configuration/configuration.css";
import { AiFillCloseCircle } from "react-icons/ai";
import DeleteDialog from "../../components/DeleteDialog";

export default function ConfigurationPage() {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editPasswordOpen, setEditPasswordOpen] = useState(false);

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const openEditPasswordDialog = () => setEditPasswordOpen(true);
  const closeEditPasswordDialog = () => setEditPasswordOpen(false);

  function getUserData() {
    // api.get("user-data", {
    //   withCredentials: true
    // })
    // .then((response) => {
    //   setUser(response.data);
    // }).catch((error) => {
    //   alert(error);
    // })
    setUserName("miqueias");
    setUserLastName("Garcia");
    setUserEmail("miqueiassllucena@gmail.com")
  }

  function handleEditUserData(event: FormEvent) {
    event.preventDefault();

    api.put("update-user", {
      name: userName,
      lastName: userLastName,
      email: userEmail
    },
    {
      withCredentials: true
    })
    .then((response) => {
      alert(response)
    })
    .catch((error) => {
      alert(error)
    })
  }

  function handleDeleterUserAccount() {
    closeDeleteDialog();

    api.delete("delete-user", {withCredentials: true})
    .then((response) => {
      alert(response)
    })
    .catch((error) => {
      alert(error)
    })
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <div className="configuration-container">
      <form className="configuration-form" onSubmit={handleEditUserData}>
        <label htmlFor="name" className="configuration-label-form">Nome</label>
        <input
          className="configuration-input"
          type="text"
          name="name"
          id="name"
          value={userName}
          onChange={(event) => {setHasChanged(true); setUserName(event.target.value)}}
        />
        <label htmlFor="lastName" className="configuration-label-form">Sobrenome</label>
        <input
          className="configuration-input"
          type="text"
          name="lastName"
          id="lastName"
          value={userLastName}
          onChange={(event) => {setHasChanged(true); setUserLastName(event.target.value)}}
        />
        <label htmlFor="email" className="configuration-label-form">Email</label>
        <input
          className="configuration-input"
          type="email"
          name="email"
          id="email"
          value={userEmail}
          onChange={(event) => {setHasChanged(true); setUserEmail(event.target.value)}}
        />
        <button type="submit" style={!hasChanged ? {opacity: ".4"} : {}} disabled={!hasChanged} onClick={() => alert("teste")}>Atualizar</button>
      </form>
      <div className="configuration-options">
        <span className="configuration-span">Ao editar sua senha, por segurança, você terá que relogar na sua conta</span>
        <button className="configuration-change-password-button" onClick={openEditPasswordDialog}>Alterar senha</button>
        <span className="configuration-span">Ao excluir a sua conta, não haverá volta, tenha certeza antes de realizar essa ação</span>
        <button className="configuration-delete-account-button" onClick={openDeleteDialog}>Excluir Conta</button>
      </div>
      {deleteDialogOpen &&
          <DeleteDialog
            title="Deseja excluir sua conta permanentemente?"
            callbackDeletion={handleDeleterUserAccount}
            callbackCancel={closeDeleteDialog}
          />
        }
        {editPasswordOpen &&
          <dialog className="configuration-edit-password-dialog">
            <AiFillCloseCircle className="close-edit-password-button" size={25} onClick={closeEditPasswordDialog}/>
            <form className="configuration-edit-password-form">
              <label htmlFor="oldPassword" placeholder="Digite a sua senha atual">Senha atual</label>
              <input
                className="configuration-edit-input"
                type="password"
                name="oldPassword"
                id="oldPassword"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
              />
              <label htmlFor="newPassword" placeholder="Digite a sua nova senha">Nova senha</label>
              <input
                className="configuration-edit-input"
                type="password"
                name="newPassword"
                id="newPassword"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <button type="submit" className="configuration-edit-password-button" onClick={() => { closeEditPasswordDialog() }}>Alterar senha</button>
            </form>
          </dialog>
        }
    </div>
  );
}