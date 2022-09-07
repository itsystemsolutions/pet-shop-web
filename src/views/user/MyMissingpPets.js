import { useEffect, useState } from "react";

// react-bootstrap components
import { Card, Table, Container, Button, Badge } from "react-bootstrap";

import Swal from "sweetalert2";
const axios = require("axios").default;

function MyMissingPets() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/pets/missing?userId=" + localStorage.getItem("user_id"))
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleFound = (e, petCode, decision) => {
    e.preventDefault();

    axios.put("/pets/approve/" + petCode + "?decision=" + decision).then(() => {
      Swal.fire({
        icon: "success",
        title: `SUCCESS! `,
        text: `Record updated!`,
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
          <Card.Title as="h4">My Missing Pets</Card.Title>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Image</th>
                <th className="border-0">Pet Code</th>
                <th className="border-0">Gender</th>
                <th className="border-0">Breed</th>
                <th className="border-0">Description</th>
                <th className="border-0">Last Seen</th>
                <th className="border-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>
                      <img
                        src={`http://localhost:8081/PETSHOP/images/pets/${entry.petCode}.jpg`}
                        alt=""
                        height={110}
                        className="mb-3"
                      />
                    </td>
                    <td>{entry.petCode}</td>
                    <td>{entry.gender}</td>
                    <td>{entry.breed}</td>
                    <td>{entry.description}</td>
                    <td>{entry.lastSeen}</td>
                    <td>{entry.approvalStatus}</td>
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

export default MyMissingPets;
