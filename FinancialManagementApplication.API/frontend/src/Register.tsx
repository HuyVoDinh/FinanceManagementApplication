import { useState } from "react";
import { register } from "./services/authService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await register(email, password);
      setMessage("Register success!");
    } catch {
      setMessage("Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
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

      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
}