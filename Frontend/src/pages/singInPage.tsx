import { useNavigate } from "react-router-dom"

import { ConfirmButton } from "../components/ConfirmButton";
import { Input } from "../components/Input";

import { FormEvent, useEffect, useState } from "react";
import api from "../services/api";

export function SingInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);
  
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
      "email": email,
      "password": password
    }).then((response) => {
      localStorage.setItem("user", response.data)
      navigate("/")
    }).catch((error) => {
      if(error.response.status === 404) {
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
            { showText &&
              <p className="show-text">Usuário já existe</p>
            }
          </div>
          <ConfirmButton type="submit" style={showText ? {marginTop: "2vh"}: {}}>Entrar</ConfirmButton>
        </form>
      </div>
  )
}