const express = require("express");
const { constants } = require("http2");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen(8080, () => {
  console.log("Server is running on localhost:8080");
});

main()
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/", (req, res) => {
  res.send("Home route is working.");
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/chats/new", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: msg,
    created_at: new Date(),
    updated_at: new Date(),
  });

  newChat
    .save()
    .then((resolve) => {
      console.log(resolve, "Chat saved!");
    })
    .catch((error) => {
      console.log(error);
    });
  res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMessage } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMessage, updated_at: new Date() },
    { runValidators: true, new: true },
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});
