import "./InstructorDashboard.css";
import NavbarInstructor from "../../components/Navbar2/NavbarInstructor";
import InstructorCourseCard from "../../components/CourseCard/InstructorCourseCard";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const InstructorDashboard = () => {
  const [instructorName, setInstructorName] = useState("");
  const [todayCourses, setTodayCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        // Fetch instructor name
        const instructorResponse = await fetch(
          "https://ampsgramophone-backend.vercel.app/instructors/instructor-info",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!instructorResponse.ok) {
          console.error("Instructor Response error:", instructorResponse.statusText);
          return;
        }

        const instructorData = await instructorResponse.json();
        setInstructorName(instructorData.instructor.name);

        // Fetch today's courses
        const coursesResponse = await fetch("https://ampsgramophone-backend.vercel.app/instructors/courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!coursesResponse.ok) {
          console.error("Error fetching courses:", coursesResponse.statusText);
          return;
        }

        const coursesData = await coursesResponse.json();
        const today = new Date().toLocaleString("en-US", { weekday: "long" });
        const coursesToday = coursesData.courses.filter(course => course.day === today);
        setTodayCourses(coursesToday);

        // Fetch announcements
        const announcementsResponse = await fetch("https://ampsgramophone-backend.vercel.app/instructors/announcements", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (announcementsResponse.ok) {
          const announcementsData = await announcementsResponse.json();
          setAnnouncements(announcementsData.announcements);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setIsLoading(false);
      }
    };

    fetchInstructorData();
  }, []);

  return (
    <main className="dashboard_main">
      <NavbarInstructor />
      <h1>WELCOME BACK, {instructorName}!</h1>

      <h3 className="Today">Your Courses for Today...</h3>
      {isLoading ? (
        <div className="loader">
          <ClipLoader color={"#463c06"} size={100} />
        </div>
      ) : (
        <section className="dashboard_section">
          <div className="dashboard_course_text">
            
            <div className="courses_grid">
              {todayCourses.length > 0 ? (
                todayCourses.map(course => (
                  <Link key={course.courseCode} to={`/courseDetail/${course.courseCode}`} className="course-link">
                    <InstructorCourseCard
                      course={{
                        id: course.courseCode,
                        name: course.courseCode,
                        instructorName: course.instructorName,
                        dayOfSession: course.day,
                        numberOfStudents: course.numberOfStudents
                      }}
                    />
                  </Link>
                ))
              ) : (
                <p>No courses scheduled for today.</p>
              )}
            </div>

            <h3>Announcements</h3>
            {announcements.length > 0 ? (
              <ul className="announcements_list">
                {announcements.map((announcement, index) => (
                  <li key={index}>{announcement.content}</li>
                ))}
              </ul>
            ) : (
              <p>No announcements at this time.</p>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default InstructorDashboard;
