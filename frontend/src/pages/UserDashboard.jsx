import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  /* ===== AUTH CHECK ===== */
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  /* ===== FETCH TASKS ===== */
  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/user/${userId}`);
      setTasks(res.data.tasks || []);
    } catch (error) {
      console.error(error);
      alert("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  /* ===== UPDATE STATUS ===== */
  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/update/${taskId}`, { status });
      fetchTasks();
    } catch (error) {
      alert("Error updating task");
    }
  };

  /* ===== LOGOUT ===== */
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>👤 User Dashboard</h2>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p style={styles.info}>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p style={styles.info}>No tasks assigned 🚫</p>
      ) : (
        <div style={styles.grid}>
          {tasks.map(task => (
            <div key={task._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3>{task.title}</h3>
                <span style={{
                  ...styles.badge,
                  backgroundColor:
                    task.priority === "High"
                      ? "#ef4444"
                      : task.priority === "Medium"
                      ? "#f59e0b"
                      : "#22c55e"
                }}>
                  {task.priority}
                </span>
              </div>

              <p style={styles.desc}>{task.description}</p>

              <div style={styles.footer}>
                <span>Status:</span>
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
                  style={styles.select}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "30px"
  },
  header: {
    maxWidth: "1100px",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },
  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  info: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
    color: "#555"
  },
  grid: {
    maxWidth: "1100px",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  badge: {
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px"
  },
  desc: {
    margin: "12px 0",
    color: "#555",
    fontSize: "14px"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px"
  },
  select: {
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  }
};

export default UserDashboard;
