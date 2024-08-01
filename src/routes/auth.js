const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const JWT_SECRET = "your_secret_key";
const usersFilePath = path.join(__dirname, "../users.json");

// Функция для чтения пользователей из файла
function readUsers() {
  const usersData = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(usersData);
}

// Функция для записи пользователей в файл
function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Маршрут для регистрации
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(200).json({ message: "Пользователь уже существует" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  writeUsers(users);

  res.status(201).json({ message: "Пользователь зарегистрирован" });
});

// Маршрут для входа
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res
      .status(400)
      .json({ message: "Неверное имя пользователя или пароль" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Неверное имя пользователя или пароль" });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Маршрут для проверки авторизации
router.get("/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Неверный токен" });
    }
    res.json({ message: "Это защищённый маршрут", user });
  });
});

module.exports = router;
