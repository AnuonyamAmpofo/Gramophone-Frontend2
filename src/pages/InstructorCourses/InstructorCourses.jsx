import NavbarInstructor from "../../components/Navbar2/NavbarInstructor";
import InstructorCourseCard from "../../components/CourseCard/InstructorCourseCard";
import "./InstructorCourses.css";
import InstructorTimetable from '../../components/Timetable/InstuctorTimetable';
import { useState, useEffect } from "react";

const InstructorCourses = () => {
  const [coursesByDay, setCoursesByDay] = useState({}); // Object to store courses by day

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        // Fetch courses for the instructor
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
        console.log(data);
        // Group courses by their session day
        const groupedCourses = data.courses.reduce((acc, course) => {
          const day = course.day; // Adjust to the correct field
          if (!acc[day]) {
            acc[day] = [];
          }
          acc[day].push(course);
          return acc;
        }, {});

        setCoursesByDay(groupedCourses); // Set the grouped courses into state
      } catch (err) {
        console.error("Error fetching instructor courses data:", err);
      }
    };

    fetchCoursesData();
  }, []);

  const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="instructor_courses_main">
      <NavbarInstructor />
      <section className="courses_section">
        <h2 className="courses_heading">COURSES</h2>
        <div className="instructor_courses">
          {daysOfTheWeek.map((day) => (
            coursesByDay[day] &&(
            <div key={day} className="courses_by_day">
              <h3 className="dayName">{day}</h3> 
              {coursesByDay[day].map((course) => (
                <InstructorCourseCard
                  key={course.courseCode}
                  course={{
                    id: course.courseCode,
                    name: course.courseCode, // Adjust to your data field
                    instructorName: course.instructorName,
                    dayOfSession: course.day,
                    numberOfStudents: course.numberOfStudents
                  }}
                  // className= "course-card"
                />
              ))}
            </div>
            )
          ))}
        </div>
        <article className="wrapper-2">
          <h3>List of students with their sessions</h3>
          <InstructorTimetable />
        </article>
      </section>
      <section className="announcements">
        <div>
          <h2>ANNOUNCEMENTS</h2>
          <p>All specific announcements for this course go here!!</p>
        </div>
      </section>
    </div>
  );
};

export default InstructorCourses;
