import { useNavigate } from "react-router-dom"

import { ConfirmButton } from "../components/ConfirmButton";
import { Input } from "../components/Input";

import "../styles/singUp.css"
import "../styles/singUpMobile.css"
import { FormEvent, useState } from "react";
import api from "../services/api";

export function SingUpPage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/singin");
  }

  const handleSingup = async (event: FormEvent) => {
    event.preventDefault();

    const params = new URLSearchParams();
    params.append('first_name', name);
    params.append('last_name', lastName);
    params.append('email', email);
    params.append('password', password);

    const result = await api.post(
      "/register_user",
      params
    ).then(() => {
      alert(result);
    }).catch((error) => {
        alert(error);
    })

    window.alert(result)

    navigate("/email-authentication");
  }

  return (
    <div className="App">
      <div className="float-div">
        <div className='container-text'>
          <h1>Bem vindo de volta!</h1>
          <span>Faça login aqui e continue a sua newsletter</span>
          <button type='button' onClick={handleLogin}>Login</button>
        </div>
        <form className='login-form' onSubmit={handleSingup}>
          <h1>Cadastre-se</h1>
          <div className='input-container'>
            <Input
              type="text"
              name="nome"
              id="nome"
              value={name}
              onChange={
                (event) => {
                  setName(event.target.value)
                }
              }
              placeholder='Digite o seu primeiro nome'
            />
            <Input
              type="text"
              name="sobrenome"
              id="sobrenome"
              value={lastName}
              onChange={
                (event) => {
                  setLastName(event.target.value)
                }
              }
              placeholder='Digite o seu sobrenome'
            />
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={
                (event) => {
                  setEmail(event.target.value)
                }
              }
              placeholder='Digite seu email'
            />
            <Input
              type="password"
              name="name"
              id="senha"
              value={password}
              onChange={
                (event) => {
                  setPassword(event.target.value)
                }
              }
              placeholder='Digite uma senha'
            />
          </div>
          <ConfirmButton type="submit">Cadastre-se</ConfirmButton>
        </form>
      </div>
    </div>
  )
}