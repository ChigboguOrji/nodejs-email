## Emails within Nodejs using Nodemailer

In this demo, we use gmail as the transport service

### HOW IT WORKS

- [x] I use [Node events](https://nodejs.org/api/events.html) to simulate message sending

- [x] The event api triggers a send message event 5 seconds after the server starts

##### ENVIRONMENT VARIABLES

- [x] PORT - server port

- [x] SERVICE - Email service providers which may be one of gmail, outlook or yahoo

- [x] USER - An email address to be used in sending messages

- [x] PASS - Password to the email address used in sending message
      This is required so your would log in to your email account and send a message through it

- [x] SENDER - This will appear to the receiver as the message sender

- [x] RECEIVER - Could be one, an array or comma-separated list of receivers

### COMMANDS
- git clone https://github.com/chigboguorji/nodejs-email.git

- cd nodejs-email

- yarn start
