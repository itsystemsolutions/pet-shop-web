import React, { useState, useEffect } from "react";

import { Card, Table, Container, Button, Badge } from "react-bootstrap";
import Swal from "sweetalert2";

const axios = require("axios").default;

function EligiblePets() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/adopt-form/" + localStorage.getItem("user_id"))
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleRequestInterviews = (e, petCode) => {
    e.preventDefault();

    axios
      .get(
        "/adopt-form/request-interview?id=" +
          localStorage.getItem("user_id") +
          "&petCode=" +
          petCode
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: `SUCCESS! `,
            text: `We will schedule a zoom meeting for you!`,
          });
          window.location.reload();
        }
      })
      .catch((res) => {
        Swal.fire({
          icon: "error",
          title: `FAILED!`,
          text: `You already requested an inteview with this pet!`,
        });
      });
  };

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">Approved Pet's</Card.Title>
          <p className="card-category">
            Here are list of pets that passed the evaluation score.
          </p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">ID</th>
                <th className="border-0">Request Interview</th>
                <th className="border-0">Name</th>
                <th className="border-0">Date And Time</th>
                <th className="border-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>
                    <Button
                      onClick={(e) => handleRequestInterviews(e, item.petCode)}
                    >
                      Request Interview
                    </Button>
                  </td>
                  <td>
                    <img
                      src={`http://localhost:8081/PETSHOP/images/pets/${item.petCode}.jpg`}
                      alt=""
                      height={110}
                      className="mb-3"
                    />
                    <div>Name: {item.petName}</div>
                    <div>Code: {item.petCode}</div>
                  </td>
                  <td>{item.timestamp}</td>
                  <td className="text-white">
                    <Badge
                      className={`${
                        item.status === "PENDING" ||
                        item.status === "FOR_INTERVIEW"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EligiblePets;
