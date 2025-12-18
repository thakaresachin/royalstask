import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // CREATE USER STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // CREATE TASK STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Low");

  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingTask, setLoadingTask] = useState(false);

  const adminId = "admin123";
  const adminPassword = "admin@123";

  /* LOGOUT */
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  /* CREATE USER */
  const createUser = async () => {
    setLoadingUser(true);
    try {
      await axios.post("http://localhost:5000/api/users/create", {
        adminId,
        adminPassword,
        name,
        email,
        password
      });

      alert("User created successfully");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Error creating user");
    } finally {
      setLoadingUser(false);
    }
  };

  /* ASSIGN TASK */
  const assignTask = async () => {
    setLoadingTask(true);
    try {
      await axios.post("http://localhost:5000/api/tasks/create", {
        adminId,
        adminPassword,
        title,
        description,
        assignedTo,
        priority
      });

      alert("Task assigned successfully");
      setTitle("");
      setDescription("");
      setAssignedTo("");
    } catch (error) {
      alert("Error assigning task");
    } finally {
      setLoadingTask(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </div>

      <div style={styles.grid}>
        {/* CREATE USER CARD */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Create User</h3>

          <input style={styles.input} placeholder="Name"
            value={name} onChange={e => setName(e.target.value)} />

          <input style={styles.input} placeholder="Email"
            value={email} onChange={e => setEmail(e.target.value)} />

          <input style={styles.input} placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} />

          <button style={styles.button} onClick={createUser} disabled={loadingUser}>
            {loadingUser ? "Creating..." : "Create User"}
          </button>
        </div>

        {/* ASSIGN TASK CARD */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Assign Task</h3>

          <input style={styles.input} placeholder="Task Title"
            value={title} onChange={e => setTitle(e.target.value)} />

          <input style={styles.input} placeholder="Description"
            value={description} onChange={e => setDescription(e.target.value)} />

          <input style={styles.input} placeholder="User ID"
            value={assignedTo} onChange={e => setAssignedTo(e.target.value)} />

          <select style={styles.input}
            value={priority} onChange={e => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button style={styles.button} onClick={assignTask} disabled={loadingTask}>
            {loadingTask ? "Assigning..." : "Assign Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* 🎨 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fb",
    padding: "30px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },
  logout: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  cardTitle: {
    marginBottom: "10px",
    color: "#333"
  },
  input: {
    padding: "12px",
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
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default AdminDashboard;
