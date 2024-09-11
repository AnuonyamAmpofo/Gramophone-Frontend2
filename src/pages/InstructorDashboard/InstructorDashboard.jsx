import "./InstructorDashboard.css";
import NavbarInstructor from "../../components/Navbar2/NavbarInstructor";
import InstructorTimetable from "../../components/Timetable/InstuctorTimetable";

const InstructorDashboard = () => {
  return (
    <main className="dashboard_main">
      <NavbarInstructor />
      <section className="dashboard_section">
        <h1>WELCOME BACK, Ampofo!</h1>
        <div className="dashboard_course_text">
          <h3>Courses</h3>
          <p>Click on the course for details.</p>
        </div>
        <article className="course_preview">
          <div>
            <h3>DRUM123</h3>
            <p>Number of Students</p>
            <h4>10</h4>
            <p>Day</p>
            <h4>Monday</h4>
          </div>
          <div>
            <h3>DRUM323</h3>
            <p>Number of Students</p>
            <h4>10</h4>
            <p>Day</p>
            <h4>Tuesday</h4>
          </div>
        </article>
        <div className="button_wrapper">
          <button>SHOW MORE...</button>
        </div>
        <section className="wrapper-2">
          <h3>Instructor feedback & Announcements </h3>
          <InstructorTimetable />
        </section>
      </section>
    </main>
  );
};

export default InstructorDashboard;
