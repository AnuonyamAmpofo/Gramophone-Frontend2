/* eslint-disable react/prop-types */
import "./ReviewCard.css";

const ReviewCard = ({ client }) => {
  return (
    <div className="review-card">
      <h5>{client.review}</h5>
      <div className="card-info">
        <img src={client.profilePic} alt="" />
        <div>
          <h6>{client.name}</h6>
          <p style={{ fontSize: 12, color: "#828282" }}>{client.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
