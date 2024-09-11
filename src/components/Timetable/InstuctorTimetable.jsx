import "../../pages/StudentDashboard/StudentDashboard.css";

const InstructorTimetable = () => {
  return (
    <table className="timetable">
      <thead>
        <tr>
          <td className="table-heading id-colum">STUDENT ID</td>
          <td className="table-heading name-column">STUDENT NAME</td>
          <td className="table-heading time-column">Time</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="id-column">0052</td>
          <td className="name-column">STUDENT 1</td>
          <td className="time-column">8:00 am</td>
        </tr>
        <tr>
          <td className="id-column">0042</td>
          <td className="name-column">STUDENT 1</td>
          <td className="time-column">2:00 pm</td>
        </tr>
        <tr>
          <td className="id-column">0184</td>
          <td className="name-column">STUDENT 1</td>
          <td className="time-column">7:00 pm</td>
        </tr>
        <tr>
          <td className="id-column">0053</td>
          <td className="name-column">STUDENT 1</td>
          <td className="time-column">9:00 pm</td>
        </tr>
        <tr>
          <td className="id-column">0057</td>
          <td className="name-column">STUDENT 1</td>
          <td className="time-column">5:00 pm</td>
        </tr>
        <tr className="trombone">
          <td className="id-column">0034</td>
          <td className="name-column">STUDENT 1</td>
          <td className="time-column">8:00 pm</td>
        </tr>
      </tbody>
    </table>
  );
};

export default InstructorTimetable;
