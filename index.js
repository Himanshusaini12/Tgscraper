const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input

const apiId = 20498413;
const apiHash = "bc5867661c1ad3d16cb9cffc99638aab";
const stringSession = new StringSession("1BQANOTEuMTA4LjU2LjE5OQG7vORpf4gPPs9rFcx02w/1qKYPMiZ3X3hSIkr4mxqXNr5Ju3izsSRZjSaOdLMLRq+gbAi2RBUyQyDyXPQrLHJzN/IxPMMvsXtOcqMheBmNjrjd/t+GxVOJFYA9h/QUV/MuajAITEcp9mq5mOCdD+qQaPLTDBG3/D4xyD9KhgNaeMODHLFD7mR5hMSgKKX9PI5AwIx803tjr7gWzdt/vwhCkUE5A3NY3b2lZ1zUPRDRiCwa5M0F9ZHJCBWEP167iJj9RDH6XhMMBcU9LLbCSfZNmrSfG2NFb7ZQrAEYgh1qS/I5MGclHtSVdw0yrKxknah+zJTvVmAZFSyPjJktqKpQMQ=="); // fill this later with the value from session.save()
const { Api } = require("telegram/tl");

const client = new TelegramClient(stringSession, apiId, apiHash, {});

(async function run() {
  await client.connect(); // This assumes you have already authenticated with .start()

  // Replace 'channelUsername' with the actual username of the channel (e.g., 't.me/example_channel')
  const channelUsername = 'breachdetector';//https://t.me/breachdetector
  
  // Replace 'limit' with the number of messages you want to retrieve
  const limit = 1;
  
  const messages = await client.getMessages(channelUsername, { limit });
  messages.forEach((message) => {
    console.log(message.message);
    console.log('-------------------');
  });
  // Print the retrieved messages
  //console.log(messages);
})();