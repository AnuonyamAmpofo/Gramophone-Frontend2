/* eslint-disable react/prop-types */
// import React from "react";
import "../../pages/StudentCourses/StudentCourses.css";

const InstructorCourseCard = ({ course }) => {
  return (
    <article className="course-1">
      <div className="course-info">
        <h2>{course.name}</h2>
        <div>
          <p>Instructor</p>
          <h3>{course.instructorName}</h3>
        </div>
        <div>
          <p>Day</p>
          <h3>{course.dayOfSession}</h3>
        </div>
        <div>
          <p>Time</p>
          <h3>{course.timeOfSession}</h3>
        </div>
      </div>
      <img src={course.imageURL} alt="" />
    </article>
  );
};

export default InstructorCourseCard;
