import { useState } from "react";
import { login } from "./services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      localStorage.setItem("token", result.token);
      setMessage("Login success");
      console.log("JWT:", result.token);
    } catch {
      setMessage("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}