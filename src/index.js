const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка сессий
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Убедитесь, что это false для разработки, но true для продакшена с HTTPS
  })
);

// Настройка body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Указание на использование статических файлов
app.use(express.static(path.join(__dirname)));

// Настройка маршрутов авторизации
app.use("/auth", authRoutes);

// Обработчик для корневого маршрута
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
