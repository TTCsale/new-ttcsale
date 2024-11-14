const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// Your Telegram bot token and chat ID
const TELEGRAM_TOKEN = '7410108739:AAFpcexuuiNZYd3ZDzgIGPXBKJFGoCMIOeE';
const CHAT_ID = '5090735114';

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  // Log the incoming request data to check the structure
  console.log("Incoming Data: ", req.body);

  // Ensure the request contains both ticker and price
  const { ticker, price } = req.body;
  
  // Check if both ticker and price are defined
  if (ticker && price) {
    sendTelegramMessage(ticker, price);
    res.status(200).send("Alert received");
  } else {
    res.status(400).send("Invalid data");
  }
});

// Function to send the message to Telegram
function sendTelegramMessage(ticker, price) {
  const message = `Stock Alert: ${ticker} - ${price}`;

  // Telegram API endpoint
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;

  // Send the message to Telegram
  fetch(url)
    .then(response => response.json())
    .then(data => console.log('Message sent: ', data))
    .catch(error => console.error('Error sending message: ', error));
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
