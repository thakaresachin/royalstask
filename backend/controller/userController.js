import User from "../model/User.js";

/*
  HARD-CODED ADMIN
*/
const ADMIN_ID = "admin123";
const ADMIN_PASSWORD = "admin@123";

/*
  ADMIN → CREATE USER
*/
export const createUser = async (req, res) => {
  try {
    const { adminId, adminPassword, name, email, password } = req.body;

    if (adminId !== ADMIN_ID || adminPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized Admin" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "user"
    });

    res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // admin login
    if (email === "admin@gmail.com" && password === ADMIN_PASSWORD) {
      return res.json({
        message: "Admin login success",
        role: "admin",
        adminId: ADMIN_ID
      });
    }

    // user login
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "User login success",
      role: "user",
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

