import "./dashboardInfo.css";

const Timetable = () => {
  const data = [
    { instrument: "Voice", sessions: 4, time: "8.00am" },
    { instrument: "Piano", sessions: 3, time: "2.00pm" },
    { instrument: "Trumpet", sessions: 8, time: "7.00pm" },
    { instrument: "Sax", sessions: 4, time: "9.00am" },
    { instrument: "Clarinet", sessions: 3, time: "5.00pm" },
    { instrument: "Trombone", sessions: 4, time: "8.00pm" },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Instrument
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Sessions</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {item.instrument}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {item.sessions}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {item.time}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>.....</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>405</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>meh</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Timetable;
