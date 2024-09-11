import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import LandingPage from "./pages/LandingPage/LandingPage";
import StudentCourses from "./pages/StudentCourses/StudentCourses";
import Dashboard from "./pages/DashboardPage/Dashboard";
import LoginPage from "./pages/LandingPage/Modal";
import ContactUs from "./pages/ContactPage/ContactUs";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard/InstructorDashboard";
import InstructorCourses from "./pages/InstructorCourses/InstructorCourses";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Footer from "./components/Footer/Footer";
import AdminStudentTab from "./pages/AdminStudentTab/AdminStudentTab";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loggedIn" element={<StudentCourses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/instructorDashboard" element={<InstructorDashboard />} />
          <Route path="/instructorCourses" element={<InstructorCourses />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/adminPage" element={<AdminStudentTab />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
