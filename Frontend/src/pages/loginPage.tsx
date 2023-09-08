import { ConfirmButton } from "../components/ConfirmButton";
import { Input } from "../components/Input";
import "../styles/loginPage.css"

export function LoginPage() {
  return (
    <div className="App">
      <div className="float-div">
        <div className='container-text'>
          <h1>Bem vindo de volta!</h1>
          <span>Faça login aqui e continue a sua newsletter</span>
          <button type='button'>Login</button>
        </div>
        <form className='login-form'>
          <h1>Cadastre-se</h1>
          <div className='input-container'>
            <Input type="text" name="nome" id="nome" placeholder='Digite o seu primeiro nome'/>
            <Input type="text" name="sobrenome" id="sobrenome" placeholder='Digite o seu sobrenome'/>
            <Input type="email" name="email" id="email" placeholder='Digite seu email'/>
            <Input type="password" name="name" id="senha" placeholder='Digite uma senha'/>
          </div>
          <ConfirmButton>Cadastre-se</ConfirmButton>
        </form>
      </div>
    </div>
  )
}