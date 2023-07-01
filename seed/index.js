const db = require("../db");
const { User, Chat } = require("../models");

const main = async () => {
  const user1 = new User({
    email: "a@a.com",
    displayname: "TestUser",
    password: "a",
  });
  await user1.save();

  // const chat1 = new Chat({
  //   messages: ["hey its me", "hello friend"],
  //   users: [user1._id],
  // });
  // await chat1.save();
};

const run = async () => {
  await main();
  await db.close();
};

run();
