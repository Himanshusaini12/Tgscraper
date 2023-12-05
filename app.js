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
const stringSession = new StringSession("1BQANOTEuMTA4LjU2LjE0NgG7xw3qCO18Y6xzzXSdmhLxxcglAWvwy/L9c/2XHx2NTOtQiBv5xPyGmH97M4wq97nJa0lx8yRcVVD9ybcD4wKGio+VGs7AX5LJki5HiFWGgdA9NMxNolRRQvpBUyKcfvU4D81CjCJu9WJZ36uFm9MRKTCseYMxFpwX7v+KqoTHTEwuaDdZdRtGvjkLaaY8Q87LAnPTaJV9qbuNsXhITIqre6z0NtWP4RyUe0v1LoD6yXAxYgKH8cbpILPjblYPjfQqCjXTjVReV/vbEdk8VGWciNlUnLfsOduh5R/ucxdfB16ALdvSersCo3wzpv568C+M8qIgb2AjWb01HJTg8lwNnw==")
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


app.get('/save2', async (req, res) => {
    try {
        // Connect to Telegram
        await client.connect();
    
        // Replace 'channelUsername' with the actual username of the channel (e.g., 't.me/example_channel')
        const channelUsername = 'breachdetector';
    
        // Replace 'limit' with the number of messages you want to retrieve
        const limit = 1000;
        let maxId = 83000;
        let minId = 80000;
        // Fetch messages from Telegram
        
      while(maxId<300000){ const messages = await client.getMessages(channelUsername, { maxId ,minId});
        //const messages = await client.getMessages(channelUsername,{id:2})
          //console.log(messages)
        // Save messages to MongoDB 
        for (const telegramMessage of messages) {

            const exists = await Message.exists({Mid: telegramMessage.id});
           if(!exists && telegramMessage.message){
            
          const newMessage = new Message({
            content: telegramMessage.message,
            Mid:telegramMessage.id ,
            // Add other fields as needed
          });
           console.log(telegramMessage.id )
          await newMessage.save();
                 }
        }

        minId=maxId;
        maxId=maxId+3000;
      
      
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