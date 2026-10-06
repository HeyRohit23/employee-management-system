const Employee = require("../models/Employee");

// GET all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        res.status(200).json(employees);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch employees",
            error: error.message
        });
    }
};


// POST - Add employee
const addEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);

        const savedEmployee = await employee.save();

        res.status(201).json(savedEmployee);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create employee",
            error: error.message
        });
    }
};


// DELETE employee
const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(
            req.params.id
        );

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
};


// PUT - Update employee
const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
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
};


module.exports = {
    getEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee
};