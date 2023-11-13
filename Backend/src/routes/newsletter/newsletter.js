const create_newsletter = require('./newsletter_routes/create_newsletter.js');
const delete_newsletter = require('./newsletter_routes/delete_newsletter.js');
const update_newsletter_name = require('./newsletter_routes/update_newsletter_name.js');
const update_newsletter_description = require('./newsletter_routes/update_newsletter_description.js');
const newsletter_search = require('./newsletter_routes/newsletter_search.js');
const get_my_newsletters = require('./newsletter_routes/get_my_newsletters.js');
const newsletter_from_user = require('./newsletter_routes/newsletters_from_user.js');
const newsletter_subscribe = require('./newsletter_routes/newsletter_subscribe.js');
const newsletter_unsubscribe = require('./newsletter_routes/newsletter_unsubscribe.js');
const check_newsletter_subscription = require('./newsletter_routes/check_newsletter_subscription.js');
const my_subscribed_newsletters = require('./newsletter_routes/my_subscribed_newsletters.js');
const send_post = require('./newsletter_routes/send_post.js');


module.exports = function (app, prisma, http_status) {
    create_newsletter(app, prisma, http_status);
    delete_newsletter(app, prisma, http_status);
    update_newsletter_name(app, prisma, http_status);
    update_newsletter_description(app, prisma, http_status);
    newsletter_search(app, prisma, http_status);
    get_my_newsletters(app, prisma, http_status);
    newsletter_from_user(app, prisma, http_status);
    newsletter_subscribe(app, prisma, http_status);
    newsletter_unsubscribe(app, prisma, http_status);
    check_newsletter_subscription(app, prisma, http_status);
    my_subscribed_newsletters(app, prisma, http_status);
    send_post(app, prisma, http_status);
}