import NavbarInstructor from "../../components/Navbar2/NavbarInstructor";
import InstructorCourseCard from "../../components/CourseCard/InstructorCourseCard";
import "./InstructorCourses.css";
import InstructorTimetable from '../../components/Timetable/InstuctorTimetable';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { ClipLoader } from "react-spinners";

const InstructorCourses = () => {
  const [coursesByDay, setCoursesByDay] = useState({}); // Object to store courses by day
  const [isLoading, setIsLoading]= useState(true);
  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("https://ampsgramophone-backend.vercel.app/instructors/courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Courses response error:", response.statusText);
          return;
        }

        const data = await response.json();
        console.log("Courses data:", data);

        const groupedCourses = data.courses.reduce((acc, course) => {
          const day = course.day;
          if (!acc[day]) {
            acc[day] = [];
          }
          acc[day].push(course);
          return acc;
        }, {});

        setCoursesByDay(groupedCourses);
      } catch (err) {
        console.error("Error fetching instructor courses data:", err);
      }finally{
        setIsLoading(false)
      }
    };

    fetchCoursesData();
  }, []);
  
  
  
  const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="instructor_courses_main">
      <NavbarInstructor />
      <section className="courses_section">
        <h2 className="courses_heading">COURSES</h2>
        <div className="instructor_courses">
          {isLoading ? (
            <div className="loading-screens">
            <ClipLoader color={"#463c06"} size={100} />
            </div>
          ) : ( 
          daysOfTheWeek.map((day) => (
            coursesByDay[day] && (
              <div key={day} className="courses_by_day">
                <h3 className="dayName">{day}</h3>
                {coursesByDay[day].map((course) => (
                  <Link key={course.courseCode} to={`/courseDetail/${course.courseCode}`} className="course-link">
                    <InstructorCourseCard
                      className="Instructor-car"
                      course={{
                        id: course.courseCode,
                        name: course.courseCode,
                        instructorName: course.instructorName,
                        dayOfSession: course.day,
                        numberOfStudents: course.numberOfStudents
                      }}
                    />
                  </Link>
                ))}
              </div>
            )
          ))
        )}
          
          
        </div>
       
      </section>
      
    </div>
  );
};

export default InstructorCourses;
