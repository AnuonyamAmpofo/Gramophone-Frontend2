import { useState, useEffect } from "react";
import "./StudentDashboard.css";
import Announcement from "../../components/Timetable/Announcement";
import NavbarStudent from "../../components/Navbar2/NavbarStudent";

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        // Fetch student name
        const studentResponse = await fetch(
          "https://ampsgramophone-backend.vercel.app/students/student-info",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!studentResponse.ok) {
          console.error("Student response error:", studentResponse.statusText);
          return;
        }

        const studentData = await studentResponse.json();
        setStudentName(studentData.studentName);

        // Fetch courses for the student
        const coursesResponse = await fetch(
          "https://ampsgramophone-backend.vercel.app/students/courses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!coursesResponse.ok) {
          console.error("Courses response error:", coursesResponse.statusText);
          return;
        }

        const coursesData = await coursesResponse.json();
        setCourses(coursesData.courses);
      } catch (err) {
        console.error("Error fetching student data:", err);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <main className="main-content">
      <NavbarStudent />
      <div className="container-1">
        <h2 className="welcome-msg">WELCOME BACK, {studentName}!</h2>
        <h2 className="sessions-text">Sessions</h2>
        <section className="wrapper-1">
          {courses.map((course, index) => (
            <article key={index} className="sessions">
              <h2>{course.courseCode}</h2>
              <div>
                <p>Instructor</p>
                <h3>{course.instructorName}</h3>
              </div>
              <div>
                <p>Day</p>
                <h3>{course.day}</h3>
              </div>
              <div>
                <p>Time</p>
                <h3>{course.time}</h3>
              </div>
            </article>
          ))}
        </section>
        <section className="wrapper-2">
          <h3>Instructor feedback & Announcements </h3>
          <Announcement />
        </section>
      </div>
    </main>
  );
};

export default StudentDashboard;
