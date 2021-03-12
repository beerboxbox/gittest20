'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
// const config = {
//   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
//   channelSecret: process.env.CHANNEL_SECRET,
// };

const config = {
    channelAccessToken: "3YswB9TvRW2JIJeoKoW72l8uY8b6DsBL2AtAvISXC7zvzcWEY35IXlS53okXNiZLeFXWnt204K5ULPmPuz8Tw4aU5zxen+ixb5vrzglQ4qCwR3/2ADh7NcULIue6FW8ZAuJFP3JhXJA6JDdvZgmt1wdB04t89/1O/w1cDnyilFU=",
    channelSecret: "d3b3efabd91b4f10d11eef8a7674c471",
  };

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
