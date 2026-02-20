import React, { useState } from "react";

export default function Login({ onLogin }) {

  // ✅ Prefilled values
  const [email] = useState("admin@demo.com");
  const [password] = useState("admin123");
  const [error, setError] = useState("");

  const handleLogin = () => {

    if (
      email.trim().toLowerCase() === "admin@demo.com" &&
      password.trim() === "admin123"
    ) {
      onLogin();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f4f6f8"
    }}>
      <div style={{
        width: 320,
        padding: 24,
        background: "white",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          value={email}
          readOnly
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <input
          type="password"
          value={password}
          readOnly
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        {error && (
          <div style={{ color: "red", marginBottom: 10 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 10,
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 4
          }}
        >
          Login
        </button>

      </div>
    </div>
  );
}
