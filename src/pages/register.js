import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("All fields are required");

    localStorage.setItem("myAppUser", JSON.stringify({ username, password }));
    alert("Registered successfully! Please login.");
    router.push("/login");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value.trim())}
          required
          style={{ width:"100%", padding:"8px", marginBottom:"10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width:"100%", padding:"8px", marginBottom:"10px" }}
        />
        <button type="submit" style={{ padding:"10px 20px" }}>Register</button>
      </form>
    </div>
  );
}
