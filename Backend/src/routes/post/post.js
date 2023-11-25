const send_post = require('./post_routes/send_post.js');
const get_posts_from_newsletter = require('./post_routes/get_posts_from_newsletter.js');

module.exports = function (app, prisma, http_status, schedule) {
    send_post(app, prisma, http_status, schedule);
    get_posts_from_newsletter(app, prisma, http_status, schedule);
}