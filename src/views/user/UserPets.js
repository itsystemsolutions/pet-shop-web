import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Progress,
  Row,
  Col,
} from "reactstrap";

const axios = require("axios").default;

function UserPets() {
  const id = localStorage.getItem("user_id");

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const [userName, setUsername] = useState("");
  const [answers, setAnswers] = useState();

  const [selectedPetCode, setSelectedCode] = useState(false);
  const [user, setUser] = useState(false);

  const toggle = () => setModal(!modal);
  const showAnswers = (e, entry) => {
    e.preventDefault();

    setUsername(entry.name);
    setAnswers(entry.formAnswer);
    setSelectedCode(entry.petCode);

    toggle();
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/info?id=" + id)
      .then((response) => {
        setUser(response.data);
      });

    axios
      .get(process.env.REACT_APP_API_URL + "/adopt-form/" + id)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const petStatus = (status) => {
    if (status === "PENDING") {
      return "warning";
    } else if (status == "APPROVED") {
      return "success";
    } else if (status == "DENIED") {
      return "danger";
    } else if (status == "FOR_INTERVIEW") {
      return "info";
    } else if (status == "FOR_PICKUP") {
      return "primary";
    }
  };

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <CardHeader>
          <CardTitle as="h4">
            <h2>{user.name}'s Pets</h2>
          </CardTitle>
        </CardHeader>
        <CardBody className="table-full-width table-responsive px-0">
          <Row>
            <Col className="mx-3">
              <div className="text-center">Adopt Status</div>
              <Progress multi>
                <Progress bar color="warning" value="33.33">
                  Pending
                </Progress>
                <Progress bar color="success" value="33.33">
                  Approved
                </Progress>
                <Progress bar color="info" value="33.33">
                  Interview
                </Progress>
                <Progress bar color="primary" value="33.33">
                  Pick Up
                </Progress>
                <Progress bar color="danger" value="33.33">
                  Denied
                </Progress>
              </Progress>
            </Col>
          </Row>

          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">ID</th>
                <th className="border-0">Pet</th>
                <th className="border-0">Date And Time</th>
                <th className="border-0">Type</th>
                <th className="border-0">Answers</th>
                <th className="border-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>
                    <a
                      href={`${process.env.REACT_APP_URL}/user/pet/info/${item.petCode}`}
                      target="_blank"
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/pets/${item.petCode}.jpg`}
                        alt=""
                        height={110}
                        className="mb-3"
                      />
                    </a>

                    <div>Name: {item.petName}</div>
                    <div>
                      Code:{" "}
                      <a
                        href={`${process.env.REACT_APP_URL}/user/pet/info/${item.petCode}`}
                        target="_blank"
                      >
                        {item.petCode}
                      </a>
                    </div>
                  </td>
                  <td>{item.timestamp}</td>
                  <td>{item.type}</td>
                  <td>
                    <a href="#" onClick={(e) => showAnswers(e, item)}>
                      Show Answers
                    </a>
                  </td>
                  <td className="text-white">
                    <div className="mt-2">
                      <Row className="justify-content-start mt-4">
                        <Col md={3}>
                          <Card
                            className={`rounded-circle bg-${petStatus(
                              item.status
                            )}`}
                            style={{ height: "5rem", width: "5rem" }}
                          >
                            <CardBody></CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Upload Proof of Ownership to {selectedPetCode}
        </ModalHeader>
      </Modal>
      <Modal
        className="pb-5"
        isOpen={modal}
        toggle={toggle}
        scrollable={true}
        size="lg"
        style={{ transform: "translate(0, 0%)" }}
      >
        <ModalHeader toggle={toggle}>
          Qualification Answers of {userName}
        </ModalHeader>
        <ModalBody>
          {answers ? (
            <Row>
              <Col md={6}>1. {answers.answer1}</Col>
              <Col md={6}>Other. {answers.q1OtherAnswer}</Col>

              <Col md={12}>2. {answers.answer2}</Col>
              <Col md={6}>3. {answers.answer3}</Col>
              <Col md={6}>if yes, how: {answers.q3OtherAnswer}</Col>

              <Col md={6}>4. {answers.answer4}</Col>
              <Col md={6}>Other. {answers.q4OtherAnswer}</Col>

              <Col md={6}>5. {answers.answer5}</Col>
              <Col md={6}>if yes, how: {answers.q5OtherAnswer}</Col>

              <Col md={12}>6. {answers.answer6}</Col>
              <Col md={12}>7. {answers.answer7}</Col>
              <Col md={12}>8. {answers.answer8}</Col>

              <Col md={6}>9. {answers.answer9}</Col>
              <Col md={6}>Other. {answers.q9OtherAnswer}</Col>

              <Col md={12}>10. {answers.answer10}</Col>
              <Col md={6}>11. {answers.answer11}</Col>
              <Col md={6}>Other. {answers.q11OtherAnswer}</Col>

              <Col md={12}>12. {answers.answer12}</Col>
              <Col md={12}>13. {answers.answer13}</Col>
              <Col md={12}>14. {answers.answer14}</Col>
              <Col md={12}>
                If yes provided:{" "}
                <img
                  src={`${process.env.REACT_APP_API_URL}/images/pet-policy/${selectedPetCode}.jpg`}
                  alt=""
                  height={110}
                  className="mb-3"
                />
              </Col>
              <Col md={12}>15. {answers.answer15}</Col>
              <Col md={12}>16. {answers.answer16}</Col>
              <Col md={12}>17. {answers.answer17}</Col>
              <Col md={12}>18. {answers.answer18}</Col>
              <Col md={12}>19. {answers.answer19}</Col>
              <Col md={6}>20. {answers.answer20}</Col>
              <Col md={6}>Other. {answers.q20OtherAnswer}</Col>
            </Row>
          ) : null}
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default UserPets;
