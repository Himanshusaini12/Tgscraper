const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input

const apiId = 23108480;
const apiHash = "7b2ee1e77021c80d120a2abfe0087f76";
const stringSession = new StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEAUImC/dLCGEdHpTIFY59Cz4XBSn9yHSxnoHmVwEjIoPScA3Sc4tMstXwE55K88vQKbltmrveY4YgRDgjXB4pEllGmdlW3tqztvjC8S49fABLU6QacQaFF8lpqEsLpFE12XsnV4SNhSq8m/yQzJFRB4qW9kBnHhf9jPiGPOlSIQCSdwVajq16CYZiUJAq6ArTaR4Oa7dg5qHGrbVXHMtlXChrNR7XM8P71BIYeaGAlhTu9LZAoGZkh/P9bHDh0oJb4iUU6Ik7DQT8bK0XMGLbtX68EPcS9HDUaQj9h7vuu49KirtkcwJU75xJTa4rHhBMC9HAJz0LhCxerK9lc1vt2KA8=")
const { Api } = require("telegram/tl");

const client = new TelegramClient(stringSession, apiId, apiHash, {});

// (async function run() {
//   await client.connect(); // This assumes you have already authenticated with .start()

//   // Replace 'channelUsername' with the actual username of the channel (e.g., 't.me/example_channel')
//   const channelUsername = 'breachdetector';//https://t.me/breachdetector
  
//   // Replace 'limit' with the number of messages you want to retrieve
//   const limit = 1;
  
//   const messages = await client.getMessages(channelUsername, { limit });
//   messages.forEach((message) => {
//     console.log(message.message);
//     console.log('-------------------');
//   });
//   // Print the retrieved messages
//   //console.log(messages);
// })();

(async function run() {
    // Function to send messages
    const sendMessage = async () => {
      await client.connect(); // This assumes you have already authenticated with .start()
  
      const channelUsername = 'officialcryptodaily'; // Replace with your channel username
  
      const limit = 1;
  
      const messagesData = await client.getMessages(channelUsername, { limit });
      const messageContent = messagesData[0].message;
  //https://t.me/cryprotesting//
      const result = await client.invoke(
        new Api.messages.SendMessage({
          peer: "cryprotesting",
          message: messageContent,
          randomId: messagesData[0].id,
          noWebpage: true,
          noforwards: true,
          scheduleDate: 43,
        })
      );
    };
  
    // Run the function initially
    await sendMessage();
  
    // Set up an interval to run the function every 10 seconds
    setInterval(async () => {
      await sendMessage();
    }, 60000); // 10000 milliseconds = 10 seconds
  })();
  
  //https://t.me/officialcryptodaily