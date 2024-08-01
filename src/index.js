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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname)));

app.set("view engine", "ejs");

app.use("/auth", authRoutes);
// Обработчик для корневого маршрута
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views", "index.ejs"));
});
app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "views", "login.ejs"));
});
app.get("/profile", (req, res) => {
  res.render(path.join(__dirname, "views", "profile.ejs"));
});
app.get("/register", (req, res) => {
  res.render(path.join(__dirname, "views", "register.ejs"));
});

// Маршрут для регистрации пользователя
app.post("/auth/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Логика регистрации пользователя
  // Например, сохранение пользователя в базу данных
  console.log(`Registering user: ${username}`);

  // Возвращаем успешный ответ
  res.status(201).json({ message: "User registered successfully!" });
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
