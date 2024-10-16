import React, { useState, useEffect } from "react";
import "../../pages/StudentDashboard/StudentDashboard.css";

const InstructorComments = () => {
  const [allComments, setAllComments] = useState([]); // Store all comments
  const [visibleComments, setVisibleComments] = useState(3); // Initially show 3 comments

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("https://ampsgramophone-backend.vercel.app/students/comments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Response error:", response.statusText);
          return;
        }

        const data = await response.json();
        console.log("Comments Data:", data);

        // Ensure 'comments' is an array before sorting
        if (data.comments && Array.isArray(data.comments)) {
          const sortedComments = data.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAllComments(sortedComments);
        } else {
          console.error("Comments data is not an array:", data.comments);
          setAllComments([]);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, []); 

  const visible = allComments.slice(0, visibleComments);

  const handleShowMore = () => {
    setVisibleComments(prev => prev + 5);
  };

  return (
    <div className="instructor-comments">
      <h3>Instructor Feedback</h3>
      {visible.length > 0 ? (
        <ul>
          {visible.map((comment) => (
            <li key={comment.commentID} className='Comment-list'>
              <strong>{comment.courseCode}:</strong> {comment.content} <em>({new Date(comment.date).toLocaleDateString()})</em>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
      {allComments.length > visibleComments && (
        <button onClick={handleShowMore} className="show-more-btn">Show More</button>
      )}
    </div>
  );
};

export default InstructorComments;
