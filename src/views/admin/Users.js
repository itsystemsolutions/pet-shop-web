import { useEffect, useState } from "react";
import { useHistory } from "react-router";

// react-bootstrap components
import { Card, Table, Container, Button } from "react-bootstrap";

import Swal from "sweetalert2";

const axios = require("axios").default;

function Appointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/user?type=USER").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">Users Masterlist</Card.Title>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Name</th>
                <th className="border-0">Mobile</th>
                <th className="border-0">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>{entry.name}</td>
                    <td>{entry.mobile}</td>
                    <td>{entry.email}</td>
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
