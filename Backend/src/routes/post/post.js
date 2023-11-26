const send_post = require('./post_routes/send_post.js');

module.exports = function (app, prisma, http_status, schedule) {
    send_post(app, prisma, http_status, schedule);
}