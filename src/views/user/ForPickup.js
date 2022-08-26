import { useEffect, useState } from "react";
import { useHistory } from "react-router";

// react-bootstrap components
import { Card, Table, Container, Button } from "react-bootstrap";

import Swal from "sweetalert2";

const axios = require("axios").default;

function Appointments() {
  let history = useHistory();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/schedule/for-pick-up").then((response) => {
      setData(response.data);
    });
  }, []);

  const handleApproveAppointment = (e, id) => {
    e.preventDefault();

    axios.put("/schedule/" + id + "?decision=PASSED").then(() => {
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

    axios.put("/schedule/" + id + "?decision=FAILED").then(() => {
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
                <th className="border-0">Date</th>
                <th className="border-0">Time</th>
                <th className="border-0">Message</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>{entry.name}</td>
                    <td>{entry.petCode}</td>
                    <td>{entry.date}</td>
                    <td>{entry.time}</td>
                    <td>{entry.message}</td>
                    <td>
                      {entry.hasProofPayment ? (
                        <>UPLOADED</>
                      ) : (
                        <Button
                          onClick={() =>
                            history.push(
                              "/user/upload/proof-of-payment/" + entry.id
                            )
                          }
                        >
                          Upload Proof of Payment
                        </Button>
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
