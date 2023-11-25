const dbm = require('./components/database_manager');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    try{
        let response = await dbm.get_posts_from_newsletter(prisma, 1);
        for (let i = 0; i < response.length; i++) {
            console.log(response[i]);
        }
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