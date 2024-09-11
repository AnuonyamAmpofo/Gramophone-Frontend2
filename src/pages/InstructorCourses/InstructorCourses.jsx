import NavbarInstructor from "../../components/Navbar2/NavbarInstructor";
import InstructorCourseCard from "../../components/CourseCard/InstructorCourseCard";
import "./InstructorCourses.css";
import InstructorTimetable from "../../components/Timetable/InstuctorTimetable";

const course = {
  id: 1,
  name: "DRUM123",
  instructorName: "Ampofo",
  instructorEmail: "Ampofo@example.com",
  instructorPhone: "02434567890",
  dayOfSession: "Monday",
  timeOfSession: "4:00pm",
  imageURL: "assets/Images/drums.png",
};

const InstructorCourses = () => {
  return (
    <div className="instructor_courses_main">
      <NavbarInstructor />
      <section className="courses_section">
        <h2 className="courses_heading">COURSES</h2>
        <div className="instructor_courses">
          <InstructorCourseCard course={course} key={course.id} />
        </div>
        <article className="wrapper-2">
          <h3>List of students with their sessions</h3>
          <InstructorTimetable />
        </article>
      </section>
      <section className="annoucements">
        <div>
          <h2>ANNOUNCEMENTS</h2>
          <p>All specific announcements for this course go here!!</p>
        </div>
      </section>
    </div>
  );
};

export default InstructorCourses;
