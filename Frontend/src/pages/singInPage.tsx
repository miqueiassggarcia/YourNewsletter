import { useNavigate } from "react-router-dom"

import { ConfirmButton } from "../components/ConfirmButton";
import { Input } from "../components/Input";

import { FormEvent, useEffect, useState } from "react";
import api from "../services/api";

export function SingInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);
  const [errorText, setErrorText] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/authentication/singup");
  }

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

  async function handleSingup(event: FormEvent) {
    event.preventDefault();

    await api.post('/login', {
      "username": username,
      "password": password
    },
    {
      withCredentials: true
    }).then((response) => {
      localStorage.setItem("username", response.data.username)
      localStorage.setItem("name", response.data.first_name)
      localStorage.setItem("lastName", response.data.last_name)
      localStorage.setItem("email", response.data.email)
      localStorage.setItem("validate", "validated user")
      navigate("/")
    }).catch((error) => {
      if(error.response.status === 404) {
        setErrorText("Usuário não cadastrado")
        setShowText(true);
      } else if(error.response.status === 401) {
        setErrorText("Ocorreu um erro, tente novamente")
        setShowText(true);
      } else if(error.response.status === 400) {
        setErrorText("Dados inválidos, tente novamente")
        setShowText(true);
      }
    })  
  }

  return (
      <div className="float-div small">
        <div className='container-text'>
          <h1>Ainda não tem uma conta?</h1>
          <span>Cadastre-se para criar a sua própria newsletter</span>
          <button type='button' onClick={handleLogin}>Cadastre-se</button>
        </div>
        <form className='login-form' onSubmit={handleSingup}>
          <h1>Login</h1>
          <div className='input-container'>
            <Input
              required
              type="username"
              name="username"
              id="username"
              value={username}
              onChange={
                (event) => {
                  setUsername(event.target.value)
                }
              }
              placeholder='Digite seu apelido'
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
              <p className="show-text">{errorText}</p>
              :
              null
            }
          </div>
          <ConfirmButton type="submit" style={showText ? {marginTop: "2vh"}: {}}>Entrar</ConfirmButton>
        </form>
      </div>
  )
}