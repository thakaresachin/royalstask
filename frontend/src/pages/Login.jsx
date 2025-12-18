import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password
        }
      );

      // ✅ CLEAR OLD DATA (IMPORTANT)
      localStorage.clear();

      // ✅ SAVE ROLE
      localStorage.setItem("role", res.data.role);

      // ✅ ADMIN LOGIN
      if (res.data.role === "admin") {
        localStorage.setItem("adminId", res.data.adminId);
        navigate("/admin");
      }

      // ✅ USER LOGIN
      if (res.data.role === "user") {
        localStorage.setItem("userId", res.data.user._id); // 🔥 VERY IMPORTANT
        localStorage.setItem("userName", res.data.user.name);
        navigate("/user");
      }

    } catch (error) {
      alert("Invalid Email or Password");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Task Manager Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "320px",
    margin: "120px auto",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    textAlign: "center"
  }
};

export default Login;
