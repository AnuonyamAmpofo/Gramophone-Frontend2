import React, { useState, useEffect } from "react";
import "../../pages/StudentDashboard/StudentDashboard.css";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

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
        console.log("Announcements Data:", data);
        setAnnouncements(data.announcements);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, []);

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
        {announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <tr key={index}>
              <td className="main-column">
                {announcement.courseCode || "Admin"}
              </td>
              <td className="middle-column">{announcement.content}</td>
              <td className="last-column">{announcement.time}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No announcements available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Announcement;
