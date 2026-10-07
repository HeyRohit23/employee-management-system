
import { useState } from "react";
import api from "../services/api";

function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone || !department.trim() || !salary) {
      alert("Please fill all fields");
      return;
    }

    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email.trim())) {
      alert("Please enter a valid email");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (Number(salary) <= 0) {
      alert("Salary must be greater than 0");
      return;
    }

    try {
      const response = await api.post(
        "/api/employees",
        {
          name: name.trim(),
          email: email.trim(),
          phone,
          department: department.trim(),
          salary: Number(salary)
        }
      );

      console.log(response.data);
      alert("Employee added successfully");

      setName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setSalary("");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add employee"
      );
    }
  };

  return (
    <div className="page-container">
      <h1>Add Employee</h1>

      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name </label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Email </label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Phone </label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength="10"
            inputMode="numeric"
          />
        </div>

        <div className="form-row">
          <label>Department </label>
          <input
            type="text"
            placeholder="Enter Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Salary </label>
          <input
            type="number"
            placeholder="Enter Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            min="1"
          />
        </div>

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;