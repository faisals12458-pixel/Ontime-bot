const express = require('express');
const axios = require('axios');
const app = express();

const TOKEN = process.env.TOKEN || "APNA_META_TOKEN_YAHAN";
const PHONE_ID = process.env.PHONE_ID || "APNA_PHONE_ID_YAHAN";

app.get('/', (req, res) => {
  res.send("Ontime Bot Chal Raha Hai");
});

app.get('/sms', async (req, res) => {
  const mobile = req.query.mobile || req.query.recipient || req.query.to;
  const message = req.query.message || req.query.Message || "Punch hua";
  console.log("OnTime se aaya:", mobile, message);
  if (mobile) {
    await axios.post(`https://graph.facebook.com/v21.0/${PHONE_ID}/messages`, {
      messaging_product: "whatsapp",
      to: mobile,
      type: "text",
      text: { body: message }
    }, { headers: { Authorization: `Bearer ${TOKEN}` } });
  }
  res.send("OK");
});

app.listen(process.env.PORT || 3000);
