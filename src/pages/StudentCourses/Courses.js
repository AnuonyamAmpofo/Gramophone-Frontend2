// fetchCourses.js
export const Courses = async () => {
  try {
    const token = localStorage.getItem("token"); // Assuming the JWT is stored in localStorage

    const response = await fetch("https://ampsgramophone-backend.vercel.app/students/courses", { // Replace with your actual API endpoint
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Pass the token in the header
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await response.json();
    return data.courses.map((course) => ({
      id: course._id,
      name: course.courseCode,
      instructorName: course.instructorDetails.name,
      instructorEmail: course.instructorDetails.email,
      instructorPhone: course.instructorDetails.contact,
      dayOfSession: course.day,
      timeOfSession: course.time,
    }));
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
};
