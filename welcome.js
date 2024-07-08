var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
require("dotenv").config();
const { sendMessage, getTextMessageInput } = require("./messageHelper");
const { default: axios } = require("axios");

router.use(bodyParser.json());

router.post("/send-message", async function (req, res, next) {
  var data = getTextMessageInput(process.env.RECIPIENT_WAID, 'Welcome to the Movie Ticket Demo App for Node.js!');
  sendMessage(data)
  .then(function (response) {
    res.status(200).json(response.data);
    return;
  })
  .catch(function (error) {
    console.log("Error while sending message", error);
    console.log(error.response.data);
    res.sendStatus(500);
    return;
  });
  
});

module.exports = router;
