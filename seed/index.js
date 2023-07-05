const db = require("../db");
const { User, Chat, Message } = require("../models");
// const chance = require('chance')

const main = async () => {
  
//64a1e8d7db55f7ed1aacb4f7 - b@b
  // const chat1 = new Chat({
  //   chatName: 'chat one',
  //   isGroupChat: false,
  //   users: ['64a02d55d8ecc769e13dfc1d', '64a1e8d7db55f7ed1aacb4f7'],
  //   latestMessage: '64a20bce869decbd4b2234e8'
  // });
  // await chat1.save();

  // const chat2 = new Chat({
  //   chatName: 'chat two',
  //   isGroupChat: false,
  //   users: ['64a02d55d8ecc769e13dfc1d', '64a1e8d7db55f7ed1aacb4f7'],
  //   latestMessage: '64a20c1c869decbd4b2234ea'
  // });
  // await chat2.save();

  // const chat3 = new Chat({
  //   chatName: 'chat three',
  //   isGroupChat: false,
  //   users: ['64a02d55d8ecc769e13dfc1d', '64a1e8d7db55f7ed1aacb4f7'],
  //   latestMessage: '64a20e50869decbd4b2234ee'
  // });
  // await chat3.save();

  const message1 = new Message({
    sender: '64a41390ff01f5542b35fca8',
    content: 'yo yo yo B',
    chat: '64a329c84fdb155924a68683'
  })
  await message1.save()
  
};



const run = async () => {
  await main();
  await db.close();
};

run();
