const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json()); // to parse incoming JSON requests

// Set up the route for receiving Chartink webhook alerts
app.post('/webhook', (req, res) => {
    const data = req.body;

    // Your Telegram bot token and chat ID
    const telegramToken = '7410108739:AAFpcexuuiNZYd3ZDzgIGPXBKJFGoCMIOeE';
    const chatId = '5090735114';

    // Prepare the message to send to Telegram
    const message = `Stock Alert: ${data.ticker} triggered an alert!`;

    // Send the message to Telegram using the Telegram Bot API
    axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        chat_id: chatId,
        text: message
    })
    .then(response => {
        res.status(200).send('Alert sent to Telegram!');
    })
    .catch(error => {
        res.status(500).send('Error sending alert');
    });
});

// Set the server to listen on port 3000 (or any other port you want)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
