import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  // 🔐 Guard
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks for user:", userId);

      const res = await API.get(`/tasks/user/${userId}`);

      console.log("API RESPONSE:", res.data); // 🔥 DEBUG
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/update/${taskId}`, { status });
      fetchTasks();
    } catch (err) {
      alert("Error updating task");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1>User Dashboard</h1>
      <button onClick={logout} style={styles.logout}>Logout</button>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks assigned</p>
      ) : (
        tasks.map(task => (
          <div key={task._id} style={styles.card}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><b>Priority:</b> {task.priority}</p>
            <p><b>Status:</b> {task.status}</p>

            <select
              value={task.status}
              onChange={(e) => updateStatus(task._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

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
    marginTop: "15px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.15)"
  }
};

export default UserDashboard;
