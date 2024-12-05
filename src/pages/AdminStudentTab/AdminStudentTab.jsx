import { useForm } from "react-hook-form";
import NavbarAdmin from "../../components/Navbar2/NavbarAdmin";
import "./AdminStudentTab..css";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

const AdminStudentTab = () => {
  const [newStudent, setNewStudent] = useState();
  const [studentID, setStudentID] = useState();
  const { register, handleSubmit, reset } = useForm();
  const [studentData, setStudentData] = useState(null);
  const [isLoadingStudents, setLoadingStudents] = useState(true);
  const [visibleStudents, setVisibleStudents] = useState(12);
  const [selectedInstrument, setSelectedInstrument] = useState(""); // Instrument filter
  const [selectedDay, setSelectedDay] = useState(""); // Day filter
  const [lastAddedStudent, setLastAddedStudent] = useState(null); // Store last added student

  const [addSuccessMessage, setAddSuccessMessage] = useState(false); 
  const [assignSuccessMesssage, setAssignSuccessMessage] = useState(false);
  const [deleteSuccessMesage, setDeleteSuccessMessage]= useState(false);

  const [instructors, setInstructors] = useState([]); // Store instructors
  const [studentInstrument, setStudentInstrument] = useState(null);
  const [studentIDassign, setStudentIDassign] = useState("");
  const [instrument, setInstrument] = useState("");
  const [instructorID, setInstructorID] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [stuNameAssign, setStuNameAssign]= useState("");
  const [studentDetails, setStudentDetails]= useState("");
  const [delStudentID, setDelStudentID]= useState("");
  const [viewStudentID, setViewStudentID]= useState("");
  const [viewStudentDetails, setViewStudentDetails]= useState("");
  const [updateStudentID, setUpdateStudentID] = useState(""); // For student ID input
  const [studentDetailsForUpdate, setStudentDetailsForUpdate] = useState(null); // Fetched student details
  const [updateStudentDetails, setUpdateStudentDetails] = useState({
    name: "",
    email: "",
    contact: "",
    instrument: "",
  });


  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://ampsgramophone-backend.vercel.app/admin/students`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to fetch student data", response.statusText);
      }
      const data = await response.json();
      console.log("Students retrieved successfully");

      // Reverse the order of the fetched students
      setStudentData(data.reverse());
    } catch (err) {
      console.error("Failed to fetch Students", err);
    } finally {
      setLoadingStudents(false);
    }
  };
  const handleDeleteStudent = async (studentID) => {
    if (!studentID) return;
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ampsgramophone-backend.vercel.app/admin/students/${studentID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        console.log("Student deleted successfully");
        fetchStudents(); // Refresh the list
      } else {
        console.error("Failed to delete student");
      }
      setDeleteSuccessMessage(true);
      reset();

      setTimeout(()=> setDeleteSuccessMessage(false), 4000);
      setTimeout(()=> setStudentDetails(""), 3000)
    } catch (err) {
      console.error("Error deleting student: ", err);
    }
  };

  const submitNewStudent = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://ampsgramophone-backend.vercel.app/admin/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Added Student:", result); // Debugging log
  
      // Set the last added student and display success message
      setLastAddedStudent(result.student);
      setAddSuccessMessage(true);
  
      reset();
  
      // Hide success message after 3 seconds
      setTimeout(() => setAddSuccessMessage(false), 5000);
      fetchStudents();
    } catch (err) {
      console.error("Failed to add student", err);
    }
  };
  const handleAssignStudent = async (event) => {
    // event.preventDefault();  // Prevent page reload
  
    // Ensure all fields are populated
    if (!studentIDassign || !instrument || !instructorID || !day || !time) {
      console.log("Please fill in all fields.");
      return;
    }
  
    const payload = {
      studentID: studentIDassign,
      studentName: stuNameAssign,
      instrument,
      instructorID,
      day,
      time
    };
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('https://ampsgramophone-backend.vercel.app/admin/courses/assign-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      console.log(payload);
  
      if (response.ok) {
        console.log("Student assigned successfully");
        // Optionally, set a success message here or show feedback to the user
      } else {
        const errorData = await response.json();
        console.error("Failed to assign student:", errorData.message || errorData);
      }

      setAssignSuccessMessage(true);

      setTimeout(()=> setAssignSuccessMessage(false),5000)
    } catch (error) {
      console.error("Error assigning student:", error);
    }
    finally{
      fetchStudents();
    }
  };
  
  
  const fetchInstructorsByInstrument = async (instrument) => {
    if (!instrument) {
      console.error("Instrument is undefined");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(
        `https://ampsgramophone-backend.vercel.app/admin/student/instructor-find?instrument=${instrument}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch instructors");
      }
  
      const instructors = await response.json();
      if (!Array.isArray(instructors)) {
        throw new Error("API did not return an array");
      }
  
      setInstructors(instructors);
    } catch (err) {
      console.error(err.message);
    }
  };

  const findStudentID = async(studentID)=> {
    if (!studentID) return;

    try{
      const token = localStorage.getItem("token");
      if(!token){
        console.log("No Token Found")
      }

      const response = await fetch (`https://ampsgramophone-backend.vercel.app/admin/students/${studentID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      )

      if(!response.ok){
        throw new Error("Failed to retrieve student data")
      }

      const data = await response.json()
      setStudentDetails(data);
      console.log(studentDetails);
      


    }
    catch(error){
      console.error("Error finding student: ", error)
    }
  }
  const view_StudentID = async(studentID)=> {
    if (!studentID) return;

    try{
      const token = localStorage.getItem("token");
      if(!token){
        console.log("No Token Found")
      }

      const response = await fetch (`https://ampsgramophone-backend.vercel.app/admin/students/${studentID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      )

      if(!response.ok){
        throw new Error("Failed to retrieve student data")
      }

      const data = await response.json()
      setViewStudentDetails(data);
      console.log(studentDetails);
      


    }
    catch(error){
      console.error("Error finding student: ", error)
    }
  }
  const fetchStudentByID = async (studentID) => {
    if (!studentID) return;
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ampsgramophone-backend.vercel.app/admin/students/${studentID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student");
      }
  
      const student = await response.json();
      console.log("Fetched Student by ID:", student); // Debugging log
      setLastAddedStudent(student);
  
      if (student.instrument) {
        setStudentInstrument(student.instrument);
        fetchInstructorsByInstrument(student.instrument); // Fetch related instructors
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchStudentDetailsForUpdate = async (studentID) => {
    if (!studentID) {
      setStudentDetailsForUpdate(null); // Clear details when input is empty
      setUpdateStudentDetails({ name: "", email: "", contact: "", instrument: "" });
      return;
    }
  
    
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://ampsgramophone-backend.vercel.app/admin/students/${studentID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student");
        }
      else if (response.ok) {
        const data = await response.json();
        setStudentDetailsForUpdate(data);
        setUpdateStudentDetails({
          name: data.studentName,
          email: data.email,
          contact: data.contact,
          instrument: data.instrument,
        });
      } else {
        setStudentDetailsForUpdate(null);
        setUpdateStudentDetails({ name: "", email: "", contact: "", instrument: "" });
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      setStudentDetailsForUpdate(null);
      setUpdateStudentDetails({ name: "", email: "", contact: "", instrument: "" });
    }
  };

  const updateStudentsDetails = async () => {
    if (!updateStudentID) {
      alert("Please enter a valid Student ID.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://ampsgramophone-backend.vercel.app/admin/students/${updateStudentID}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateStudentDetails), // Updated details
      });
  
      if (response.ok) {
        alert("Student details updated successfully.");
        setStudentDetailsForUpdate(null);
        setUpdateStudentID("");
        setUpdateStudentDetails({ name: "", email: "", contact: "", instrument: "" });
      } else {
        alert("Failed to update student details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating student details:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  
  

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (lastAddedStudent) {
      setStudentID(lastAddedStudent.studentID); 
      setStuNameAssign(lastAddedStudent.studentName);
    }
  }, [lastAddedStudent]);

  const handleShowMore = () => {
    setVisibleStudents((prev) => prev + 12);
  };

  const filterStudents = () => {
    return studentData
      ?.filter((student) => {
        const matchesInstrument = selectedInstrument
          ? student.instrument === selectedInstrument
          : true;
        const matchesDay = selectedDay
          ? student.schedule?.some((session) => session.day === selectedDay)
          : true;
        return matchesInstrument && matchesDay;
      })
      .slice(0, visibleStudents);
  };
  
  

  return (
    <main>
      <NavbarAdmin />

      
      <section className="student_tab_main">

        <h1>STUDENTS</h1>
        <section className="student_tab_subMain">

        {/*breadcrumbs*/}
        <div className="breadcrumbs">
          <a href="#add_students">Add Student</a> • <a href="#assign_student">Assign Student</a> • <a href="#delete_student">Delete Student</a> • <a href="#view_student">View Student</a> • <a href="#update_student">Update Student</a>
          
        </div>

          <section className="section_left">
            <div className="list-filter">
            <h2>LIST OF STUDENTS</h2>

            <div className="filter-section">
              <div className="filter-group">
                <label htmlFor="instrumentFilter">Instrument:</label>
                <select
                  id="instrumentFilter"
                  value={selectedInstrument}
                  onChange={(e) => setSelectedInstrument(e.target.value)}
                  className= "instrumentFilter"
                >
                  <option value="">All</option>
                  <option value="Drums">Drums</option>
                  <option value="Guitar">Guitar</option>
                  <option value="Saxophone">Saxophone</option>
                  <option value="Piano">Piano</option>
                  <option value="Violin">Violin</option>
                  <option value="Strings">Strings</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="dayFilter">Day:</label>
                <select
                // className="custom-dropdown"
                  id="dayFilter"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
              
            </div>
            </div>

            {isLoadingStudents ? (
              <div>
                <ScaleLoader
                  style={{ padding: 30, position: "relative" }}
                  size={10}
                />
              </div>
            ) : (
              <>
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th>Instrument</th>
                      <th>Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterStudents().length > 0 ? (
                      filterStudents().map((student) => (
                        <React.Fragment key={student.studentID}>
                          <tr className="student-row">
                            <td>{student.studentID}</td>
                            <td>{student.studentName}</td>
                            <td>{student.instrument}</td>
                            <td>
                              {student.schedule && student.schedule.length > 0
                                ? student.schedule.map((session, index) => (
                                    <div key={index}>
                                      {session.day} ({session.time})
                                    </div>
                                  ))
                                : "No schedule assigned"}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No students available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {visibleStudents < studentData.length ? (
                  <button onClick={handleShowMore} className="show-more-btn">
                    Show More
                  </button>
                ):(
                  <p>That's all</p>
                )}
              </>
            )}
          </section>
          

          <section className="section_right">
            {/* Add Students Form */}
            <article id= "add_students">
              <h2>ADD STUDENTS</h2>
              <form className="add_students" onSubmit={handleSubmit(submitNewStudent)}>

                <div>
                  <input
                    type="text"
                    placeholder="STUDENT NAME"
                    id="studentName"
                    className="name"
                    {...register("studentName")}
                  />
                  <input
                    type="text"
                    placeholder="CONTACT"
                    id="contact"
                    {...register("contact")}
                  />
                  <input
                    type="text"
                    placeholder="EMAIL"
                    id="email"
                    {...register("email")}
                  />
                </div>
                <select
                  name="instrument"
                  id="instrument"
                  {...register("instrument")}
                >
                  <option value=""></option>
                  <option value="Drums">Drums</option>
                  <option value="Guitar">Guitar</option>
                  <option value="Saxophone">Saxophone</option>
                  <option value="Piano">Piano</option>
                  <option value="Violin">Violin</option>
                  <option value="Strings">Strings</option>
                </select>
                <button>ADD</button>{addSuccessMessage && <p className="success-message">Student added successfully!</p>}
                
              </form>
            </article>

            {/* Assign Students Form */}
            <article id="assign_student">
            <h2>ASSIGN STUDENTS</h2>
              <form className="assign_student">
                <div>
                <input
                  type="text"
                  placeholder="STUDENT ID"
                  id="studentID"
                  value={studentID} // Bind the value to studentID state
                  onChange={(e) => {
                    setStudentID(e.target.value); // Allow the field to be changed
                    setStudentIDassign(e.target.value); // Update the assignment ID as well
                    fetchStudentByID(e.target.value); // Fetch student based on new ID
                  }}
                />

                <input
                  type="text"
                  placeholder="STUDENT NAME"
                  id="studentName"

                  value={lastAddedStudent ? lastAddedStudent.studentName : ""} // Ensure controlled input
                  
                  readOnly
                />

                </div>

                <div>
                <select
                  id="instructors"
                  name="instructors"
                  disabled={!studentInstrument} // Only enabled when there's a student instrument
                  onChange={(e)=>{setInstructorID(e.target.value) ,setInstrument(studentInstrument)}}
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.instructorID} value={instructor.instructorID}>
                      {instructor.name}
                    </option>
                  ))}
                </select>

                </div>

                <div className= "day_time">
                  <select id="day" name="day" onChange={(e)=> setDay(e.target.value)}>
                    <option value=""></option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                  <input type="time" id="time" name="time" onChange={(e)=> setTime(e.target.value)}/>
                  <button type="button" onClick={handleAssignStudent}>ASSIGN</button>{assignSuccessMesssage && <p className="success-message">Student assigned successfully! 😊</p>}
                </div>
               

              </form>
            </article>

            {/* Delete Student Form */}
            <article id="delete_student">
              <h2>DELETE STUDENT</h2>
              <form
                
                className="delete_students"
                onSubmit={(e)=>
                  {
                    e.preventDefault();
                    findStudentID(delStudentID);
                  reset();
                }}
              >
                <input
                  type="text"
                  placeholder="STUDENT ID"
                  id="deleteStudentID"
                  value= {delStudentID}
                  onChange={(e) => {setDelStudentID(e.target.value);
                    findStudentID(e.target.value)
                  }}
                />
                
              </form>
              <div className="student_details_section">
                <div className="student_details">
                  <p>STUDENT DETAILS</p>
                  <p><br/></p>
                  <p>Name: <strong><em>{studentDetails.studentName}</em></strong></p>
                  <p>Email: <strong><em>{studentDetails.email}</em></strong></p>
                  <p>Contact: <strong><em>{studentDetails.contact}</em></strong></p>
                  <p>Instrument: <strong><em>{studentDetails.instrument}</em></strong></p>

                </div>
                <button 
                type="button"
                onClick={
                  ()=>handleDeleteStudent(delStudentID)
                }>DELETE</button>{deleteSuccessMesage && <p>Student Deleted Successfully‼️</p>}
              </div>
            </article>

            {/* View Student Form */}
            <article id="view_student">
              <h2>VIEW STUDENT</h2>
              <form
                
                className="delete_students"
                onSubmit={(e)=>
                  {
                    e.preventDefault();
                    view_StudentID(viewStudentID);
                  reset();
                }}
              >
                <input
                  type="text"
                  placeholder="STUDENT ID"
                  id="viewStudentID"
                  value= {viewStudentID}
                  onChange={(e) => setViewStudentID(e.target.value)}
                />
                <button type="submit">VIEW</button>
              </form>
              <div className="student_details_section">
                <div className="student_details">
                  <p>STUDENT DETAILS</p>
                  <p><br/></p>
                  <p>Name: <strong><em>{viewStudentDetails.studentName}</em></strong></p>
                  <p>Email: <strong><em>{viewStudentDetails.email}</em></strong></p>
                  <p>Contact: <strong><em>{viewStudentDetails.contact}</em></strong></p>
                  <p>Instrument: <strong><em>{viewStudentDetails.instrument}</em></strong></p>

                </div>
                </div>
            </article>
            
            <article id="update_student">
              <h2>UPDATE STUDENT</h2>
              <div className="update">
              <form
                className="update_students"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateStudentsDetails(); // Call update function on form submit
                }}
              >
                {/* Student ID Input */}
                <input
                  type="text"
                  placeholder="STUDENT ID"
                  id="updateStudentID"
                  value={updateStudentID}
                  onChange={(e) => {
                    setUpdateStudentID(e.target.value);
                    fetchStudentDetailsForUpdate(e.target.value); // Fetch details dynamically
                  }}
                />

                {/* Student Details Form */}
                {studentDetailsForUpdate ? (
                  <>
                    <input
                      type="text"
                      placeholder="Name"
                      value={updateStudentDetails.name}
                      onChange={(e) =>
                        setUpdateStudentDetails({ ...updateStudentDetails, name: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={updateStudentDetails.email}
                      onChange={(e) =>
                        setUpdateStudentDetails({ ...updateStudentDetails, email: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Contact"
                      value={updateStudentDetails.contact}
                      onChange={(e) =>
                        setUpdateStudentDetails({ ...updateStudentDetails, contact: e.target.value })
                      }
                    />
                      {/* Instrument Dropdown */}
                      <select
                        value={updateStudentDetails.instrument} // Set the value to the current instrument
                        onChange={(e) =>
                          setUpdateStudentDetails({ ...updateStudentDetails, instrument: e.target.value })
                        }
                      >
                        <option value="">Select Instrument</option>
                        <option value="Drums">Drums</option>
                        <option value="Guitar">Guitar</option>
                        <option value="Saxophone">Saxophone</option>
                        <option value="Piano">Piano</option>
                        <option value="Violin">Violin</option>
                        <option value="Strings">Strings</option>
                      </select>
                    <button type="submit">UPDATE</button>
                  </>
                ) : updateStudentID ? (
                  <p>Loading student details...</p>
                ) : (
                  <p>Enter a Student ID to load details.</p>
                )}
              </form>
              </div>
            </article>


          </section>
        </section>
      </section>
    </main>
  );
};

export default AdminStudentTab;
