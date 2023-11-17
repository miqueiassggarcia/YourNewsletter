require('dotenv').config();
const schedule = require('node-schedule');
const dbm = require('./database_manager');
const time = require('./time.js');
const sendEmail = require('../email_service.js');

class ScheduleManager {
    constructor(prisma) {
        this.prisma = prisma;
        this.tasks = [];
    }

    async check_unsent_posts() {
        try {
            let posts = await dbm.get_unsent_posts(this.prisma);
            for (let i = 0; i < posts.length; i++) {
                if (time.is_late(new Date(), posts[i].scheduling_date)) {
                    await this.send_post(posts[i]);
                } else {
                    const task_date = new Date(posts[i].scheduling_date);
                    const task = schedule.scheduleJob(task_date, async function (post) {
                        await this.send_post(post);
                        const id = this.tasks.findIndex((element) => {
                            return element.id == post.id
                        });
                        if (id != -1) {
                            this.tasks.splice(id, 1);
                        }
                    }.bind(null, posts[i]));
                    this.tasks.push({
                        id: posts[i].id,
                        task: task
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async send_post(post) {
        let emails = await dbm.get_email_newsletter_subscribers(this.prisma, post.id_newsletter);
        if (emails) {
            if (emails.length > 0) {
                let to = emails.join(', ');
                let email_options = {
                    from: process.env.EMAIL_USER,
                    to: to,
                    subject: post.subject,
                    html: post.html
                }
        
                sendEmail(email_options);
                await dbm.mark_sent_post(this.prisma, post.id);
            }
        }
    }
}

module.exports = { ScheduleManager };