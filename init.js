const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("Database connected.\nAll data Pushed to Database.");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "alice",
    to: "bob",
    message: "Hello, Bob!",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "charlie",
    to: "dave",
    message: "Hey, Dave!",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "eve",
    to: "frank",
    message: "Hi, Frank!",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "grace",
    to: "heidi",
    message: "Hello, Heidi!",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "ivan",
    to: "judy",
    message: "Hi, Judy!",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

Chat.insertMany(allChats);
