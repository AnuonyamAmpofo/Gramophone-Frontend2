// import React from 'react'
import { useEffect , useState} from "react";
import NavbarAdmin from "../../components/Navbar2/NavbarAdmin";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [students, setStudents] = useState('');
  const [instructors, setInstructors] = useState('');
  const [courses, setCourses] = useState('');
  const [isloadNumCourses, setIsLoadNumCourses] =useState(true);
  const [isloadNumInstructors, setIsLoadNumInstructors] =useState(true);
  const [isloadNumStudents, setIsLoadStudents] =useState(true);

  useEffect(()=>{
    const fetchNumStudents = async()=>{
      try{
        const token = localStorage.getItem("token");
        if (!token){
          console.error("No token found");
          return;
        }
        const response = await fetch("https://ampsgramophone-backend.vercel.app/admin/students",{
          method: "GET",
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        if (!response.ok){
          console.error("Students response error:", response.statusText);
          return;
        }

        const data = await response.json();
        setStudents(data)

      }
      catch(error){
        console.error("Error fetching students:", error);
      }
      finally{
        setIsLoadStudents(false);
      }
    };
    const fetchNumInstructors = async()=>{
      try{
        const token = localStorage.getItem("token");
        if (!token){
          console.error("No token found");
          return;
        };

        const response = await fetch("https://ampsgramophone-backend.vercel.app/admin/instructors",{
          method: "GET",
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,

          }
        });

        if (!response.ok){
          console.error("Response Error: ", response.statusText);
          return;
        }
        const data = await response.json();
        setInstructors(data)
        

      }
      catch(error){
        console.error("Error Fetching Instructor Number:", error);
      }
      finally{
        setIsLoadNumInstructors(false);
      }
    };

    const fetchNumCourses = async()=>{
      try{
        const token = localStorage.getItem("token");
        if(!token){
          console.error("No token found");
          return;
        }
        
        const response = await fetch("https://ampsgramophone-backend.vercel.app/admin/courses",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        if(!response.ok){
          console.error("Response Error: ", response.statusText);
          return;
        }

        const data = await response.json();
        setCourses(data)

      }
      catch(error){
        console.error("Error fetching Courses:", error)
      }
      finally{
        setIsLoadNumCourses(false);
      }

    };
    fetchNumCourses();
    fetchNumInstructors();
    fetchNumStudents();
  },[]);
 

  return (
    <main className="admin_main">
      <NavbarAdmin />
      <section className="admin_section_1">
        <article>
          <div className="admin_top">
            <div>
              <p>Total number of courses</p>
              {isloadNumCourses ? (
                // <div className="loader">
                <ScaleLoader color={"#463c06"} size={30} />
              // </div>
              ):(
                <h3>{courses.length}</h3>
              )}
              
            </div>
            <div>
              <p>Number of tutors</p>
              {isloadNumInstructors ? (
                // <div className="loader">
                <ClipLoader color={"#463c06"} size={30} />
              // </div>
              ):(
              <h3>{instructors.length}</h3>
              )}
            </div>
            <div>
              <p>Number of students enrolled</p>
              {isloadNumStudents ? (
                // <div className="loader">
                <ClipLoader color={"#463c06"} size={30} />
              // </div>
              ):(
              <h3>{students.length}</h3>
              )}
            </div>
          </div>
          {/*  */}
          <div className="admin_control">
          <Link className="admin-tabs" to ="/adminStudents">
            <div>STUDENTS</div>
               </Link>

               <Link className="admin-tabs" to ="/adminStudents">
                  <div>INSTRUCTORS</div>
              </Link>
              <Link className= "admin-tabs" to ="/adminStudents">
            <div>COURSES</div>
            </Link>
          </div>
        </article>
        <article className="annoucements_section">
            <h2>ANNOUCEMENTS</h2>
            <p>Admin adds general annoucements here!!!</p>
        </article>
      </section>
    </main>
  );
};

export default AdminDashboard;
