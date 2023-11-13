const databaseManager = require('./components/database_manager.js');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    let result = await databaseManager.create_post_newsletter(prisma, 1, new Date(), new Date(), "helloo", "dkskdskdkdksdkkdskdks");
    console.log(result);
}

main();