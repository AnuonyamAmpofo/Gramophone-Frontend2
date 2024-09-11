// import React from 'react'
import { useForm } from "react-hook-form";
import NavbarAdmin from "../../components/Navbar2/NavbarAdmin";
import "./AdminStudentTab..css";
import { useState } from "react";

const AdminStudentTab = () => {
  const [newStudent, setNewStudent] = useState();
  const [studentID, setStudentID] = useState();
  const { register, handleSubmit, reset } = useForm();
  return (
    <main className="student_tab_main">
      <NavbarAdmin />
      <section>
        <h1>STUDENTS</h1>
        {/*  */}
        <article>
          <h2>ADD STUDENTS</h2>
          <form
            action=""
            className="add_students"
            onSubmit={handleSubmit((data) => {
              setNewStudent(data);
              console.log(newStudent);
              reset();
            })}
          >
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
              <option value="Keyboard">Keyboard</option>
            </select>
            <button>ADD</button>
          </form>
        </article>
        {/*  */}
        <article className="">
          <h2>ASSIGN STUDENTS</h2>
          <form action="" className="assign_students">
            <input type="text" placeholder="COURSE CODE" />
            <select>
              <option value=""></option>
              <option value="10:00 am">10:00 am</option>
              <option value="12:00pm">12:00pm</option>
              <option value="2:00pm">2:00pm</option>
              <option value="4:00pm">4:00pm</option>
            </select>
            <button>ASSIGN</button>
          </form>
        </article>
        {/*  */}
        <article>
          <h2>DELETE STUDENT</h2>
          <form
            action=""
            className="delete_students"
            onSubmit={handleSubmit((data) => {
              setStudentID(data);
              console.log(studentID);
              reset();
            })}
          >
            <input
              type="text"
              placeholder="STUDENT ID"
              {...register("studentID")}
            />
            <button>FIND</button>
          </form>
          <div className="student_details_section">
            <div className="student_details">
              <p>STUDENT DETAILS</p>
            </div>
            <button>DELETE</button>
          </div>
        </article>
        {/*  */}
        <article>
          <h2>VIEW STUDENT</h2>
          <form
            action=""
            className="delete_students view_students"
            onSubmit={handleSubmit((data) => {
              setStudentID(data);
              console.log(studentID);
              reset();
            })}
          >
            <input
              type="text"
              placeholder="STUDENT ID"
              {...register("studentID")}
            />
            <button>VIEW</button>
          </form>
          <div className="student_details">
            <p>STUDENT DETAILS</p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default AdminStudentTab;
