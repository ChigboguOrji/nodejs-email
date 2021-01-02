'use strict';
const nodemailer = require('nodemailer')

class MailService {
    constructor(service, user, pass, sender) {
        this.sender = sender

        this.transporter = nodemailer.createTransport({
            service: service,
            auth: {
                user: user,
                pass: pass
            }
        })
    }

    /**
     * 
     * @param {*} from 
     * @param {*} recipients 
     * @param {*} subject 
     * @param {*} text 
     */
    constructMsg(recipients, subject, text, from) {
        return {
            sender: this.sender,
            from: from || this.sender,
            bcc: recipients.toString(),
            subject,
            text
        }
    }

    /**
     * 
     * @param {*} subject 
     * @param {*} recipients 
     * @param {*} msg 
     */
    async send(subject, recipients, msg) {
        return await this.transporter.sendMail(this.constructMsg(recipients,subject, msg))
    }
}

module.exports = MailService