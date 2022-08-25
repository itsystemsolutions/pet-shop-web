import { useEffect, useState } from "react";
import { useHistory } from "react-router";

// react-bootstrap components
import { Card, Table, Container, Button } from "react-bootstrap";

const axios = require("axios").default;

function Adopties() {
  const history = useHistory();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/adopt-form/for-interview").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">Request Interview</Card.Title>
          <p className="card-category">
            List of users who want to adopt a pet and passed the exam
          </p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Name</th>
                <th className="border-0">Pet Code</th>
                <th className="border-0">Result / Score</th>
                <th className="border-0">Exam Enswers</th>
                <th className="border-0">Status</th>
                <th className="border-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>{entry.name}</td>
                    <td>{entry.petCode}</td>
                    <td>
                      {entry.formResult} - {entry.formScore}
                    </td>
                    <td>PENDING_FEATURE</td>
                    <td>
                      {entry.status === "FOR_INTERVIEW"
                        ? "Ready For Interview"
                        : ""}
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          history.push(
                            `/admin/zoom/${entry.userId}/${entry.petCode}`
                          )
                        }
                      >
                        Schedule Interview
                      </Button>
                    </td>
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
