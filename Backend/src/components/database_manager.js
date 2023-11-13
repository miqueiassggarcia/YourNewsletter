async function user_have_newsletter(prisma, user_username, newsletter_id) {
    let response = await prisma.NewsLetter.findUnique({
        where: {
            id: newsletter_id,
            userUsername: user_username
        }
    })

    return response != null;
}

async function create_post_newsletter(prisma, newsletter_id, scheduling_date, send_date, subject, html) {
    let response = await prisma.newsLetter.update({
        where: {
            id: newsletter_id
        },
        data: {
            newsletter_posts: {
                create: {
                    scheduling_date: scheduling_date,
                    send_date: send_date,
                    sent: false,
                    subject: subject,
                    html: html
                }
            }
        }
    });

    return true;
}

module.exports = {
    user_have_newsletter,
    create_post_newsletter
};