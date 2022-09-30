import { useEffect, useState } from "react";
import { useHistory } from "react-router";

// react-bootstrap components
import { Card, Table, Container, Button, Badge } from "react-bootstrap";

// Alert Dialogs
import Swal from "sweetalert2";

const axios = require("axios").default;

function Appointments() {
  const history = useHistory();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/schedule/for-interview")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleApproveAppointment = (e, data) => {
    e.preventDefault();

    axios
      .put(
        process.env.REACT_APP_API_URL +
          "/schedule/" +
          data.id +
          "?decision=PASSED"
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `SUCCESS! `,
          text: `Record approved! We will redirect you now to PICK-UP form`,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push(`/admin/pick-up/${data.userId}/${data.petCode}`);
          }
        });
      });
  };

  const handleDenyAppointment = (e, id) => {
    e.preventDefault();

    axios
      .put(
        process.env.REACT_APP_API_URL + "/schedule/" + id + "?decision=FAILED"
      )
      .then(() => {
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
          <Card.Title as="h4">Admin Interviews</Card.Title>
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
                <th className="border-0">Interview LINK</th>
                <th className="border-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>{entry.name}</td>
                    <td>
                      <img
                        src={`http://16.163.143.49:8081/PETSHOP/images/pets/${entry.petCode}.jpg`}
                        alt=""
                        height={110}
                        className="mb-3"
                      />
                      <div>Name: {entry.petName}</div>
                      <div>
                        Code:{" "}
                        <a
                          href={`http://16.163.143.49:3000//pets/${entry.petCode}`}
                          target="_blank"
                        ></a>
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
                    <td>
                      {entry.status !== "WAITING" ? (
                        <Badge className="bg-info text-white">
                          {entry.status}
                        </Badge>
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

export default Appointments;
