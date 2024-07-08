var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
require("dotenv").config();
const { sendMessage, getTextMessageInput } = require("./messageHelper");

router.use(bodyParser.json());

router.post("/", async function (req, res, next) {
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
