const express = require("express");
const validate = require("../middleware/validationMiddleware");
const employeeSchema = require("../middleware/employeeValidation");


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
router.post("/",validate(employeeSchema), addEmployee);


// DELETE employee
router.delete("/:id", deleteEmployee);


// PUT update employee
router.put("/:id",validate(employeeSchema), updateEmployee);


module.exports = router;