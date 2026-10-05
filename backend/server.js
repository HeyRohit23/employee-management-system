const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./models/Employee");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Employee Management Backend is running");
});

app.get("/api/employees",async(req,res)=>{
    try{
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch(error){
        res.status(500).json({message: "Failed to fetch employees", error:error.message});
    }
});

app.post("/api/employees",async (req,res)=>{
    try{
    const employee=new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
}
catch(error){
    res.status(500).json({message: "Failed to create employee", error:error.message});
}
}
);

app.delete("/api/employees/:id", async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

        if (!deletedEmployee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete employee",
            error: error.message
        });
    }
});

app.put("/api/employees/:id", async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json(updatedEmployee);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update employee",
            error: error.message
        });
    }
});


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch((error)=>{
    console.log("mongodb connection failed",error);
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})