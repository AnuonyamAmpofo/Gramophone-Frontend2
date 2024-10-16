import React, { useState, useEffect } from "react";
import "../../pages/StudentDashboard/StudentDashboard.css";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [visibleAnnouncements, setVisibleAnnouncements] = useState(3);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("https://ampsgramophone-backend.vercel.app/students/allannouncements", {
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
        setAnnouncements(data.announcements);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, []);

  const visible = announcements.slice(0, visibleAnnouncements);

  const handleShowMore = ()=>{
    setVisibleAnnouncements(visibleAnnouncements + 5);
  }

  return (
    <table className="announcementss">
      <thead>
        <tr>
          <td className="table-heading main-column">Courses</td>
          <td className="table-heading middle-column">Content</td>
          <td className="table-heading last-column">Time</td>
        </tr>
      </thead>
      <tbody>
        {visible.length > 0 ? (
          visible.map((announcement, index) => (
            <tr key={index}>
              <td className="main-column">
                {announcement.courseCode || "Admin"}
              </td>
              <td className="middle-column">{announcement.content}</td>
              <td className="last-column">{new Date(announcement.time).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No announcements available</td>
          </tr>
        )}
        {announcements.length > visibleAnnouncements&& (
        <button onClick={handleShowMore} className="show-more-btn">Show More</button>
      )}

      </tbody>
    </table>
  );
};

export default Announcement;
