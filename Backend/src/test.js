const dbm = require('./components/database_manager');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    try{
        await dbm.create_post_newsletter(prisma, 1, new Date(), new Date(), "test", "teste", "test");
    } catch (error) {
        console.log(error);
    }
}

main();
  


//const schedule = require('node-schedule');
//const date = new Date(2023, 10, 14, 9, 2, 0);
//var x = 'Tada!';
//const job = schedule.scheduleJob(date, function(y){
//  console.log(y);
//}.bind(null,x));
//x = 'Changing Data';