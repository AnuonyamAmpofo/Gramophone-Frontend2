import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavbarInstructor from "../../components/Navbar2/NavbarInstructor";
import "./CourseDetail.css"; // Importing styles
import { ClipLoader } from 'react-spinners';
import {format} from 'date-fns'

const CourseDetail = () => {
  const { courseCode } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [studentComments, setStudentComments] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [expandedStudent, setExpandedStudent] = useState(null); // Track expanded student for dropdown
  const [studentData, setStudentData]= useState(null);
  const [loadingStudent, setLoadingStudent] = useState(null);
  const [visibleAnnouncements, setVisibleAnnouncements] = useState(3)

  // Fetch course data
  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://ampsgramophone-backend.vercel.app/instructors/courses/${courseCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch course data");
      }

      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  //fetch student data
  

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://ampsgramophone-backend.vercel.app/instructors/courses/${courseCode}/announcements`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data.announcements);
      } else {
        console.error("Failed to fetch announcements");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  // Handle posting a new announcement
  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://ampsgramophone-backend.vercel.app/instructors/courses/${courseCode}/announcement`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: announcementTitle, content: announcementContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to post announcement");
      }

      // Fetch the latest announcements after posting
      await fetchAnnouncements();

      // Clear the input fields
      setAnnouncementTitle("");
      setAnnouncementContent("");
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  // Handle posting a comment for a student
  const handlePostComment = async (studentID, comment) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://ampsgramophone-backend.vercel.app/instructors/courses/${courseCode}/student/${studentID}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      console.log(`Comment posted for student ${studentID}`);
      setStudentComments("")
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Toggle expanded student details
  const toggleStudentDetails = async (studentID) => {
    if (expandedStudent === studentID) {
      // Close the dropdown if it's already open
      setExpandedStudent(null);
    } else {
      // Set loading state for this student
      setLoadingStudent(studentID);
      setExpandedStudent(studentID);
  
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://ampsgramophone-backend.vercel.app/instructors/courses/students/${studentID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setStudentData(data); // Save student data once it's fetched
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStudent(null); // Stop loading once data is fetched
      }
    }
  };
  const handleShowMore = () => {
    setVisibleAnnouncements(prevVisible=> prevVisible+ 5);
  };

  useEffect(() => {
    fetchCourseData();
    fetchAnnouncements();
  }, [courseCode]);

  if (!courseData) return <p>Loading...</p>;

  return (
    <>
      <NavbarInstructor />
      <div className="course-detail-container">
        <h2 className="course-title">{courseData.courseCode}</h2>
        <div className="short-details">
          <p><strong>Day:</strong> {courseData.day}</p>
          <p><strong>Number of Students:</strong> {courseData.numberOfStudents}</p>
        </div>
        {/* List of Students */}
        <h3>Student Sessions</h3>
        <table className="student-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Session Time</th>
            </tr>
          </thead>
          <tbody>
            {courseData.sessions.map((session) => (
              <React.Fragment key={`${session.studentID}`}>
                <tr
                  className="student-row"
                  onClick={() => toggleStudentDetails(session.studentID)}
                >
                  <td>{session.studentID}</td>
                  <td>{session.studentName}</td>
                  <td>{session.time}</td>
                </tr>
                {expandedStudent === session.studentID && (
                  <tr className="student-details-dropdown">
                    <td colSpan="3">
                      {loadingStudent === session.studentID ? (
                        <div className="loading-container">
                          <ClipLoader color={"#463c06"} size={30} />
                        </div>
                      ) : (
                        <div className="student-details">
                          <h4>{session.studentName}'s Details</h4>
                          <p><strong>Session Time:</strong> {session.time}</p>
                          <p><strong>Email: </strong>{studentData.email}</p>
                          <p><strong>Phone: </strong>0{studentData.contact}</p>
                          
                          {/* Commen t Section */}
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const comment = studentComments[session.studentID];
                              handlePostComment(session.studentID, comment);
                            }}
                          >
                            <textarea
                              className="comment-textarea"
                              placeholder={`Comment for ${session.studentName}`}
                              value={studentComments[session.studentID] || ""}
                              onChange={(e) =>
                                setStudentComments({
                                  ...studentComments,
                                  [session.studentID]: e.target.value,
                                })
                              }
                            />
                            <button className="btn-post" type="submit">Post Comment</button>
                          </form>
                        </div>
                      )}
                    </td>
                  </tr>
                )}

              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Announcements Section */}
        <section className="announce">
        <div className="announcements-section">
          <h3>Announcements</h3>
          {announcements.length > 0 ? (
            <>
            {announcements.slice(0, visibleAnnouncements).map((announcement) => (
            
              <div key={announcement._id} className="announcement">
                <h4>{announcement.title}</h4>
                <p>{announcement.content}</p>
                <p className="announcement-date">
                  <em>Posted on: {new Date(announcement.createdAt).toLocaleString()} </em>
                </p>
              </div>
            ))}
            {visibleAnnouncements < announcements.length && (
                  <button className="btn-show-more" onClick={handleShowMore}>
                    Show More
                  </button>
                )}
            </>
          ) : (
            <h4>No announcements posted yet.</h4>
          )}
        </div>

        {/* Post Announcement Section */}
        <div className="post-announcement-section">
          <h3 className="post-heading">Post an Announcement</h3>
          <form onSubmit={handlePostAnnouncement}>
            <input
              className="announcement-input"
              type="text"
              placeholder="Title"
              value={announcementTitle}
              onChange={(e) => setAnnouncementTitle(e.target.value)}
            />
            <textarea
              className="announcement-textarea"
              placeholder="Content"
              value={announcementContent}
              onChange={(e) => setAnnouncementContent(e.target.value)}
            />
            <button className="btn-post" type="submit">Post</button>
          </form>
        </div>
        </section>
      </div>
    </>
  );
};

export default CourseDetail;
