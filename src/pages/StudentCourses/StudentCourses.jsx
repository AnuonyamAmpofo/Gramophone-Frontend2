import  { useState, useEffect } from "react";
import NavbarStudent from "../../components/Navbar2/NavbarStudent";
import CourseCard from "../../components/CourseCard/CourseCard";
import "./StudentCourses.css";

function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the JWT token from localStorage
        const response = await fetch("https://ampsgramophone-backend.vercel.app/students/courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Pass the token in the header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses); // Set the fetched courses into state
        } else {
          setError("Failed to fetch courses");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("An error occurred while fetching courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="landing_page_container">
      <NavbarStudent />
      <main className="student_courses_main">
        <header className="course_header">
          <h1>COURSES</h1>
          <p>The courses you have signed up for so far!</p>
        </header>

        {/* Display courses or error message */}
        {error ? (
          <p>{error}</p>
        ) : (
          courses.map((course) => (
            <CourseCard course={course} key={course.courseCode} />
          ))
        )}
      </main>
    </div>
  );
}

export default StudentCourses;
