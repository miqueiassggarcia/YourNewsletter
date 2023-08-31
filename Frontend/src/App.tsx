import './App.css';
import { Input } from './components/Input';
import { ConfirmButton } from './components/ConfirmButton';

function App() {
  return (
    <div className="App">
        <form className='login-form'>
          <h2>Cadastre-se</h2>
          <Input type="text" name="nome" id="nome" placeholder='Digite um nome'/>
          <Input type="email" name="email" id="email" placeholder='Digite seu email'/>
          <Input type="text" name="name" id="senha" placeholder='Digite uma senha'/>
          <span>Já tem uma conta: <a href="">login</a></span>
          <ConfirmButton>Cadastre-se</ConfirmButton>
        </form>
    </div>
  );
}

export default App;
