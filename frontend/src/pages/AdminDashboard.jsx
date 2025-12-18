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

  const adminId = "admin123";       // hard-coded
  const adminPassword = "admin@123"; // hard-coded

  /* LOGOUT */
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  /* CREATE USER */
  const createUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/create", {
        adminId,
        adminPassword,
        name,
        email,
        password
      });

      alert("User Created Successfully");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Error creating user");
    }
  };

  /* ASSIGN TASK */
  const assignTask = async () => {
    try {
      await axios.post("http://localhost:5000/api/tasks/create", {
        adminId,
        adminPassword,
        title,
        description,
        assignedTo,
        priority
      });

      alert("Task Assigned Successfully");
      setTitle("");
      setDescription("");
      setAssignedTo("");
    } catch (error) {
      alert("Error assigning task");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <button onClick={logout} style={styles.logout}>Logout</button>

      {/* CREATE USER */}
      <div style={styles.card}>
        <h3>Create User</h3>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={createUser}>Create User</button>
      </div>

      {/* ASSIGN TASK */}
      <div style={styles.card}>
        <h3>Assign Task</h3>
        <input placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input placeholder="User ID" value={assignedTo} onChange={e => setAssignedTo(e.target.value)} />

        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button onClick={assignTask}>Assign Task</button>
      </div>
    </div>
  );
};

/* STYLES */
const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto"
  },
  logout: {
    float: "right",
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer"
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};

export default AdminDashboard;
