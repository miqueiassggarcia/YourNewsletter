import { useNavigate } from "react-router-dom"

import { ConfirmButton } from "../../components/ConfirmButton";
import { Input } from "../../components/Input";

import "../../styles/authentication/singUp.css"
import "../../styles/authentication/singUpMobile.css"
import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { validateApelido, validateEmail, validateLastName, validateName, validatePassword } from "../../validation/singupFormValidation";
import { AiOutlineArrowLeft } from "react-icons/ai";

export function SingUpPage() {
  const [apelido, setApelido] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);

  const [apelidoFeedback, setApelidoFeedback] = useState("");
  const [nameFeedback, setNameFeedback] = useState("");
  const [lastNameFeedback, setLastNameFeedback] = useState("");
  const [emailFeedback, setEmailFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username")
    const name = localStorage.getItem("first_name")
    const lastName = localStorage.getItem("last_name")
    const email = localStorage.getItem("email")
    const validate = localStorage.getItem("validate")
    if(validate) {
      navigate("/")
    } else if(username && name && lastName && email && !validate) {
      navigate("/authentication/email-authentication")
    }
  }, [navigate])

  const handleLogin = ():void => {
    navigate("/authentication/singin");
  }

  async function handleSingup(event: FormEvent) {
    event.preventDefault();
    if(
      apelidoFeedback.length === 0 &&
      nameFeedback.length === 0 &&
      lastNameFeedback.length === 0 &&
      emailFeedback.length === 0 &&
      passwordFeedback.length === 0
    ) {
      await api.post('register_user', {
        "username": apelido,
        "first_name": name,
        "last_name": lastName,
        "email": email,
        "password": password
      },
      {
        withCredentials: true
      }).then(() => {
        //Caso cadastre
        localStorage.setItem("username", apelido)
        localStorage.setItem("first_name", name)
        localStorage.setItem("last_name", lastName)
        localStorage.setItem("email", email)
        navigate("/authentication/email-authentication")
      }).catch((error) => {
        if(error.response.status === 409) {
          setShowText(true);
        }
      })
    } else {
      alert("Preencha os dados corretamente antes de enviar")
    }
  }

  function handleBackHistoryNavigation() {
    window.history.back();
  }

  return (
      <div className="float-div">
        <div className='container-text'>
          <div className="back-button-container">
            <AiOutlineArrowLeft size={30} className="back-button" onClick={handleBackHistoryNavigation}/>
          </div>
          <div className="container-text-main">
            <h1>Bem vindo de volta!</h1>
            <span>Faça login aqui e continue a sua newsletter</span>
            <button type='button' onClick={handleLogin}>Login</button>
          </div>
        </div>
        <form className='login-form' onSubmit={handleSingup}>
          <h1>Cadastre-se</h1>
          <div className='input-container'>
            <Input
              required
              type="text"
              name="apelido"
              id="apelido"
              value={apelido}
              onChange={
                (event) => {
                  setApelido(event.target.value)
                  setApelidoFeedback(validateApelido(event.target.value))
                }
              }
              placeholder='Digite um apelido para o seu usuário'
            />
            <p className="feedback">{apelidoFeedback}</p>
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