import "./InstructorDashboard.css";
import NavbarInstructor from "../../components/Navbar2/NavbarInstructor";
import InstructorTimetable from "../../components/Timetable/InstuctorTimetable";
import { useEffect, useState} from "react";

const InstructorDashboard = () => {
  const [instructorName, setInstructorName] = useState("");
  
  useEffect(()=> {
    const fetchInstructorData = async ()=> {
      try {
        const token = localStorage.getItem("token");
        if (!token){
          console.error("No token found");
          return;
        }

        //To fetch instructor name
        const instructorResponse = await fetch(
          "https://ampsgramophone-backend.vercel.app/instructors/instructor-info",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }
        );
        if (!instructorResponse.ok){
          console.error("Instructor Response error: ", instructorResponse.statusText)
          return;
        }

        const instructorData = await instructorResponse.json();
        console.log("Instructor Data: ", instructorData);
        
        
          setInstructorName(instructorData.instructor.name);
     

        
        //To fetch instructor 
      }
      catch(err){
        console.error("Error fetching Instructor Data:", err)
      }
    };
    fetchInstructorData();
  
  
},[]);
  
  return (
    <main className="dashboard_main">
      <NavbarInstructor />
      <section className="dashboard_section">
        <h1>WELCOME BACK, {instructorName}!</h1>
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
