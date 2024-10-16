/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import "../../pages/StudentCourses/StudentCourses.css"; // Adjust the path as necessary

// Function to get image URL based on courseCode
const getImageURL = (courseCode) => {
  if (courseCode.startsWith("Drum")) {
    return "/assets/Images/Drum PIC.jpg"; // Path to drum image
  }
  else if (courseCode.startsWith("Gui")){
    return "/assets/Images/guitar.jpg";
  } else if (courseCode.startsWith("Piano")){
    return "/assets/Images/piano.jpg";
  } else if (courseCode.startsWith("Violin")){
    return "/assets/Images/violin.jpg";
  } else if(courseCode.startsWith("Sax")){
    return "/assets/Images/sax.jpg";
  }

  return "/assets/images/default.png";
};

const CourseCard = ({ course }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [visibleAnnouncements, setVisibleAnnouncements] = useState(3); // Initially show 3 announcements
  const [allAnnouncements, setAllAnnouncements] = useState([]); // Store all announcements for future display

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch(`https://ampsgramophone-backend.vercel.app/students/courses/${course.courseCode}/getcourseannouncements`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          // Sort announcements by createdAt in descending order
          const sortedAnnouncements = data.announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAllAnnouncements(sortedAnnouncements);
          setAnnouncements(sortedAnnouncements.slice(0, visibleAnnouncements));
        } else {
          console.error("Failed to fetch announcements:", data.message);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, [course.courseCode, visibleAnnouncements]);

  // Function to show more announcements
  const handleShowMore = () => {
    const newVisibleCount = visibleAnnouncements + 5;
    setVisibleAnnouncements(newVisibleCount);
    setAnnouncements(allAnnouncements.slice(0, newVisibleCount));
  };

  return (
    <section className="course" id={course.courseCode}>
      <article className="course-1">
        <div className="course-info">
          <h2>{course.courseCode}</h2>
          <div>
            <p>Instructor</p>
            <h3><strong>{course.instructorName}</strong></h3>
          </div>
          <div>
            <p>Day</p>
            <h3><strong>{course.day}</strong></h3>
          </div>
          <div>
            <p>Time</p>
            <h3><strong>{course.time}</strong></h3>
          </div>
        </div>
        <img src={getImageURL(course.courseCode)} alt={course.courseCode} className="course-image" />
      </article>
      <article className="course-2">
        <div className='Announce-Contact'>
          <div className="announcements">
            <h3>Announcements</h3>
            {announcements.length > 0 ? (
              <ul>
                {announcements.map((announcement) => (
                  <li key={announcement._id} className='Announcement-list'>
                    <h4 className='announcement-title'>{announcement.title}</h4> {/* Title of the announcement */}
                    <p className='announcement-content'>{announcement.content}</p> {/* Content of the announcement */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No announcements available for this course.</p>
            )}
            {allAnnouncements.length > visibleAnnouncements && (
              <button onClick={handleShowMore} className="show-more-btn">Show More</button>
            )}
          </div>
          <div className="contact_tutor">
            <h3>Contact your tutor</h3>
            <p>Name: {course.instructorName}</p>
            <p>Email: {course.instructorEmail}</p>
            <p>Phone: {course.instructorPhone}</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default CourseCard;
