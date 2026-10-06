const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

connectDB();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Employee Management Backend is running");
});

app.use("/api/employees", employeeRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
