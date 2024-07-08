var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
require("dotenv").config();
const { sendMessage, getTextMessageInput } = require("./messageHelper");
const { default: axios } = require("axios");

router.use(bodyParser.json());

router.post("/send-message", async function (req, res, next) {
  var data = getTextMessageInput(process.env.RECIPIENT_WAID, 'Welcome to the Movie Ticket Demo App for Node.js!');
  console.log("data", data)

  const apiUrl = `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`;
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const result = response.data;
    console.log("Result", result);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error >>", error);
  }
});

module.exports = router;
