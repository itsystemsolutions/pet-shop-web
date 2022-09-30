import { useEffect, useState } from "react";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Button,
  Badge,
  Row,
  Col,
  CardFooter,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";

import Swal from "sweetalert2";
const axios = require("axios").default;

function MissingPets() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/pets/missing")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleApprove = (e, petCode, decision) => {
    e.preventDefault();

    axios
      .put(
        process.env.REACT_APP_API_URL +
          "/pets/approve/" +
          petCode +
          "?decision=" +
          decision
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `SUCCESS! `,
          text: `Record approved!`,
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
        <CardHeader>
          <CardTitle as="h4">Missing Pets for Approval</CardTitle>
        </CardHeader>
        <CardBody className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Image</th>
                <th className="border-0">User</th>
                <th className="border-0">Pet Code</th>
                <th className="border-0">Gender</th>
                <th className="border-0">Breed</th>
                <th className="border-0">Description</th>
                <th className="border-0">Last Seen</th>
                <th className="border-0">Approve ?</th>
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
                    </td>
                    <td>
                      <p>Name: {entry.user.name}</p>
                      <p>Email: {entry.user.email}</p>
                      <p>Mobile: {entry.user.mobile}</p>
                    </td>
                    <td>{entry.petCode}</td>
                    <td>{entry.gender}</td>
                    <td>{entry.breed}</td>
                    <td>{entry.description}</td>
                    <td>{entry.lastSeen}</td>
                    <td>
                      {entry.approvalStatus !== "PENDING" ? (
                        <Badge>{entry.approvalStatus}</Badge>
                      ) : (
                        <>
                          <Button
                            className="btn btn-success mr-2"
                            onClick={(e) =>
                              handleApprove(e, entry.petCode, "APPROVED")
                            }
                          >
                            APPROVE
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={(e) =>
                              handleApprove(e, entry.petCode, "DECLINE")
                            }
                          >
                            DECLINE
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
}

export default MissingPets;
