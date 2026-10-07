
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

//Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        message: "Too many requests, please try again 15 min later."
    }
});


app.use(express.json());
app.use(cors( ));
app.use(helmet());

connectDB();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Employee Management Backend is running");
});

app.use("/api/employees", apiLimiter, employeeRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
