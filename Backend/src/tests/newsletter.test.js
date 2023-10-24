const {app, server} = require("../server");
const prisma = require("../server");
const request = require("supertest");
const jwt = require('jsonwebtoken');
// const randToken = require('rand-token');

// const newSecretKey = randToken.generate(16);

// let authenticatedUser;

// beforeAll(async () => {
//   // Realize a autenticação antes de iniciar os testes.
//     authenticatedUser = await request(app)
//     .post('/login') // Substitua pela rota real de login da sua aplicação
//     .send({
//         "username": "TESTEEEEE",
//         "password": "TESTEEEEE",
//     });
// });


// const user = {
//     "username": "TESTEEEEE",
//     "first_name": "TESTEEEEE",
//     "last_name": "TESTEEEEE",
//     "email": "TESTEEEEE@GMAIL.COM",
//     "password": "TESTEEEEE"
// };

// // Função para gerar um token JWT válido para um usuário
// function generateAuthToken(user) {
//     const secretKey = "TESTEEEEE"; // Use a mesma chave secreta que sua aplicação real
//     const token = jwt.sign({ user}, secretKey, { expiresIn: '1h' }); // O token expira em 1 hora
//     return token;
//     }
//     const authenticatedUser = {
//         username: "TESTEEEEE",
//     };
// const authToken = generateAuthToken(authenticatedUser.user);

describe("Testar rota de newsletter", () =>{
    it("Deve retornar 401 para usuario não logado", async()=>{
        const res = await request(app).post("/create_newsletter").send({});
        expect(res.statusCode).toBe(401);
    })

    // it('Deve retornar 200 para usuário autenticado e dados corretos', async () => {
    //     const data = {
    //         name: 'Nome da Newsletter',
    //         description: 'Descrição da Newsletter',
    //     };

    //     const token = authenticatedUser.body.token;

    //     const res = await request(app)
    //         .post('/create_newsletter')
    //         .set('Authorization', `Bearer ${token}`) // Adicione um cabeçalho de autenticação válido
    //         .send(data);
    //     expect(res.statusCode).toBe(200);
    //     });
})

afterAll((done) => {
    // Fecha o servidor Express
    server.close(() => {
        done();
    });
});