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
  const [errorText, setErrorText] = useState(false);

  const handleEmailAdd = () => {
    setEmailSend(true);
  }

  const handleResendConfirmationCode = async () => {
    await api.post('register_user', {
      "first_name": "lorem ipsum",
      "last_name": "lorem ipsum",
      "email": email,
      "password": "lorem ipsum"
    }).then(() => {
      navigate("/email-authentication")
    }).catch((error) => {
      alert(error);
    }) 
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
        setErrorText(true);
      }
    }).catch((error) => {
      alert(error);
      setErrorText(true);
    })
  }

  return (
      <>
        <div className="container">
          <form className='email-code-form' onSubmit={handleConfirmation}>

            { !emailSend ?
              <>
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
                />
                <ConfirmButton type="button" onClick={handleEmailAdd}>Continuar</ConfirmButton>
              </>
              :
              <>
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
                {errorText ?
                  <><p className="errorText">Código expirado ou inválido <a onClick={handleResendConfirmationCode}> reenviar código</a></p>
                  </>
                  :
                  <p>Enviamos um código no email cadastrado.</p>
                }
                <ConfirmButton type="submit">Continuar</ConfirmButton>
              </>
            }

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