import { useEffect, useState } from "react";

// react-bootstrap components
import { Card, Table, Container, Button, Badge } from "react-bootstrap";

import Swal from "sweetalert2";
const axios = require("axios").default;

function Appointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/schedule/for-interview?userId=" +
          localStorage.getItem("user_id")
      )
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">My Appointments</Card.Title>
          <p className="card-category">List of interview set by admin</p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Pet Code</th>
                <th className="border-0">Pet Type</th>
                <th className="border-0">Date</th>
                <th className="border-0">Time</th>
                <th className="border-0">Message</th>
                <th className="border-0">Interview LINK</th>
                <th className="border-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/pets/${entry.petCode}.jpg`}
                        alt=""
                        height={110}
                        className="mb-3"
                      />
                      <div>Name: {entry.petName}</div>
                      <div>
                        Code:{" "}
                        <a
                          href={`${process.env.REACT_APP_URL}/user/pet/info/${entry.petCode}`}
                          target="_blank"
                        >
                          {entry.petCode}
                        </a>
                      </div>
                    </td>
                    <td>{entry.petType}</td>
                    <td>{entry.date}</td>
                    <td>{entry.time}</td>
                    <td>{entry.message}</td>
                    <td>
                      <a href={entry.zoomLink} target="_blank">
                        {entry.zoomLink}
                      </a>
                    </td>
                    <td>{entry.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Appointments;
