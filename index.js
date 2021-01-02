'use strict';
require("dotenv").config();
const express = require("express");
const mailer = require('./mailer')
const PORT = process.env.PORT || 5050;
const app = express();

const SERVICE = process.env.SERVICE;
const USER = process.env.APP_USER;
const PASS = process.env.PASS;


app.use(express.json({ limit: '1kb' }))
app.use(express.urlencoded({ extended: false }))

// Pinging server
app.get('/', (req, res) => res.sendStatus(200))

app.post('/send/:sender', async (req, res, next) => {
    const subject = req.body.title || 'Hello there!'
    const msg = req.body.msg
    const recipients = req.body.recipients
    const sender = req.params.sender || '<no-reply@orji@test.com>'

    try {
        const mail = new mailer(SERVICE, USER, PASS, sender)
        const send = await mail.send(subject, recipients, msg)
        const data = {message_id: send.messageId, envelope: send.envelope.from }
        res.status(200).send({message: 'Mail sent', status: 200, success: true, data})
    } catch (err) {
        next(err)
    }
})

app.use('*', (req, res) => {
    res.status(404).send({message: 'Not found', status: 404, success: false})
})

app.use((err, req, res, next) => {
    console.log('got it here >> ')
    res.status(er.status).send({message: 'Internal Server Error', status: 500, success: false})
})

if (require.main === module) {
    app.listen(() => console.log("app on localhost:%s", PORT));
} 

module.exports = app;