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
  const [showText, setShowText] = useState(false);

  const handleLogin = () => {
    navigate("/authentication/singin");
  }

  async function handleSingup(event: FormEvent) {
    event.preventDefault();

    await api.post('register_user', {
      "first_name": name,
      "last_name": lastName,
      "email": email,
      "password": password
    }).then(() => {
      navigate("/email-authentication")
    }).catch((error) => {
      if(error.response.status === 409) {
        setShowText(true);
      }
    })  
  }

  return (
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
              required
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
              required
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
              required
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
              required
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
            { showText ?
              <p className="show-text">Usuário já existe</p>
              :
              null
            }
          </div>
          <ConfirmButton type="submit" style={showText ? {marginTop: "2vh"}: {}}>Cadastre-se</ConfirmButton>
        </form>
      </div>
  )
}