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
  const [visibleAnnouncements, setVisibleAnnouncements] = useState(3);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editAnnouncementId, setEditAnnouncementId] = useState(null);
  const [isPostingAnnouncement, setIsPostingAnnouncement] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [isPostingEdit, setIsPostingEdit] = useState(false);
  const [isDeletingAnnouncement, setIsDeletingAnnouncement]= useState(false);




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
  const handleEditClick = (announcement) => {
    setEditTitle(announcement.title);
    setEditContent(announcement.content);
    setEditAnnouncementId(announcement._id);
    setIsEditModalOpen(true);
  };
  
  const handlePostEdit = async (announcementId) => {
    setIsPostingEdit(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ampsgramophone-backend.vercel.app/instructors/courses/${courseCode}/announcement/${announcementId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: editTitle, content: editContent }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to edit announcement");
      }
  
      console.log(`Announcement ${announcementId} updated`);
      setAnnouncements(announcements.map((a) =>
        a._id === announcementId ? { ...a, title: editTitle, content: editContent } : a
      ));
      setIsEditModalOpen(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error editing announcement:", error);
    } finally{
      setIsPostingEdit(false);
    }
  };
  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };
  
  

  const handleCloseModal =() =>{
    setIsModalOpen(false);
    setSelectedAnnouncement(null);
  }

  
  const handleDeleteAnnouncement = async (announcementId) => {
    setIsDeletingAnnouncement(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ampsgramophone-backend.vercel.app/instructors/courses/${courseCode}/announcement/${announcementId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete announcement");
      }
  
      console.log(`Announcement ${announcementId} deleted`);
      // Remove the deleted announcement from state
      setAnnouncements(announcements.filter((a) => a._id !== announcementId));
      setIsEditModalOpen(false);
      setIsModalOpen(false); // Close modal if open
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }finally{
      setIsDeletingAnnouncement(false)
    }
  };
  

  // Handle posting a new announcement
  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    setIsPostingAnnouncement(true)
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
    } finally{
      setIsPostingAnnouncement(false);
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

  if (!courseData) return (
    <>
    <NavbarInstructor/>
      <div className="loading-screen">
    
        <ClipLoader color={"#463c06"} size={100} />
        {/* <Footer />  */}
      </div>
      </>
    );


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
        
          <h3>Announcements</h3>
          <div className="announcements-section">
          {announcements.length > 0 ? (
            <>
            {announcements.slice(0, visibleAnnouncements).map((announcement) => (
            
              <div key={announcement._id} className="announcement" onClick={() => handleAnnouncementClick(announcement)}>
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

        {isModalOpen && (
          <div className="modal-overlays">
            <div className="modal-contents">
              <h4>Announcement Options</h4>
              <div className= "buttons"> 
              <button className="btn-modal" onClick={() => handleEditClick(selectedAnnouncement)}><p>Edit</p></button>
              <button className="btn-modal" onClick={() => handleDeleteAnnouncement(selectedAnnouncement._id)}>
                {isDeletingAnnouncement ? (
              <ClipLoader color={"#463c06"} size={25} />
            ) : (<p>Delete</p>)}</button>
              <button className="btn-modal" onClick={handleCloseModal}><p>Close</p></button>
              </div>
            </div>
          </div>
        )}

        
        {isEditModalOpen && (
          <div className="modal-overlays">
            <div className="modal-contents">
              <h4>Edit Announcement</h4>
              <div className="Edit">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="textarea"
              />
              </div>
              <div className="buttons">
              <button  onClick={() => handlePostEdit(editAnnouncementId)}>{isPostingEdit ? (<ClipLoader color={"#463c06"} size={30} />):(<p>Post Edit</p>)}</button>
              <button  onClick={() => setIsEditModalOpen(false)}><p>Cancel</p></button>
              </div>
            </div>
          </div>
        )}

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
            <button className="btn-post" type="submit">{isPostingAnnouncement ? (
              <ClipLoader color={"#463c06"} size={30} />
            ) : (
              "Post"
            )}</button>
            
          </form>
        </div>
        </section>
      </div>
    </>
  );
};

export default CourseDetail;
