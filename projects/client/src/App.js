import "./App.css";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home";
import EmployeeForm from "./Employee/EmployeeForm";
import UserAuth from "./Components/UserAuth";
import HistroryPage from "./Pages/HistoryPage";
import Reports from "./Pages/Reports";

function App() {
  return (
    <>
    <UserAuth>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth/:token" element={<EmployeeForm/>}/>
      <Route path="/history" element={<HistroryPage/>}/>
      <Route path="/report" element={<Reports/>}/>
    </Routes>
    </UserAuth>
    </>
  )
}

export default App;
