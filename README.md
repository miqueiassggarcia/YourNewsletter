<style>
  .tecnologias-div {
    margin-left: 20px;
  }
</style>

<div align="center">
  <h1>YourNewsletter</h1>
  <a href="#sobre">Sobre</a> |
  <a href="#tecnologias">Tecnologias</a> |
  <a href="#conteudo">Conteúdo</a> |
  <a href="#inicializacao">Inicialização</a>
</div>

<h2 id="sobre">Sobre</h2>
<p>Um site para criação de newsletters, onde o usuário criará a sua conta e posteriormente poderá criar, configurar e gerenciar sua própria newsletter, enquanto também tem a possibilidade de se inscrever em newsletters previamente criadas para acompanhar informações relevantes.</p>

<h2 id="tecnologias">Tecnologias</h2>
<div class="tecnologias-div">
  <h3>Frontend</h3>
  <p>Para o frontend do projeto, foi utilizado o <a href="https://react.dev/">React</a> como framework, juntamente com <a href="https://www.typescriptlang.org/">Typescript</a>. Também foi feita a utilização da biblioteca <a href="https://axios-http.com/">Axios</a> para comunicação com api e <a href="https://github.com/unlayer/react-email-editor">react-email-editor</a> para a criação do layout dos email</p>
  
  <h3>Backend</h3>
  <p>Para o backend do projeto, foi utilizado <a href="https://nodejs.org/en">Node.js</a> juntamente com <a href="https://expressjs.com/pt-br/">Express</a>. Também foi feita a utilização da biblioteca <a href="https://www.prisma.io/">Prisma</a> como ORM.

  <h3>Testes</h3>
  <p>Para os testes do projeto, foi utilizado <a href="https://jestjs.io/pt-BR/">Jest</a> para a criação dos testes unitáiros, de API e E2E, sendo automatizados com github actions.

  <h3>Deploy</h3>
  <p>Para o deploy da aplicação, foi utilizado a <a href="https://aws.amazon.com/">AWS</a> juntamente com a criação de imagens <a href="https://www.docker.com/">Docker</a>. Onde também foi utilizado <a href="https://www.nginx.com/">Nginx</a> no frontend.
</div>

<h2 id="conteudo">Conteúdo</h2>
<p>Adicionar conteúdos</p>

<h2 id="inicializacao">Inicialização</h2>
<h3>Backend</h3>
<h4>Configuração Inicial</h4>

Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo [aqui](https://nodejs.org/).

1. Clone o repositório para sua máquina local:

    ```bash
    git clone https://github.com/miqueiassggarcia/YourNewsletter.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd YourNewsletter/Backend
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

<h4>Configuração do Banco de Dados</h4>

Este projeto utiliza um banco de dados PostgreSQL. Certifique-se de criar um banco de dados e configurar as informações de conexão no arquivo `.env`. Existe um arquivo de exemplo chamado `.env.example` que você pode renomear para `.env` e preencher com suas configurações.

<h4>Execução do Projeto</h4>

Após a configuração inicial, você pode iniciar o servidor:

```bash
npm start
```

O servidor estará em execução em [http://localhost:PORT](http://localhost:PORT), o PORT será definido no `.env`

<h4>Endpoints</h4>

Aqui estão alguns dos endpoints principais disponíveis:

- `/get_posts_from_newsletter`: retornar todos os posts de uma newsletter específica.
- `/newsletter_subscribe`: usada para fazer a inscrição do usuário em uma newsletter.

<h3>Frontend</h3>
<h4>Pré-requisitos</h4>
Certifique-se de ter o Node.js e o npm instalados em sua máquina. Se ainda não tiver, você pode baixá-los [aqui](https://nodejs.org/).

<h4>Instalação</h4>
1. Clone o repositório para sua máquina local:

  ```bash
  git clone https://github.com/miqueiassggarcia/YourNewsletter.git
  ```

2. Navegue até o diretório do projeto:

  ```bash
  cd YourNewsletter/Frontend
  ```

3. Instale as dependências:

  ```bash
  npm install
  ```

<h4>Execução do Projeto</h4>

Após a conclusão da instalação, você pode iniciar o servidor de desenvolvimento:

  ```bash
  npm start
  ```

Isso iniciará o aplicativo React e abrirá automaticamente uma nova janela do navegador exibindo o projeto. O servidor de desenvolvimento será executado em [http://localhost:3000](http://localhost:3000).

<h4>Configuração da Variável de Ambiente</h4>

Para garantir uma configuração adequada do projeto, é necessário criar uma variável de ambiente chamada `REACT_APP_API_URL`. Esta variável será responsável por armazenar a URL da API utilizada no projeto React. Siga os passos abaixo para configurar essa variável:

1. Crie um arquivo chamado `.env` na raiz do seu projeto React.

2. Dentro do arquivo `.env`, adicione a variável de ambiente `REACT_APP_API_URL` com a URL da API do backend:

    ```env
    REACT_APP_API_URL=http://api-url
    ```

    Substitua `http://api-url` pela URL real da API.

3. Certifique-se de que o arquivo `.env` seja adicionado ao seu `.gitignore` para evitar o rastreamento de informações sensíveis no controle de versão. Se ainda não tiver um arquivo `.gitignore`, crie um e adicione a linha:

    ```gitignore
    .env
    ```

4. Reinicie o servidor de desenvolvimento, caso esteja em execução.

Agora, a variável de ambiente `REACT_APP_API_URL` estará acessível em seu código React, permitindo que você a utilize para chamar a API de maneira dinâmica. Lembre-se de não compartilhar informações sensíveis, como chaves de API, publicamente no seu repositório.

<h4>Comandos Úteis</h4>

- `npm start`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera uma versão otimizada do aplicativo para produção.
- `npm test`: Executa os testes disponíveis no projeto.
- `npm run eject`: Remove a dependência do Create React App, permitindo maior controle sobre a configuração.

<h4>Contribuições</h4>

Ficamos felizes com contribuições! Se você deseja colaborar ou reportar problemas, sinta-se à vontade para abrir uma issue ou enviar um pull request. Consulte nossa seção de [Contributing](CONTRIBUTING.md) para obter mais detalhes.