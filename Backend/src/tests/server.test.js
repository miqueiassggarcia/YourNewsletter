const app = require("../server");
const prisma = require("../server");
const request = require("supertest");

describe("testar rota principal", () => {
  it("deve retornar 200", async () => {
    const res = await request(app).post("/register_user").send({
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
})

describe("Testar rota de confirmação", () =>{
  it("Deve retornar 400", async()=>{
    const res = await request(app).post("/confirm_user").send({});
    expect(res.statusCode).toBe(400);
  })
})