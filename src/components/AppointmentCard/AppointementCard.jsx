/* eslint-disable react/prop-types */
import "../AppointmentCard/AppointmentCard.css";

const AppointementCard = ({ appointment }) => {
  return (
    <div className="appointment-card">
      <img src={appointment.image} alt="" />
      <h3 style={{ color: "#c3a71d" }}>{appointment.instrument}</h3>
      <p style={{ color: "gray" }}>{appointment.day}</p>
      <p style={{ color: "gray" }}>{appointment.time}</p>
    </div>
  );
};

export default AppointementCard;
