const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(bodyParser.json());

let users = [
  { username: "nabin450", password: "password123" }, 
];

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const exists = users.find(u => u.username === username);
  if (exists) return res.json({ success: false, message: "Username already exists" });

  users.push({ username, password });
  res.json({ success: true, message: "Registration successful" });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ success: true, message: "Login successful!" });
  return res.json({ success: false, message: "Invalid credentials" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
