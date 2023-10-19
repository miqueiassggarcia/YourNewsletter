const {app, server} = require("../server");
const prisma = require("../server");
const request = require("supertest");

//rota de registro
describe("testar rota de registro", () => {
    it("deve retornar 200", async () => {
        const res = await request(app).post("/register_user").send({
            "username": "carrara-taxi",
            "first_name": "miqueias",
            "last_name": "garcia",
            "email": "miqueidfasjdfijasidfjiajsidfjiasdj@gmail.com",
            "password": "senhamassa123"
        });
        expect(res.statusCode).toBe(200);
    })
    it("deve retornar 400", async () => {
        const res = await request(app).post("/register_user").send({});
        expect(res.statusCode).toBe(400);
    })
    // it('Deve retornar 409 para usuário já cadastrado ao registrar usuário', async () => {
    //     const response = await request(app).post('/register_user').send({
    //         "username": "TESTE",
    //         "first_name": "TESTE",
    //         "last_name": "TESTE",
    //         "email": "TESTE@GMAIL.COM",
    //         "password": "TESTE"
    //     });
    //     expect(response.statusCode).toBe(409);
    // });
    // it('Deve retornar status 500 em caso de erro interno', async () => {
    //     // Simulando um erro interno no servidor
    //     jest.spyOn(prisma.user.findFirst).mockRejectedValueOnce(new Error('Erro interno'));
    //     const res = await request(app).post(`/confirm_user`).send({
    //         "username": "carrara-taxi",
    //         "first_name": "miqueias",
    //         "last_name": "garcia",
    //         "email": "miqueidfasjdfijasidfjiajsidfjiasdj@gmail.com",
    //         "password": "senhamassa123"
    //     });
    //     expect(res.statusCode).toBe(500);
    // });
    // Teste para a rota de confirmação de usuário
    // it('Deve retornar 200 ao confirmar um usuário', async () => {
    //     // Primeiro, você precisará criar um usuário ou dados de emailConfirmation no banco de dados para confirmar
    //     // Em seguida, faça uma solicitação POST para a rota /confirm_user com os detalhes corretos
    //     const response = await request(app).post('/confirm_user').send({
    //         "username": "carrara-taxi",
    //         "token_confirmation": '$2b$10$NL9i7PIWyvZT1FR9V3UvN.h7xDVjWRVjQfbOmv1gp2mGKfkcSdVfm',
    //     });
    //     expect(response.statusCode).toBe(200);
    //     });
    it('Deve retornar 400 para entrada inválida ao confirmar usuário', async () => {
        const response = await request(app).post('/confirm_user')
        .send({});
        expect(response.statusCode).toBe(400);
        });
    // it('Deve retornar 404 para usuário não cadastrado ao confirmar usuário', async () => {
    //     const response = await request(app).post('/confirm_user').send({
    //         "username": 'usuárionãocadastrado',
    //         "token_confirmation": 'token_de_confirmacao',
    //     });
    //     expect(response.statusCode).toBe(404);
    //     });
    // it('Deve retornar 409 para usuário já confirmado ao confirmar usuário', async () => {
    //     // Certifique-se de que o usuário já está confirmado no banco de dados
    //     const response = await request(app).post('/confirm_user').send({
    //         "username": "carrara-taxi",
    //         "token_confirmation": '$2b$10$NL9i7PIWyvZT1FR9V3UvN.h7xDVjWRVjQfbOmv1gp2mGKfkcSdVfm',
    //         });
    //     expect(response.statusCode).toBe(409);
    //     });
    // it('Deve retornar 401 para token expirado ao confirmar usuário', async () => {
    //     // Certifique-se de que o token está expirado no banco de dados
    //     const response = await request(app).post('/confirm_user').send({
    //         "username": 'usuariotokenexpirado',
    //         "token_confirmation": 'token_de_confirmacao',
    //     });
    //     expect(response.statusCode).toBe(401);
    //     });
    // it('Deve retornar 401 para tokens não coincidentes ao confirmar usuário', async () => {
    //     // Certifique-se de que os tokens não coincidem no banco de dados
    //     const response = await request(app).post('/confirm_user').send({
    //         "username": "carrara-taxi",
    //         "token_confirmation": 'sdf',
    //     });
    //     expect(response.statusCode).toBe(401);
    //     });
    });


//rota de comfirmação
describe("Testar rota de confirmação", () =>{
    it("Deve retornar 400", async()=>{
        const res = await request(app).post("/confirm_user").send({});
        expect(res.statusCode).toBe(400);
    })
})
afterAll((done) => {
    // Fecha o servidor Express
    server.close(() => {
        done();
    });
});