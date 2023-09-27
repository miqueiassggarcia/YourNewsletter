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
  const [showText, setShowText] = useState(false);

  const [nameFeedback, setNameFeedback] = useState("");
  const [lastNameFeedback, setLastNameFeedback] = useState("");
  const [emailFeedback, setEmailFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");

  const navigate = useNavigate();

  const handleLogin = ():void => {
    navigate("/authentication/singin");
  }

  function validateName(name: String):void {
    if(name.length < 3) {
      setNameFeedback("Nome precisa conter ao menos 3 caracteres")
    } else if(name.length > 30) {
      setNameFeedback("Nome precisa conter menos de 30 caracteres")
    } else {
      setNameFeedback("");
    }
  }

  function validateLastName(lastName: String):void {
    if(lastName.length < 3) {
      setLastNameFeedback("Sobrenome precisa conter ao menos 3 caracteres")
    } else if(lastName.length > 30) {
      setLastNameFeedback("Sobrenome precisa conter menos de 30 caracteres")
    } else {
      setLastNameFeedback("");
    }
  }

  function validateEmail(email: string):void {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailPattern.test(email)) {
      setEmailFeedback("Formato de email inválido");
    } else {
      setEmailFeedback("");
    }
  }

  function validatePassword(password: string): void {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    if(!hasNumber) {
      setPasswordFeedback("A senha precisa conter pelo menos 1 número");
    } else if(!hasUppercase) {
      setPasswordFeedback("A senha precisa conter pelo menos uma letra maiúscula");
    } else if(!hasLowercase) {
      setPasswordFeedback("A senha precisa conter pelo menos uma letra minúscula");
    } else if(!hasSpecialChar) {
      setPasswordFeedback("A senha precisa conter pelo menos um caractere especial");
    } else if(password.length < 8) {
      setPasswordFeedback("A senha precisa conter pelo menos 8 caracteres");
    } else {
      setPasswordFeedback("");
    }
  }

  async function handleSingup(event: FormEvent) {
    event.preventDefault();

    await api.post('register_user', {
      "first_name": name,
      "last_name": lastName,
      "email": email,
      "password": password
    }).then(() => {
      navigate("/authentication/email-authentication")
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
                  validateName(event.target.value)
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
                  validateLastName(event.target.value)
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
                  validateEmail(event.target.value)
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
                  validatePassword(event.target.value)
                }
              }
              placeholder='Digite uma senha'
            />
            <p className="feedback">{passwordFeedback}</p>
            { showText ?
              <p className="show-text">Usuário já existe</p>
              :
              <></>
            }
          </div>
          <ConfirmButton type="submit" style={showText ? {marginTop: "2vh"}: {}}>Cadastre-se</ConfirmButton>
        </form>
      </div>
  )
}