import { addUser, findUser } from "../../data/users";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    if (findUser(username, password)) {
      return res.status(400).json({ message: "User already exists" });
    }

    addUser(username, password);
    return res.status(200).json({ message: "User registered" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
