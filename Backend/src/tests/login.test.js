const {app, server} = require("../server");
const prisma = require("../server");
const request = require("supertest");

describe("Testar rota de login", () =>{
    it("Deve retornar 400 para usuario invalido", async()=>{
        const res = await request(app).post("/login")
        .send({});
        expect(res.statusCode).toBe(400);
    })
    it("Deve retornar 404 para usuario não cadastrado", async()=>{
        const res = await request(app).post("/login")
        .send({
            "username": "Agostinho",
            "password": "Carrara",
        });
        expect(res.statusCode).toBe(404);
    })
    it("Deve retornar 200 para autenticação bem-sucedida", async () => {
        const res = await request(app).post("/login").send({
            "username": "noberto",
            "password": "Teste123!",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("username");
        expect(res.body).toHaveProperty("first_name");
        expect(res.body).toHaveProperty("last_name");
        expect(res.body).toHaveProperty("email");
        });
    // it("Deve retornar 401 para autenticação falha", async () => {
    //     const res = await request(app).post("/login").send({
    //         "username": "noberto",
    //         "password": "senha_incorreta", 
    //         });
    //     expect(res.statusCode).toBe(401);
    //     expect(res.body).toEqual({ "message": "erro ao autenticar usuário" });
    //     });
});

describe("Testar rota de logout", () => {
    it("Deve retornar 200 para logout bem-sucedido", async () => {
        const res = await request(app).get("/logout");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ "message": "usuário deslogado com sucesso" });
    });
});

afterAll((done) => {
    // Fecha o servidor Express
    server.close(() => {
        done();
    });
});