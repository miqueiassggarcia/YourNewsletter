async function user_have_newsletter(prisma, user_username, newsletter_id) {
    let response = await prisma.NewsLetter.findUnique({
        where: {
            id: newsletter_id,
            userUsername: user_username
        }
    })

    return response != null;
}

async function create_post_newsletter(prisma, newsletter_id, scheduling_date, subject, html) {
    let response = await prisma.post.create({
        data: {
          id_nl: {
            connect: { id: newsletter_id },
          },
          scheduling_date: scheduling_date,
          sent: false,
          subject: subject,
          html: html,
        },
    });


    return response;
}

// return 
// [{id: int, id_newsletter: int, scheduling_date: DateTime, sent: bool, subject: String, html: String}]
async function get_unsent_posts(prisma) {
    let posts = await prisma.post.findMany({
        where: {
            sent: false
        }
    })

    return posts;
}

// return 
// ['String']
// retorna null caso dê error
async function get_email_newsletter_subscribers(prisma, newsletter_id) {
    try {
        let all_emails = await prisma.newsLetter.findUnique({
            where: { id: newsletter_id },
            select: {
                newsletter_subscribers: {
                    select: {
                        ur_username: {
                            select: {
                                email: true
                            }
                        }
                    }
                }
            }
        });
    
        let emails = [];
        let aux = all_emails["newsletter_subscribers"];
        for(let i = 0; i < aux.length; i++) {
            emails.push(aux[i]["ur_username"]["email"]);
        }
        return emails;
    } catch (error) {
        console.log(error);
        return null;
    }
}


async function mark_sent_post(prisma, id_post, send_date) {
    try {
        await prisma.post.update({
            where: {
                id: id_post
            },
            data: {
                sent: true,
                send_date, send_date
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    user_have_newsletter,
    create_post_newsletter,
    get_unsent_posts,
    get_email_newsletter_subscribers,
    mark_sent_post
};