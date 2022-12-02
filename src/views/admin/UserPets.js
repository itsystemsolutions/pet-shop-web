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
  ModalFooter,
} from "reactstrap";

const axios = require("axios").default;

function UserPets() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const [userName, setUsername] = useState("");
  const [answers, setAnswers] = useState();
  const [modalOwnership, setModalOwnership] = useState(false);
  const [totalScore, setTotalScore] = useState("");

  const [selectedPetCode, setSelectedCode] = useState(false);
  const [user, setUser] = useState(false);

  const toggle = () => setModal(!modal);
  const showAnswers = (e, entry) => {
    e.preventDefault();

    setUsername(entry.name);
    setAnswers(entry.formAnswer);
    setSelectedCode(entry.petCode);

    let score = 0;
    if (entry.formAnswer.answer1 === "MYSELF") {
      score = score + 5;
    }
    if (entry.formAnswer.answer2 === "NO") {
      score = score + 5;
    }
    if (entry.formAnswer.answer3 === "YES") {
      score = score + 5;
    }
    if (entry.formAnswer.answer4 === "PARENTS") {
      score = score + 5;
    }
    if (entry.formAnswer.answer5 === "NO") {
      score = score + 5;
    }
    if (entry.formAnswer.answer6 === "YES") {
      score = score + 5;
    }
    if (entry.formAnswer.answer7 === "MYSELF") {
      score = score + 5;
    }
    if (entry.formAnswer.answer8 === "FAMILY") {
      score = score + 5;
    }
    if (
      entry.formAnswer.answer9 === "8HRS" ||
      entry.formAnswer.answer9 === "9HRS"
    ) {
      score = score + 5;
    }
    if (entry.formAnswer.answer10 === "YES") {
      score = score + 5;
    }
    if (
      entry.formAnswer.answer11 === "PROPER_TRAINING" ||
      entry.formAnswer.answer11 === "HOUSE_TOUR"
    ) {
      score = score + 5;
    }
    if (entry.formAnswer.answer12 === "HOUSE") {
      score = score + 5;
    }
    if (
      entry.formAnswer.answer13 === "YES" ||
      entry.formAnswer.answer13 === "NO"
    ) {
      score = score + 5;
    }
    if (
      entry.formAnswer.answer14 === "YES" ||
      entry.formAnswer.answer14 === "NO"
    ) {
      score = score + 5;
    }
    if (entry.formAnswer.answer15 === "YES") {
      score = score + 5;
    }
    if (entry.formAnswer.answer16 === "NOT_A_BIG_DEAL") {
      score = score + 5;
    }
    if (entry.formAnswer.answer17 === "YES") {
      score = score + 5;
    }
    if (entry.formAnswer.answer18 === "YES") {
      score = score + 5;
    }
    if (entry.formAnswer.answer19 === "YES") {
      score = score + 5;
    }
    if (
      entry.formAnswer.answer20 === "HIRE_PROFESSIONAL" ||
      entry.formAnswer.answer20 === "WATCH_YOUTUBE"
    ) {
      score = score + 5;
    }
    setTotalScore(score);

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
                    <img
                      src={`${process.env.REACT_APP_API_URL}/images/pets/${item.petCode}.jpg`}
                      alt=""
                      height={110}
                      className="mb-3"
                    />
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
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Equivalent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td className="w-50">
                    Who will be responsible for feeding, grooming and generally
                    taking care for your pet?
                  </td>
                  <td>
                    {answers.answer1} <div>Other. {answers.q1OtherAnswer}</div>
                  </td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td className="w-50">
                    Are there children below 18 yrs old in the house?
                  </td>
                  <td>{answers.answer2} </td>
                  <td>
                    <b>{answers.answer2 === "NO" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="w-50">Do you have other pets?</td>
                  <td>
                    {answers.answer3}
                    <div>Other. {answers.q3OtherAnswer}</div>
                  </td>
                  <td>
                    <b>{answers.answer3 === "YES" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td className="w-50">Who else do you live with?</td>
                  <td>
                    {answers.answer4}
                    <div>Other. {answers.q4OtherAnswer}</div>
                  </td>
                  <td>
                    <b>{answers.answer4 === "PARENTS" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td className="w-50">
                    Are there any members of your household allergic to animals?
                  </td>
                  <td>
                    {answers.answer5}
                    <div>Other. {answers.q5OtherAnswer}</div>
                  </td>
                  <td>
                    <b>{answers.answer5 === "NO" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td className="w-50">Have you had pets in the past?</td>
                  <td>{answers.answer6}</td>
                  <td>
                    <b>{answers.answer6 === "YES" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td className="w-50">
                    Who will be financially responsible for your pet’s needs
                    (i,e.. food, vet bills, etc.)?
                  </td>
                  <td>{answers.answer7}</td>
                  <td>
                    <b>{answers.answer7 === "MYSELF" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td className="w-50">
                    Who will be looking after your pet if you go on vacation or
                    in case of emergency?
                  </td>
                  <td>{answers.answer8}</td>
                  <td>
                    <b>{answers.answer8 === "FAMILY" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td className="w-50">
                    How many hours in an average workday will your pet be left
                    alone?
                  </td>
                  <td>
                    {answers.answer9}
                    <div>Other. {answers.q9OtherAnswer}</div>
                  </td>
                  <td>
                    <b>
                      {(answers.answer9 === "8HRS" ||
                        answers.answer9 === "9HRS") &&
                        "5%"}
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">10</th>
                  <td className="w-50">
                    Does everyone in the family support your decision to adopt a
                    pet?
                  </td>
                  <td>{answers.answer10}</td>
                  <td>
                    <b>{answers.answer10 === "YES" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">11</th>
                  <td className="w-50">
                    What steps will you take to familiarize your pet with
                    his/her new surroundings?
                  </td>
                  <td>{answers.answer11}</td>
                  <td>
                    <b>
                      {(answers.answer11 === "PROPER_TRAINING" ||
                        answers.answer11 === "HOUSE_TOUR") &&
                        "5%"}
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">12</th>
                  <td className="w-50">
                    What type of building do you live in?
                  </td>
                  <td>{answers.answer12}</td>
                  <td>
                    <b>{answers.answer12 === "HOUSE" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">13</th>
                  <td className="w-50">Do you rent?</td>
                  <td>{answers.answer13}</td>
                  <td>
                    <b>
                      {(answers.answer13 === "YES" ||
                        answers.answer13 === "NO") &&
                        "5%"}
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">14</th>
                  <td className="w-50">
                    If renting or living in a shared building, can you provide a
                    copy of your building’s pet policy?
                  </td>
                  <td>
                    {answers.answer14}
                    <div>
                      If yes provided:{" "}
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/pet-policy/${selectedPetCode}.jpg`}
                        alt=""
                        height={110}
                        className="mb-3"
                      />
                    </div>
                  </td>
                  <td>
                    <b>
                      {(answers.answer14 === "YES" ||
                        answers.answer14 === "NO") &&
                        "5%"}
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">15</th>
                  <td className="w-50">
                    What happens to your pet if or when you move, will you take
                    your pet?
                  </td>
                  <td>{answers.answer15}</td>
                  <td>
                    <b>{answers.answer15 === "YES" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">16</th>
                  <td className="w-50">What kind of pet us right for you?</td>
                  <td>{answers.answer16}</td>
                  <td>
                    <b>{answers.answer16 === "NOT_A_BIG_DEAL" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">17</th>
                  <td className="w-50">
                    Are you ready for long term commitment with your new pet?
                  </td>
                  <td>{answers.answer17}</td>
                  <td>
                    <b>{answers.answer17 === "YES" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">18</th>
                  <td className="w-50">
                    Can you afford to care for your pets healthy and safety?
                  </td>
                  <td>{answers.answer18}</td>
                  <td>
                    <b>{answers.answer18 === "YES" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">19</th>
                  <td className="w-50">Do you have time for pet?</td>
                  <td>{answers.answer19}</td>
                  <td>
                    <b>{answers.answer19 === "YES" && "5%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">20</th>
                  <td className="w-50">
                    Are you willing to train your pet? How?
                  </td>
                  <td>
                    {answers.answer20}
                    <div>Other. {answers.q20OtherAnswer}</div>
                  </td>
                  <td>
                    <b>
                      {(answers.answer20 === "HIRE_PROFESSIONAL" ||
                        answers.answer20 === "WATCH_YOUTUBE") &&
                        "5%"}
                    </b>
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <div className="text-right w-100">
            Total Score:{" "}
            <b>
              {totalScore} ({totalScore >= 75 ? "PASSED" : "FAILED"})
            </b>
          </div>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default UserPets;
