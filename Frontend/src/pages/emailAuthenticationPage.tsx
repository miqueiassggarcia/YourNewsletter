import { useNavigate } from "react-router-dom";
import { ConfirmButton } from "../components/ConfirmButton";
import { Input } from "../components/Input";
import "../styles/emailAuthentication.css";
import { FormEvent, useState } from "react";
import "../styles/dialog.css"

export function EmailAuthentication() {
  const delay = (time: number) => new Promise(
    resolve => setTimeout(resolve, time)
  );

  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const handleConfirmation = async (event: FormEvent) => {
    event.preventDefault();
    let confirmed = false;

    if(!dialogOpen && confirmed) {
      setDialogOpen(true);
      await delay(1500);
      navigate("/");
    } else {
      setErrorText(true);
    }
  }

  return (
      <>
        <div className="container">
          <form className='email-code-form' onSubmit={handleConfirmation}>
            <h1>Confirmação de e-mail</h1>
            <Input type="text" name="nome" id="nome" placeholder='Digite aqui o código' />
            {errorText ?
              <p className="errorText">Código expirado ou inválido.</p>
              :
              <p>Enviamos um código no email cadastrado.</p>
            }
            <ConfirmButton>Confirmar</ConfirmButton>
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