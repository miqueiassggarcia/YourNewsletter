const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
    let t = await prisma.newsletterSubscribers.findFirst({
        where: {
            user_username: "roxy22"
        }
    });

    console.log(t);
};


test();