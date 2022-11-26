import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Button,
  Badge,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Modal,
  ModalBody,
  Input,
  FormGroup,
} from "reactstrap";

import Swal from "sweetalert2";
const axios = require("axios").default;

function MissingPets() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/pets/missing")
      .then(response => {
        setData(response.data);
      });
  }, []);

  const handleApprove = (e, entry, decision) => {
    e.preventDefault();

    if (decision !== "DECLINE") {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            "/pets/approve/" +
            entry.petCode +
            "?decision=" +
            decision
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: `SUCCESS! `,
            text: `Record approved! We'll redirect you to schedule interview`,
            allowOutsideClick: false,
          }).then(result => {
            if (result.isConfirmed) {
              history.push(`/admin/zoom/${entry.user.id}/${entry.petCode}`);
            }
          });
        });
    } else {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            "/pets/approve/" +
            entry.petCode +
            "?decision=" +
            decision
        )
        .then(() => {
          Swal.fire({
            icon: "error",
            title: `Record decline!`,
            allowOutsideClick: false,
          }).then(result => {
            window.location.reload();
          });
        });
    }
  };

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <CardHeader>
          <Row>
            <Col>
              <CardTitle as="h4">Missing Pets for Approval</CardTitle>
            </Col>
            <Col md={2}>
              <Input style={{ cursor: "pointer" }} required type="radio" />
              MISSING
            </Col>

            <Col md={2}>
              <Input style={{ cursor: "pointer" }} required type="radio" />
              FOUND
            </Col>
          </Row>
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
                <th className="border-0">Report</th>
                <th className="border-0">Approve ?</th>
              </tr>
            </thead>
            <tbody>
              {data.map(entry => {
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
                    <td>{entry.report}</td>
                    <td>
                      {entry.approvalStatus !== "PENDING" ? (
                        <Badge
                          color={`${
                            entry.approvalStatus === "APPROVED"
                              ? "success"
                              : "danger"
                          }`}
                        >
                          {entry.approvalStatus}
                        </Badge>
                      ) : (
                        <>
                          <Button
                            className="btn btn-success mr-2"
                            onClick={e => handleApprove(e, entry, "APPROVED")}
                          >
                            APPROVE
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={e => handleApprove(e, entry, "DECLINE")}
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
      <Modal
        className="pb-5"
        isOpen={modal}
        // toggle={toggle}
        scrollable={true}
        size="lg"
        style={{ transform: "translate(0, 0%)" }}
      >
        {/* <ModalHeader toggle={toggle}>
          Qualification Answers of {userName}
        </ModalHeader> */}
        <ModalBody>
          <Row>
            <Col>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              >
                Is the report accurate?
              </Input>
            </Col>
            <Col>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              >
                the shelter has confirmed the information provided.
              </Input>
            </Col>
            <Col>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              >
                Did the shelter/administrator contact the mentioned reporter for
                confirmation?
              </Input>
            </Col>
            <Col>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              >
                Did the rescuer verify the reported claim from the shelter?
              </Input>
            </Col>
            <Col>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              >
                Is it possible for the volunteer to save the aforementioned
                report?
              </Input>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      <Modal
        className="pb-5"
        isOpen={modal}
        // toggle={toggle}
        scrollable={true}
        size="lg"
        style={{ transform: "translate(0, 0%)" }}
      >
        {/* <ModalHeader toggle={toggle}>
          Qualification Answers of {userName}
        </ModalHeader> */}
        <ModalBody>
          <Row>
            <Col>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              >
                This is a false report.
              </Input>
            </Col>
            <Col>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              >
                This report is already reported
              </Input>
            </Col>
            <Col>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              >
                The shelter has already rescued this report
              </Input>
            </Col>
            <Col>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              >
                The user does not confirm or coordinate with the shelter.
              </Input>
            </Col>
            <Col>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              >
                The report does not cover the city or the surrounding area
              </Input>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default MissingPets;
