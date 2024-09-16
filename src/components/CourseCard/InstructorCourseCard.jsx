import "./InstructorCard.css";

const getImageURL= (name)=>{
  if (name.startsWith("Drum")){
    return "/assets/Images/Drum PIC.jpg";
  }
  else if (name.startsWith("Guitar")){
    return "/assets/Images/guitar.jpg";
  }else if (name.startsWith("Piano")){
    return "/assets/Images/piano.jpg";
  }else if (name.startsWith("Violin")){
    return "/assets/Images/violin.jpg";
  }else if (name.startsWith("Sax")){
    return "/assets/Images/sax.jpg";
  }
  else{
    return "/assets/images/default.png"
  }
}


const InstructorCourseCard = ({ course }) => {
  return (
    <section className="course-card">
      <article className="course-1">
   
          <div className="course-details">
        
          
            <h2 className="course-name">{course.name}</h2>
            
        
      
        <div className="course-info-group">
          <div className="course-info-item">
            <p className="course-info-label">Instructor</p>
            <h3 className="course-info-value">{course.instructorName}</h3>
          </div>
          <div className="course-info-item">
            <p className="course-info-label">Day</p>
            <h3 className="course-info-value">{course.dayOfSession}</h3>
          </div>
          <div className="course-info-item">
            <p className="course-info-label">Number of Students</p>
            <h3 className="course-info-value">{course.numberOfStudents}</h3>
          </div>
        </div>
      
      </div>
      
        
        </article>
      <article className="course-2">
        <img src={getImageURL(course.name)} alt={course.name} className="course-image" />
        <div className= "announcements">
          <p>Click for more info about this course...</p>
        </div>
      </article>

    </section>
  );
};

export default InstructorCourseCard;
