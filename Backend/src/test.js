const dbm = require('./components/database_manager');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    try{
        const inscricoes = await prisma.newsLetter.findMany({
            include: {
                _count: {
                    select: {
                        newsletter_subscribers: true
                    }
                } 
            },
            orderBy: {
                newsletter_subscribers: {
                    _count: 'desc'
                }
            },
            take: 10
        });

        console.log(inscricoes)
        for (let i = 0; i < inscricoes.length; i++) {
            console.log(inscricoes[i]);
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