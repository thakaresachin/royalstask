import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      localStorage.clear();
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        localStorage.setItem("adminId", res.data.adminId);
        navigate("/admin");
      } else {
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("userName", res.data.user.name);
        navigate("/user");
      }
    } catch (error) {
      alert("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Task Manager</h2>
        <p style={styles.subtitle}>Login to continue</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            required
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🔹 ADMIN PAGE BUTTON */}
        <button
          onClick={() => navigate("/admin")}
          style={styles.adminButton}
        >
          Go to Admin Page
        </button>

        <p style={styles.footer}>
          © 2025 Task Manager App
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: "360px",
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    textAlign: "center"
  },
  title: {
    marginBottom: "5px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#333"
  },
  subtitle: {
    marginBottom: "25px",
    fontSize: "14px",
    color: "#777"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none"
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer"
  },
  adminButton: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #667eea",
    background: "#fff",
    color: "#667eea",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  footer: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#aaa"
  }
};

export default Login;
