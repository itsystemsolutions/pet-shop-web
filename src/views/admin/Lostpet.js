import { useEffect, useState } from "react";
import { useHistory } from "react-router";

// react-bootstrap components
import { Card, Table, Container, Button, Badge } from "react-bootstrap";

import Swal from "sweetalert2";

const axios = require("axios").default;

function Lostpet() {
  const history = useHistory();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "").then((response) => {
      setData(response.data);
    });
  }, []);

  const handleApproveAppointment = (e, data) => {
    e.preventDefault();

    axios.put("" + data.id + "?decision=PASSED").then(() => {
      Swal.fire({
        icon: "approve",
        title: `APPROVE! `,
        text: `Record approved! We Post your pet find it`,
      });
    });
  };

  const handleDenyAppointment = (e, id) => {
    e.preventDefault();

    axios.put("" + id + "?decision=FAILED").then(() => {
      Swal.fire({
        icon: "failed",
        title: `FAILED! `,
        text: `Record is updated!`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
  };

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">Admin Interviews</Card.Title>
          <p className="card-category">List of interviews</p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Name</th>
                <th className="border-0">Email</th>
                <th className="border-0">Mobile</th>
                <th className="border-0">LastLocation</th>
                <th className="border-0">Breed</th>
                <th className="border-0">Gender</th>
                <th className="border-0">Message</th>
                <th className="border-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>{entry.name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.gender}</td>
                    <td>{entry.lastlocation}</td>
                    <td>{entry.Breed}</td>
                    <td>{entry.Mobile}</td>

                    <td>{entry.message}</td>

                    <td>
                      {entry.status === "PASSED" ? (
                        <Badge className="bg-success text-white">Passed</Badge>
                      ) : (
                        <>
                          <Button
                            className="btn btn-success mr-2"
                            onClick={(e) => handleApproveAppointment(e, entry)}
                          >
                            PASSED
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={(e) => handleDenyAppointment(e, entry.id)}
                          >
                            FAILED
                          </Button>
                        </>
                      )}
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

export default Lostpet;
