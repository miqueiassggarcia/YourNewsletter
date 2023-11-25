const send_post = require('./post_routes/send_post.js');
const get_posts_from_newsletter = require('./post_routes/get_posts_from_newsletter.js');
const update_post_subject = require('./post_routes/update_post_subject.js');

module.exports = function (app, prisma, http_status, schedule) {
    send_post(app, prisma, http_status, schedule);
    get_posts_from_newsletter(app, prisma, http_status, schedule);
    update_post_subject(app, prisma, http_status, schedule);
}