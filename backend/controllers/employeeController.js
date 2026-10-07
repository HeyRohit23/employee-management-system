const Employee = require("../models/Employee");

// GET all employees
const getEmployees = async (req, res,next) => {
    try {
        const employees = await Employee.find();

        res.status(200).json(employees);

    } catch (error){
        next(error);
    }
};


// POST - Add employee
const addEmployee = async (req, res,next) => {
    try {
        const employee = new Employee(req.body);

        const savedEmployee = await employee.save();

        res.status(201).json(savedEmployee);

    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email or phone already exists"
            });
        }

         next(error);
    }
};

// DELETE employee
const deleteEmployee = async (req, res,next) => {
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
        next(error);
    }
};


// PUT - Update employee
const updateEmployee = async (req, res,next) => {
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
        next(error);
    }
};


module.exports = {
    getEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee
};