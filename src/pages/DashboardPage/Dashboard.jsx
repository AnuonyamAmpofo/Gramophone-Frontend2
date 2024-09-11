import Navbar2 from "../../components/Navbar2/Navbar2";
import Footer from "../../components/Footer/Footer";
import FeesOwed from "../../components/Graph/FeesOwed";
import TimeSpentStudying from "../../components/Graph/TimeSpentStudying";
import InstrumentsBeingStudied from "../../components/Graph/InstrumentsBeingStudied";
import TutorList from "../../components/Graph/TutorList";
import StudentList from "../../components/Graph/StudentList";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="container">
      <Navbar2 />
      <div className="dashboard">
        <div className="miniInfo">
          <div className="tiles">
            <FeesOwed />
            <TimeSpentStudying />
            <InstrumentsBeingStudied />
          </div>
          <div className="otherStuff">
            <div className="lists">
              <TutorList />
              <StudentList />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
