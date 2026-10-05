import { useState } from "react";
import axios from "axios";

function AddEmployee() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !phone || !department || !salary) {
  alert("Please fill all fields");
  return;
}

 const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email.trim())) {
      alert("Please enter a valid email");
      return;
    }
if (phone.length !== 10) {
  alert("Phone number must be 10 digits");
  return;
}

if (Number(salary) <= 0) {
  alert("Salary must be greater than 0");
  return;
}
  try {
    const response = await axios.post(
      "http://localhost:5000/api/employees",
      {
        name,
        email,
        phone,
        department,
        salary
      }
    );

    console.log(response.data);

    alert("Employee added successfully");

    //clear the form
    setName("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setSalary("");

  } catch (error) {
    console.log(error);
    alert("Failed to add employee");
  }
};

  return (
  <div className="page-container">

    <h1>Add Employee</h1>

    <form className="employee-form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <button type="submit">
        Add Employee
      </button>

    </form>

  </div>
);
}
export default AddEmployee;