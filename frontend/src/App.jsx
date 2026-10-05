import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";

function App() {

  return (
    <BrowserRouter>

      <nav>
        <Link to="/">Add Employee</Link>
        {" | "}
        <Link to="/employees">Employee List</Link>
      </nav>

      <Routes>

        <Route path="/" element={<AddEmployee />} />

        <Route path="/employees" element={<EmployeeList />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;