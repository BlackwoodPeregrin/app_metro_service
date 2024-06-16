import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Login } from "./components/Auth/Login";
import { ApplicationsForEmployee } from "./components/ApplicationsForEmployee/ApplicationsForEmployee";
import OperatorPage from "./components/OperatorPage/OperatorPage";
import { EmployeesPage } from "./components/EmployeesPage/EmployeesPage";
import { PassengersPage } from "./components/PassengersPage/PassengersPage";
import { AuthProvider, PrivateRoute } from "./context/authContext"

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/support" element={<PrivateRoute component={ApplicationsForEmployee} />} />
                    <Route path="/employees" element={<PrivateRoute component={EmployeesPage} />} />
                    <Route path="/applications" element={<PrivateRoute component={OperatorPage} />} />
                    <Route path="/passengers" element={<PrivateRoute component={PassengersPage} />} />
                    <Route path="*" element={<Navigate to="/support"/>}></Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
