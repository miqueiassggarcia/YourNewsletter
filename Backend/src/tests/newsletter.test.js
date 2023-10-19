const {app, server} = require("../server");
const prisma = require("../server");
const request = require("supertest");


describe("Testar rota de newsletter", () =>{
    it("Deve retornar 401", async()=>{
        const res = await request(app).post("/create_newsletter").send({});
        expect(res.statusCode).toBe(401);
    })
})

afterAll((done) => {
    // Fecha o servidor Express
    server.close(() => {
        done();
    });
});