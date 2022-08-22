import { useEffect, useState } from "react";

// react-bootstrap components
import { Card, Table, Container } from "react-bootstrap";

const axios = require("axios").default;

function Adopties() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/user?type=ADOPTEE").then(response => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">Adopties List</Card.Title>
          <p className="card-category">List of users who want to adopt a pet</p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">ID</th>
                <th className="border-0">Name</th>
                <th className="border-0">Mobile Number</th>
                <th className="border-0">Username</th>
                <th className="border-0">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map(entry => {
                return (
                  <tr>
                    <td>{entry.id}</td>
                    <td>{entry.name}</td>
                    <td>{entry.mobile}</td>
                    <td>{entry.username}</td>
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

export default Adopties;
