import { useNavigate } from "react-router-dom";
import { ConfirmButton } from "../components/ConfirmButton";
import { Input } from "../components/Input";
import "../styles/emailAuthentication.css";
import { FormEvent, useState } from "react";
import "../styles/dialog.css"
import api from "../services/api";

export function EmailAuthentication() {
  const delay = (time: number) => new Promise(
    resolve => setTimeout(resolve, time)
  );
  
  const navigate = useNavigate();

  const [tokenCode, setTokenCode] = useState("");
  const [email, setEmail] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorTextSwitcher, setErrorTextSwitcher] = useState(false);

  const handleEmailAdd = (event: FormEvent) => {
    event.preventDefault();

    setEmailSend(true);
  }

  const handleConfirmation = async (event: FormEvent) => {
    event.preventDefault();

    api.post('confirm_user', {
      "email": email,
      "token_confirmation": tokenCode
    }).then(async () => {
      if(!dialogOpen) {
        setDialogOpen(true);
        await delay(1500);
        navigate("/");
      } else {
        setErrorTextSwitcher(true);
      }
    }).catch(async (error) => {
      if(error.response.status === 404) {
        setErrorText("O email informado não existe");
        await delay(2000);
        setEmailSend(false);
      }
      else if(error.response.status === 400) {
        if(error.response.data.message.includes("token")) {
          setErrorText("Digite o código enviado no email");
        }
        else if(error.response.data.message.includes("email")) {
          setErrorText("O campo email não pode estar vazio");
          await delay(2000);
          setEmailSend(false);
        }
      }
      else if(error.response.status === 401) {
        if(error.response.data.message.includes("expirado")) {
          setErrorText("O seu código de confirmação expirou");
        }
        else if(error.response.data.message.includes("coincidem")) {
          setErrorText("Código incorreto, tente novamente");
        }
      }
      else if(error.response.status === 409) {
        setErrorText("Email de usuário já confirmado")
      }
      setErrorTextSwitcher(true);
    })
  }

  return (
      <>
        <div className="App">
            { !emailSend ?
              <form className='email-code-form' onSubmit={handleEmailAdd}>
                <h1>Informe seu email</h1>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder='Digite seu email aqui'
                  value={email}
                  onChange={
                    (event) => {
                      setEmail(event.target.value)
                    }
                  }
                  required
                />
                <ConfirmButton type="submit">Continuar</ConfirmButton>
              </form>
              :
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
            }
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