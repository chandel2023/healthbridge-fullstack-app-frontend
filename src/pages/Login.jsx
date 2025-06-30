import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://healthbridge-backend-mmfn.onrender.com/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      if (user.role === "doctor" || user.role === "patient") {
        navigate("/welcome"); // ✅ Both go to welcome
      } else if (user.role === "instructor") {
        navigate("/welcome"); // ✅ instructor को भी welcome भेजो
      }
      else if (user.role === "learner") {
        navigate("/welcome");
      }



    } catch (err) {
      console.error("Login Error:", err.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f4f8",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",

        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "24px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          🔐 Login
        </h2>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "16px" }}>
            {error}
          </p>
        )}

        <form
          onSubmit={handleLogin}
          autoComplete="off"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          {/* 🛡 Trick: Invisible inputs to fool browser autofill */}
          <input type="text" name="fake-username" autoComplete="off" style={{ display: "none" }} />
          <input type="password" name="fake-password" autoComplete="new-password" style={{ display: "none" }} />


          <input
            type="text" // 🔥 yes, type "text" instead of "email"
            name="real-email"
            inputMode="email"
            autoComplete="off"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />

          <input
            type="password"
            name="real-password"
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "24px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#1d4ed8",
              color: "white",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",

            }}

          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
