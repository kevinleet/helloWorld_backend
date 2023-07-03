const db = require("../db");
const { User, Chat } = require("../models");
// const chance = require('chance')

const main = async () => {
  const user1 = new User({
    email: "a@a.com",
    displayname: "TestUser",
    password: "a",
  });
  await user1.save();

  const chat1 = new Chat({
    chatName: 'chat one',
    isGroupChat: false,
    users: [user1._id, '64a03312e5e773ab0dc7c273'],
    latestMessage: '64a20af86aa38f647ebdb660'
  });
  await chat1.save();

  const chat2 = new Chat({
    chatName: 'chat two',
    isGroupChat: false,
    users: [user1._id, '64a03312e5e773ab0dc7c273'],
    latestMessage: '64a20b396aa38f647ebdb662'
  });
  await chat2.save();

  const chat3 = new Chat({
    chatName: 'chat two',
    isGroupChat: false,
    users: [user1._id, '64a03312e5e773ab0dc7c273'],
    latestMessage: '64a20b846aa38f647ebdb666'
  });
  await chat3.save();
  
};



const run = async () => {
  await main();
  await db.close();
};

run();
