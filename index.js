require("dotenv").config();
const http = require("http");
const express = require("express");
const nodemailer = require("nodemailer");
const events = require("events");

// cache our env variables
const SERVICE = process.env.SERVICE; // Email servicce providers (eg, outlook, gmail, hotmail)
const USER = process.env.USER; // valid email address
const PASS = process.env.PASS; // email password
const SENDER = process.env.SENDER; // valid email addrees
const RECEIVER = process.env.RECEIVER; // valid email address
const PORT = process.env.PORT || 5050;

// to trigger automatic email sending
const eventEmitter = new events.EventEmitter();

// initialize server instance
const server = express();

// configure message options
const messageOptions = {
  from: SENDER,
  to: RECEIVER,
  subject: "Sending emails in Nodejs app with Nodemailer sample",
  html: `
    <h1>Nodemailer emailling within Nodejs application</h1>
    <p>You're receiving this email from Nodejs emailer sample</p>
  `,
};

// create message transport
const transporter = nodemailer.createTransport({
  service: SERVICE,
  auth: {
    user: USER,
    pass: PASS,
  },
});

// actual sending
const sendMessage = () => {
  transporter.sendMail(messageOptions, (err, info) => {
    if (err) {
      console.log("Error while sending ________%s_______", err);
      process.exit(0);
    }
    console.log(info);
  });
};

// since this is a demo project
// we'll use event emitter to register sendNotification
// after 5 seconds of our server connection
eventEmitter.on("sendNotification", () => {
  console.info("sending message...");
  sendMessage();
});

setTimeout(() => {
  // trigger a sendNotification event
  eventEmitter.emit("sendNotification");
}, 5000);

// Determine if our app is ran directly (standalone app) or as a required module
// if ran directly, its require.main === module, then we spin up the server

if (require.main === module) {
  http.createServer(server).listen(() => console.log("server on localhost:%s", PORT));
} else {
  // export the server instance to be used as a module
  // usch as in testing environments
  module.exports = server;
}
