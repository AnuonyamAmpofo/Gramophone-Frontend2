import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [expandedStudent, setExpandedStudent] = useState(null); // For comments dropdown

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://ampsgramophone-backend.vercel.app/courses/${courseId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCourseData(data);
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (!courseData) {
    return <div>Loading course details...</div>;
  }

  const toggleStudentDetails = (studentId) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  return (
    <div className="course-detail-page">
      <h1>Course: {courseData.courseCode}</h1>
      <p><strong>Day:</strong> {courseData.day}</p>
      <p><strong>Number of Students:</strong> {courseData.students.length}</p>

      {/* Table for displaying student details */}
      <div className="student-list">
        <h2>Students:</h2>
        <table className="student-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Session Time</th>
            </tr>
          </thead>
          <tbody>
            {courseData.students.map((student) => (
              <tr key={student.studentId} onClick={() => toggleStudentDetails(student.studentId)}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.sessionTime}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Optional dropdown for additional details */}
        {expandedStudent && (
          <div className="student-details-dropdown">
            <h3>Comments for {expandedStudent}</h3>
            <textarea placeholder="Add a comment for this student"></textarea>
            <button>Post Comment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
