/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import "../../pages/StudentCourses/StudentCourses.css";

// Function to get image URL based on courseCode
const getImageURL = (courseCode) => {
  if (courseCode.startsWith("Drum")) {
    return "/assets/Images/Drum PIC.jpg"; // Path to drum image
  }
  // Add more conditions for other course types if needed
  // For example:
  // if (courseCode.startsWith("Piano")) {
  //   return "/assets/images/piano.png";
  // }

  // Default image if no match is found
  return "/assets/images/default.png";
};

const CourseCard = ({ course }) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`https://ampsgramophone-backend.vercel.app/courses/${course.courseCode}/announcements`); // Adjust URL as needed
        const data = await response.json();
        if (response.ok) {
          setAnnouncements(data.announcements);
        } else {
          console.error("Failed to fetch announcements:", data.message);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, [course.courseCode]);

  return (
    <section className="course">
      <article className="course-1">
        <div className="course-info">
          <h2>{course.courseCode}</h2> {/* Using courseCode */}
          <div>
            <p>Instructor</p>
            <h3>{course.instructorName}</h3>
          </div>
          <div>
            <p>Day</p>
            <h3>{course.day}</h3> {/* Original field names */}
          </div>
          <div>
            <p>Time</p>
            <h3>{course.time}</h3> {/* Original field names */}
          </div>
        </div>
        <img src={getImageURL(course.courseCode)} alt={course.courseCode} className="course-image" />
      </article>
      <article className="course-2">
        <div className="announcements">
          <h3>Announcements</h3>
          {announcements.length > 0 ? (
            <ul>
              {announcements.map((announcement) => (
                <li key={announcement._id}>{announcement.message}</li> // Adjust according to your announcement schema
              ))}
            </ul>
          ) : (
            <p>No announcements available for this course.</p>
          )}
        </div>
        <div className="contact_tutor">
          <h3>Contact your tutor</h3>
          <p>Name: {course.instructorName}</p>
          <p>Email: {course.instructorEmail}</p>
          <p>Phone: {course.instructorPhone}</p>
        </div>
      </article>
    </section>
  );
};

export default CourseCard;
