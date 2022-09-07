import { useEffect, useState } from "react";

// react-bootstrap components
import { Card, Table, Container, Button, Badge } from "react-bootstrap";

import Swal from "sweetalert2";

const axios = require("axios").default;

function Appointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/schedule/for-pick-up").then((response) => {
      setData(response.data);
    });
  }, []);

  const handleApprovePickUp = (e, entry) => {
    e.preventDefault();

    axios.put("/schedule/pick-up/" + entry.id + "?decision=PASSED").then(() => {
      Swal.fire({
        icon: "success",
        title: `SUCCESS! `,
        text: `Record is updated!`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
  };

  const handleDenyAppointment = (e, id) => {
    e.preventDefault();

    axios.put("/schedule/pick-up/" + id + "?decision=FAILED").then(() => {
      Swal.fire({
        icon: "success",
        title: `SUCCESS! `,
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
          <Card.Title as="h4">For PickUp</Card.Title>
          <p className="card-category">List of interviews</p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Name</th>
                <th className="border-0">Pet Code</th>
                <th className="border-0">Pet Type</th>
                <th className="border-0">Date</th>
                <th className="border-0">Time</th>
                <th className="border-0">Message</th>
                <th className="border-0">Proof Of Payment</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>{entry.name}</td>
                    <td>
                      <img
                        src={`http://localhost:8081/PETSHOP/images/pets/${entry.petCode}.jpg`}
                        alt=""
                        height={110}
                        className="mb-3"
                      />
                      <div>Name: {entry.petName}</div>
                      <div>Code: {entry.petCode}</div>
                    </td>
                    <td>{entry.petType}</td>
                    <td>{entry.date}</td>
                    <td>{entry.time}</td>
                    <td>{entry.message}</td>
                    <td>
                      {entry.hasProofPayment ? (
                        <a href={`/admin/proof-of-payment/${entry.id}`}>SHOW</a>
                      ) : (
                        <>NONE</>
                      )}
                    </td>

                    <td>
                      {entry.status === "PASSED" ? (
                        <Badge className="bg-success text-white">Passed</Badge>
                      ) : (
                        <>
                          <Button
                            className="btn btn-success mr-2"
                            onClick={(e) => handleApprovePickUp(e, entry)}
                          >
                            DONE
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={(e) => handleDenyAppointment(e, entry.id)}
                          >
                            CANCEL
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

export default Appointments;
