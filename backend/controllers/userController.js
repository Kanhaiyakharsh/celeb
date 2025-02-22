const accountSid = "AC229e275f0ba0d1f7453d7d63be731793";
const authToken = "5d450c7d46fbb0561b69514ca90b7a12";
const client = require("twilio")(accountSid, authToken);



const sendMessage = async (req, res) => {
  try {
    client.messages
      .create({
        body: req.body.message,
        from: "whatsapp:+14155238886",
        contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",
        contentVariables: '{"1":"12/1","2":"3pm"}',
        to: "whatsapp:+919001402531",
      })
      .then((message) => console.log("Message sent successfully"));

    return res
      .status(200)
      .json({ success: true, msg: "Message sent successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMessage,
};
