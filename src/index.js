const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));
// For testing purposes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
  console.log("path.join", path.join);
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
