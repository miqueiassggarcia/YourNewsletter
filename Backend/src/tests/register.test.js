const {app, server, prisma} = require("../server");
const request = require("supertest");

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
        jest.spyOn(prisma.user, "findFirst").mockRejectedValueOnce(new Error('Erro interno'));
        const res = await request(app).post(`/register_user`).send({
            "username": "noberto",
            "first_name": "NOBERTO",
            "last_name": "JUNIOR",
            "email": "NOBERTOJUNIOR2001@GMAIL.COM",
            "password": "Teste123!"
        });
        expect(res.statusCode).toBe(500);
    });
    });

//rota de comfirmação
describe("Testar rota de confirmação", () =>{
    it("Deve retornar 400 para entrada inválida ao confirmar usuário", async()=>{
        const res = await request(app).post("/confirm_user")
        .send({});
        expect(res.statusCode).toBe(400);
    })
    it('Deve retornar 404 para usuário não cadastrado ao confirmar usuário', async () => {
        const response = await request(app).post('/confirm_user').send({
            "username": "casda-taxi",
            "email": "miqugg@gmail.com",
            "token_confirmation":"token_confirmation"
        });
        expect(response.statusCode).toBe(404);
        });
    it('Deve retornar 409 para usuário já confirmado ao confirmar usuário', async () => {
        // Certifique-se de que o usuário já está confirmado no banco de dados
        const response = await request(app).post('/confirm_user').send({
            "username": "noberto",
            "email": "NOBERTOJUNIOR2001@GMAIL.COM",
            "token_confirmation": 'PO1AF4',
            });
        expect(response.statusCode).toBe(409);
        });
    it('Deve retornar 401 para token expirado ao confirmar usuário', async () => {
        const response = await request(app).post('/confirm_user').send({
            "username": 'agostinho',
            "email":"nobertonunes2001@gmail.com",
            "token_confirmation": 'K62CE8',
        });
        expect(response.statusCode).toBe(401);
        });
    it('Deve retornar 401 para token que errado', async () => {
        const response = await request(app).post('/confirm_user').send({
            "username": 'carrara-taxi',
            "email":"miqueidfasjdfijasidfjiajsidfjiasdj@gmail.com",
            "token_confirmation": 'K6dgdf2CE8',
        });
        expect(response.statusCode).toBe(401);
        });
    it('Deve retornar 500 para erro no servidor', async () => {
        jest.spyOn(prisma.emailConfirmation, "findFirst").mockRejectedValue(new Error('Erro interno'));
        const response = await request(app).post(`/confirm_user`).send({
            "username": "noberto",
            "email": "NOBERTOJUNIOR2001@GMAIL.COM",
            "token_confirmation": "Teste123!",
        });
        expect(response.statusCode).toBe(500);
        });
})
afterAll((done) => {
    server.close(() => {
        done();
    });
});