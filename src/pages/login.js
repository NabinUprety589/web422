import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("myAppUser"));

    if (!storedUser) {
      setError("No registered user found. Please register first.");
      return;
    }

    if (storedUser.username === username.trim() && storedUser.password === password) {
      localStorage.setItem("loggedIn", "true"); 
      router.push("/search");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
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
        <button type="submit" style={{ padding:"10px 20px" }}>Login</button>
      </form>

      {error && <p style={{ color:"red", marginTop:"10px" }}>{error}</p>}

      <p style={{ marginTop:"20px" }}>
        Don't have an account?{" "}
        <button
          onClick={() => router.push("/register")}
          style={{ color:"blue", textDecoration:"underline", background:"none", border:"none", cursor:"pointer" }}
        >
          Register
        </button>
      </p>
    </div>
  );
}
