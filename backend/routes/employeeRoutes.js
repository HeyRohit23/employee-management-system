const express = require("express");


const {
    getEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee
} = require("../controllers/employeeController");

const router = express.Router();


// GET all employees
router.get("/", getEmployees);


// POST add employee
router.post("/", addEmployee);


// DELETE employee
router.delete("/:id", deleteEmployee);


// PUT update employee
router.put("/:id", updateEmployee);


module.exports = router;