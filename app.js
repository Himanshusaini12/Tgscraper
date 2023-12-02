const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const Message = require('./model.js');

const morgan = require("morgan");
//--------------
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input

const apiId = 20498413;
const apiHash = "bc5867661c1ad3d16cb9cffc99638aab";
const stringSession = new StringSession("1BQANOTEuMTA4LjU2LjE5OQG7vORpf4gPPs9rFcx02w/1qKYPMiZ3X3hSIkr4mxqXNr5Ju3izsSRZjSaOdLMLRq+gbAi2RBUyQyDyXPQrLHJzN/IxPMMvsXtOcqMheBmNjrjd/t+GxVOJFYA9h/QUV/MuajAITEcp9mq5mOCdD+qQaPLTDBG3/D4xyD9KhgNaeMODHLFD7mR5hMSgKKX9PI5AwIx803tjr7gWzdt/vwhCkUE5A3NY3b2lZ1zUPRDRiCwa5M0F9ZHJCBWEP167iJj9RDH6XhMMBcU9LLbCSfZNmrSfG2NFb7ZQrAEYgh1qS/I5MGclHtSVdw0yrKxknah+zJTvVmAZFSyPjJktqKpQMQ=="); // fill this later with the value from session.save()
const { Api } = require("telegram/tl");
const e = require("express");

const client = new TelegramClient(stringSession, apiId, apiHash, {});
//--------------
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.get('/save', async (req, res) => {
    try {
        // Connect to Telegram
        await client.connect();
    
        // Replace 'channelUsername' with the actual username of the channel (e.g., 't.me/example_channel')
        const channelUsername = 'breachdetector';
    
        // Replace 'limit' with the number of messages you want to retrieve
        const limit = 50;
    
        // Fetch messages from Telegram
        const messages = await client.getMessages(channelUsername, { limit });
          //console.log(messages)
        // Save messages to MongoDB
        for (const telegramMessage of messages) {

            const exists = await Message.exists({Mid: telegramMessage.id});
           if(!exists){
            
          const newMessage = new Message({
            content: telegramMessage.message,
            Mid:telegramMessage.id ,
            // Add other fields as needed
          });
           
          await newMessage.save();
        
        }
        }
    
        console.log('Messages saved to MongoDB');
        res.json({ message: 'Messages saved successfully' });
      } catch (error) {
        console.log(error)
      res.status(500).json({ error  });
    }
  });
  
  app.get('/msg', async (req, res) => {
    try {
      // Fetch all messages from MongoDB
      const messages = await Message.find();
  
      res.json(messages);
    } catch (error) {
      console.error('Error:', error.message || error);
      res.status(500).json({ error: 'Failed to fetch messages from MongoDB' });
    }
  });

module.exports = app;