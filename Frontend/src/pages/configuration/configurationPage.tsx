import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";

import "../../styles/configuration/configuration.css";

export default function ConfigurationPage() {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
        <button style={!hasChanged ? {opacity: ".4"} : {}} disabled={!hasChanged} onClick={() => alert("teste")}>Atualizar</button>
      </form>
      <div className="configuration-options">
        <span className="configuration-span">Ao editar sua senha, por segurança, você terá que relogar na sua conta</span>
        <button className="configuration-change-password-button">Mudar senha</button>
        <span className="configuration-span">Ao excluir a sua conta, não haverá volta, tenha certeza antes de realizar essa ação</span>
        <button className="configuration-delete-account-button" onClick={() => setDeleteDialogOpen(true)}>Excluir Conta</button>
      </div>
      {deleteDialogOpen &&
          <dialog className="delete-newsletter-dialog">
            <div className="delete-newsletter-dialog-content">
              <h1>Todos os seus dados serão perdidos permanentemente</h1>
              <div className="delete-newsletter-dialog-buttons">
                <button className="delete-button-newsletter-dialog" onClick={() => {}}>Deletar</button>
                <button className="cancel-button-newsletter-dialog" onClick={() => {}}>Cancelar</button>
              </div>
            </div>
          </dialog>
        }
    </div>
  );
}