import { useNavigate } from "react-router-dom"

import { ConfirmButton } from "../components/ConfirmButton";
import { Input } from "../components/Input";

import "../styles/singUp.css"
import "../styles/singUpMobile.css"
import { FormEvent, useEffect, useState } from "react";
import api from "../services/api";
import { validateEmail, validateLastName, validateName, validatePassword } from "../validation/singupFormValidation";

export function SingUpPage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);

  const [nameFeedback, setNameFeedback] = useState("");
  const [lastNameFeedback, setLastNameFeedback] = useState("");
  const [emailFeedback, setEmailFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem("user");
    if(logged) {
      navigate("/");
    }
  }, [navigate])

  const handleLogin = ():void => {
    navigate("/authentication/singin");
  }

  async function handleSingup(event: FormEvent) {
    event.preventDefault();
    if(
      nameFeedback.length === 0 &&
      lastNameFeedback.length === 0 &&
      emailFeedback.length === 0 &&
      passwordFeedback.length === 0
    ) {
      await api.post('register_user', {
        "first_name": name,
        "last_name": lastName,
        "email": email,
        "password": password
      }).then((response) => {
        navigate("/authentication/email-authentication")
        localStorage.setItem("user", response.data)
      }).catch((error) => {
        if(error.response.status === 409) {
          setShowText(true);
        }
      })
    } else {
      alert("Preencha os dados corretamente antes de enviar")
    }
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
                  setNameFeedback(validateName(event.target.value))
                }
              }
              placeholder='Digite o seu primeiro nome'
            />
            <p className="feedback">{nameFeedback}</p>
            <Input
              required
              type="text"
              name="sobrenome"
              id="sobrenome"
              value={lastName}
              onChange={
                (event) => {
                  setLastName(event.target.value)
                  setLastNameFeedback(validateLastName(event.target.value))
                }
              }
              placeholder='Digite o seu sobrenome'
            />
            <p className="feedback">{lastNameFeedback}</p>
            <Input
              required
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={
                (event) => {
                  setEmail(event.target.value)
                  setEmailFeedback(validateEmail(event.target.value))
                }
              }
              placeholder='Digite seu email'
            />
            <p className="feedback">{emailFeedback}</p>
            <Input
              required
              type="password"
              name="name"
              id="senha"
              value={password}
              onChange={
                (event) => {
                  setPassword(event.target.value)
                  setPasswordFeedback(validatePassword(event.target.value))
                }
              }
              placeholder='Digite uma senha'
            />
            <p className="feedback">{passwordFeedback}</p>
            { showText &&
              <p className="show-text">Usuário já existe</p>
            }
          </div>
          <ConfirmButton type="submit" style={showText ? {marginTop: "2vh"}: {}}>Cadastre-se</ConfirmButton>
        </form>
      </div>
  )
}