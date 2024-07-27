const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// const test = require("./flights.json");
app.use(express.static(path.join(__dirname)));

// For testing purposes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
  console.log("path.join", path.join);
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
  console.log("path.join", path.join);
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
  console.log("path.join", path.join);
});
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "profile.html"));
  console.log("path.join", path.join);
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
