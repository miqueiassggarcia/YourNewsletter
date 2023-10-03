import { useNavigate } from "react-router-dom";
import { ConfirmButton } from "../components/ConfirmButton";
import { Input } from "../components/Input";
import "../styles/emailAuthentication.css";
import { FormEvent, useEffect, useState } from "react";
import "../styles/dialog.css"
import api from "../services/api";

export function EmailAuthentication() {
  const delay = (time: number) => new Promise(
    resolve => setTimeout(resolve, time)
  );
  
  const navigate = useNavigate();

  const [tokenCode, setTokenCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorTextSwitcher, setErrorTextSwitcher] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username")
    const name = localStorage.getItem("first_name")
    const lastName = localStorage.getItem("last_name")
    const email = localStorage.getItem("email")
    const validate = localStorage.getItem("validate")
    if(validate) {
      navigate("/")
    } else if(!email || !username || !name || !lastName) {
      navigate("/authentication/singup")
    }
  }, [navigate])

  const handleConfirmation = async (event: FormEvent) => {
    event.preventDefault();

    const username = localStorage.getItem("username")
    const email = localStorage.getItem("email")

    api.post('confirm_user', {
      "username": username,
      "email": email,
      "token_confirmation": tokenCode
    }).then(async () => {
      if(!dialogOpen) {
        setDialogOpen(true);
        localStorage.setItem("validate", "validated user")
        await delay(1500);
        navigate("/");
      } else {
        setErrorTextSwitcher(true);
      }
    }).catch(async (error) => {
      if(error.response.status === 404) {
        setErrorText("O email informado não existe, refaça o cadastro");
        localStorage.removeItem("username")
        localStorage.removeItem("first_name")
        localStorage.removeItem("last_name")
        localStorage.removeItem("email")
        localStorage.removeItem("validate")
        await delay(2500);
      }
      else if(error.response.status === 400) {
        if(error.response.data.message.includes("token")) {
          setErrorText("Digite o código enviado no email");
        }
        else if(error.response.data.message.includes("email")) {
          setErrorText("Ocorreu um erro, por favor refaça o cadastro");
          localStorage.removeItem("username")
          localStorage.removeItem("first_name")
          localStorage.removeItem("last_name")
          localStorage.removeItem("email")
          localStorage.removeItem("validate")
          await delay(2500);
        }
      }
      else if(error.response.status === 401) {
        if(error.response.data.message.includes("expirado")) {
          setErrorText("O seu código de confirmação expirou");
          localStorage.removeItem("username")
          localStorage.removeItem("first_name")
          localStorage.removeItem("last_name")
          localStorage.removeItem("email")
          localStorage.removeItem("validate")
          await delay(2000)
        }
        else if(error.response.data.message.includes("coincidem")) {
          setErrorText("Código incorreto, tente novamente");
        }
      }
      else if(error.response.status === 409) {
        setErrorText("Email de usuário já confirmado")
        localStorage.setItem("validate", "validated user")
        await delay(1000)
        navigate("/")
      }
      setErrorTextSwitcher(true);
    })
  }

  return (
      <>
        <div className="App">              
          <form className='email-code-form' onSubmit={handleConfirmation}>
            <h1>Informe o código de confirmação</h1>
            <Input
              type="text"
              name="tokenCode"
              id="tokenCode"
              placeholder='Digite aqui o código'
              value={tokenCode}
              onChange={
                (event) => {
                  setTokenCode(event.target.value)
                }
              }
            />
            {errorTextSwitcher ?
              <p className="error-text">{errorText}</p>
              :
              <p>Enviamos um código no email cadastrado.</p>
            }
            <ConfirmButton type="submit" onSubmit={handleConfirmation}>Continuar</ConfirmButton>
          </form>
        </div>

        {dialogOpen ?
          <dialog className="dialog">
            <h1>Email confirmado</h1>
          </dialog>
          :
          null
        }
    </>
  )
}