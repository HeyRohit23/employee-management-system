import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editEmployee, setEditEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://employee-management-system-j9if.onrender.com/api/employees"
      );

      setEmployees(response.data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(
        `https://employee-management-system-j9if.onrender.com/api/employees/${id}`
      );

      alert("Employee deleted successfully");

      fetchEmployees();

    } catch (error) {
      console.log(error);
      alert("Failed to delete employee");
    }
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();


    if (
      !editEmployee.name ||
      !editEmployee.email ||
      !editEmployee.phone ||
      !editEmployee.department ||
      !editEmployee.salary
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editEmployee.phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(editEmployee.email)) {
      alert("Please enter a valid email");
      return;
    }

    if (Number(editEmployee.salary) <= 0) {
      alert("Salary must be greater than 0");
      return;
    }

    try {

      await axios.put(
        `https://employee-management-system-j9if.onrender.com/api/employees/${editEmployee._id}`,
        editEmployee
      );

      alert("Employee updated successfully");

      setEditEmployee(null);

      fetchEmployees();

    } catch (error) {

      console.log(error);
      alert("Failed to update employee");

    }
  };


  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="page-container">

      <h1>Employee List</h1>

      {loading && <p>Loading employees...</p>}

      {error && <p>{error}</p>}

      {editEmployee && (
        <form
          className="employee-form"
          onSubmit={handleUpdate}
        >
          <h2>Edit Employee</h2>

          <input
            type="text"
            value={editEmployee.name}
            onChange={(e) =>
              setEditEmployee({
                ...editEmployee,
                name: e.target.value
              })
            }
          />

          <input
            type="email"
            value={editEmployee.email}
            onChange={(e) =>
              setEditEmployee({
                ...editEmployee,
                email: e.target.value
              })
            }
          />

          <input
            type="text"
            value={editEmployee.phone}
            onChange={(e) =>
              setEditEmployee({
                ...editEmployee,
                phone: e.target.value
              })
            }
          />

          <input
            type="text"
            value={editEmployee.department}
            onChange={(e) =>
              setEditEmployee({
                ...editEmployee,
                department: e.target.value
              })
            }
          />

          <input
            type="number"
            value={editEmployee.salary}
            onChange={(e) =>
              setEditEmployee({
                ...editEmployee,
                salary: e.target.value
              })
            }
          />

          <button type="submit">
            Update Employee
          </button>

          <button
            type="button"
            onClick={() => setEditEmployee(null)}
          >
            Cancel
          </button>

        </form>
      )}


      <div className="table-container">

        <table className="employee-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 && !loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td>₹{employee.salary}</td>
                  <td>
                    <button onClick={() => handleEdit(employee)}>
                      Edit
                    </button>

                    <button onClick={() => handleDelete(employee._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

    </div>
  )
};
export default EmployeeList;