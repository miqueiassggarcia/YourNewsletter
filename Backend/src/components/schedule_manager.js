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
                await this.create_schedule(posts[i]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async send_post(post) {
        let emails = await dbm.get_email_newsletter_subscribers(this.prisma, post.id_newsletter);
        let send_date = new Date();
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
            }
        }
        await dbm.mark_sent_post(this.prisma, post.id, send_date);
        await dbm.increment_newsletter_post(this.prisma, post.id_newsletter);
    }

    // espera
    // {id: int, id_newsletter: int, scheduling_date: DateTime, sent: bool, subject: String, html: String}
    async create_schedule(post) {
        if (time.is_late(new Date(), post.scheduling_date)) {
            await this.send_post(post);
        } else {
            const task_date = new Date(post.scheduling_date);
            const task = schedule.scheduleJob(task_date, async function (_post, _schedule) {
                await _schedule.send_post(_post);
                const id = _schedule.tasks.findIndex((element) => {
                    return element.id == _post.id
                });
                if (id != -1) {
                    _schedule.tasks.splice(id, 1);
                }
            }.bind(null, post, this));
            this.tasks.push({
                id: post.id,
                task: task
            })
        }
    }
}

module.exports = { ScheduleManager };