const {app, server, prisma} = require("../server");
const request = require("supertest");

// function simulateAuthentication(req, res, next) {
//     req.user = {
//         username: 'noberto',
//         // Outras informações do usuário que você deseja simular
//     };
//     next();
// }

// let authToken; 

// beforeAll(async () => {
//     const existingUser = await prisma.user.findFirst({
//     where: {
//         "username": 'noberto'
//     }
// });
//     if (existingUser) {
//     const loginResponse = await request(app).post('/login')
//         .send({
//         "username": "noberto",
//         "password": 'Teste123'
//     });
//     authToken = loginResponse.body.token;
//     } else {
//     console.error('Usuário não encontrado no banco de dados.');
//     }
// });

describe("Testar rota de newsletter", () =>{
    // beforeAll(() => {
    //     app.use(simulateAuthentication);
    // });
    it("Deve retornar 401 para usuario não logado", async()=>{
        const res = await request(app).post("/create_newsletter").send({});
        expect(res.statusCode).toBe(401);
    })
    // it("deve criar uma newsletter com autenticação", async () => {
    //     const response = await request(app).post("/create_newsletter").set('Authorization', `Bearer ${authToken}`)
    //     .send({
    //         "nome": "testeando",
    //         "description": "apenas vendo se funciona"
    //     });
    //     expect(response.status).toBe(200);
    // });
    // it("Deve retornar 200 ao criar uma newsletter com autenticação", async () => {
    //     const response = await request(app)
    //         .post("/create_newsletter")
    //         .send({
    //             name: "testeando",
    //             description: "apenas vendo se funciona"
    //         });

    //     expect(response.status).toBe(200);
    // });
})

afterAll((done) => {
    // Fecha o servidor Express
    server.close(() => {
        done();
    });
});