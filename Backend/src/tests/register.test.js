const {app, server, prisma} = require("../server");
const request = require("supertest");

const randToken = require("rand-token");
const time = require('../components/time.js');

//rota de registro
describe("testar rota de registro", () => {
    it("deve retornar 200 ao criar um usuario", async () => {
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
    it('Deve retornar 409 para usuário já cadastrado ao registrar usuário', async () => {
        const response = await request(app).post('/register_user').send({
            "username": "TESTEEEEE",
            "first_name": "TESTEEEEE",
            "last_name": "TESTEEEEE",
            "email": "TESTEEEEE@GMAIL.COM",
            "password": "TESTEEEEE"
        });
        expect(response.statusCode).toBe(409);
    });
    it('Deve retornar status 500 em caso de erro interno', async () => {
        // Simulando um erro interno no servidor
        jest.spyOn(prisma.user, "findFirst").mockRejectedValueOnce(new Error('Erro interno'));
        const res = await request(app).post(`/register_user`).send({
            "username": "carrara-taxi",
            "first_name": "miqueias",
            "last_name": "garcia",
            "email": "miqueidfasjdfijasidfjiajsidfjiasdj@gmail.com",
            "password": "senhamassa123"
        });
        expect(res.statusCode).toBe(500);
    });
    it('Deve retornar 409 para usuário com o email já cadastrado ao registrar usuário', async () => {
        const response = await request(app).post('/register_user').send({
            "username": "carrara-taxi",
            "first_name": "miqueias",
            "last_name": "garcia",
            "email": "TESTEEEEE@GMAIL.COM",
            "password": "senhamassa123"
        });
        expect(response.statusCode).toBe(409);
    });
    it('Deve retornar status 500 em caso de erro interno', async () => {
        // Simulando um erro interno no servidor
        jest.spyOn(prisma.user, "findFirst").mockRejectedValueOnce(new Error('Erro interno'));
        const res = await request(app).post(`/register_user`).send({
            "username": "carrara-taxi",
            "first_name": "miqueias",
            "last_name": "garcia",
            "email": "TESTEEEEE@GMAIL.COM",
            "password": "senhamassa123"
        });
        expect(res.statusCode).toBe(500);
    });
    //Teste para a rota de confirmação de usuário
    // it('Deve retornar 200 ao confirmar um usuário', async () => {
    //     let random_token = randToken.generate(6, process.env.CONFIRMATION_TOKEN_DICTIONARY);
    //     let current_date = new Date;
    //     let token_expiry_time = parseInt(process.env.TOKEN_EXPIRY_TIME);
    //     let expiry_time = time.time_in_future(current_date, token_expiry_time);

    //     prisma.emailConfirmation.create({
    //         data: {
    //         username: "taxi-carrara",
    //         email: "taxi-carrara",
    //         first_name: "taxi-carrara",
    //         last_name: "taxi-carrara",
    //         password: "taxi-carrara",
    //         token_confirmed: false,
    //         token_confirmation: random_token,
    //         token_generate_time: current_date,
    //         token_expiry_time: expiry_time
    //         }
    //     });
    //     const response = await request(app).post('/register_user').send({
    //         "username": "taxi-carrara",
    //         "token_confirmation": random_token,
    //     });
    //     expect(response.statusCode).toBe(200);
    //     });
    });

//rota de comfirmação
describe("Testar rota de confirmação", () =>{
    it("Deve retornar 400 para entrada inválida ao confirmar usuário", async()=>{
        const res = await request(app).post("/confirm_user")
        .send({});
        expect(res.statusCode).toBe(400);
    })
    // it('Deve retornar 404 para usuário não cadastrado ao confirmar usuário', async () => {
    //     const response = await request(app).post('/confirm_user').send({
    //         "username": "carrara-taxi",
    //         "first_name": "miqueias",
    //         "last_name": "garcia",
    //         "email": "miqueiasgg@gmail.com",
    //         "password": "senhamassa123",
    //         "token_confirmation":"token_confirmation"
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
})
// afterAll(async () => {
//     await prisma.emailConfirmation.deleteMany();
// });
afterAll((done) => {
    server.close(() => {
        done();
    });
});