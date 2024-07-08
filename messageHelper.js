var axios = require("axios");

function sendMessage(data) {
  //   var config = {
  //     method: 'post',
  //     url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
  //     headers: {
  //       'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
  //       'Content-Type': 'application/json'
  //     },
  //     data: data
  //   };

  //   return axios(config)
  const apiUrl = `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`;
  try {
    const response = axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const result = response.data
    console.log("Result", result)
    return {data: result}
  } catch (error) {
    console.log("Error >>", error.message);
  }
}

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: "919619638350",
    type: "text",
    text: {
      body: text,
    },
  });
}

module.exports = {
  sendMessage: sendMessage,
  getTextMessageInput: getTextMessageInput,
};
