import "./App.css";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home";
import EmployeeForm from "./Employee/EmployeeForm";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth/:token" element={<EmployeeForm/>}/>
    </Routes>
    </>
  )
}

export default App;
