import { useEffect, useState } from "react";
import { useHistory } from "react-router";

// react-bootstrap components
import {
  CardHeader,
  CardBody,
  CardTitle,
  Card,
  Table,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from "reactstrap";

const axios = require("axios").default;

function Adopties() {
  const history = useHistory();

  const [userName, setUsername] = useState("");
  const [answers, setAnswers] = useState();
  const [modal, setModal] = useState(false);
  const [modalOwnership, setModalOwnership] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");

  const toggle = () => setModal(!modal);
  const toggleOwnership = () => setModalOwnership(!modalOwnership);

  const showAnswers = (e, entry) => {
    e.preventDefault();

    setUsername(entry.name);
    setAnswers(entry.formAnswer);
    setSelectedCode(entry.petCode);

    toggle();
  };

  const showProofOwnership = (e, entry) => {
    e.preventDefault();

    setUsername(entry.name);
    setSelectedCode(entry.petCode);
    toggleOwnership();
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/adopt-form/for-interview")
      .then(response => {
        setData(response.data);
      });
  }, []);

  return (
    <>
      <Container fluid>
        <Card className="strpied-tabled-with-hover">
          <CardHeader>
            <CardTitle as="h4">Request Interview</CardTitle>
            <p className="card-category">
              List of users who want to adopt a pet and requeted interview
            </p>
          </CardHeader>
          <CardBody className="table-full-width table-responsive px-0">
            <Table className="table-hover table-striped">
              <thead>
                <tr>
                  <th className="border-0">Name</th>
                  <th className="border-0">Pet Code</th>
                  <th className="border-0">Result / Score</th>
                  <th className="border-0">Exam Enswers</th>
                  <th className="border-0">Type</th>
                  <th className="border-0">Status</th>
                  <th className="border-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(entry => {
                  return (
                    <tr>
                      <td>{entry.name}</td>
                      <td>{entry.petCode}</td>
                      <td>
                        {entry.type !== "MISSING" ? (
                          <>
                            {entry.formResult} - {entry.formScore}
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td>
                        {entry.type !== "MISSING" && (
                          <a href="#" onClick={e => showAnswers(e, entry)}>
                            Show Answers
                          </a>
                        )}
                      </td>
                      <td>
                        {entry.type}
                        <a
                          href="#"
                          className="ml-3"
                          onClick={e => showProofOwnership(e, entry)}
                        >
                          View Ownership
                        </a>
                      </td>
                      <td>
                        {entry.status === "FOR_INTERVIEW"
                          ? "Ready For Interview"
                          : ""}
                      </td>
                      <td>
                        <Button
                          color="info"
                          onClick={() =>
                            history.push(
                              `/admin/zoom/${entry.userId}/${entry.petCode}`
                            )
                          }
                        >
                          Schedule Interview
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
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
            <Row md={12}>
              <Col md={4}>Questions</Col>
              <Col md={4}>Answer</Col>
              <Col md={4}>EQUIVALENT</Col>

              <Col md={4} className="mt-2">
                1. Who will be responsible for feeding, grooming and generally
                taking care for your pet?
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer1}
                <Row>Other. {answers.q1OtherAnswer}</Row>
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                2. Are there children below 18 yrs old in the house?
              </Col>
              <Col md={4} className="mt-2">
                {" "}
                {answers.answer2}
              </Col>
              <Col md={4} className="mt-2">
                {" "}
              </Col>

              <Col md={4} className="mt-2">
                3. Do you have other pets?
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer3}
                <Row>if yes, how: {answers.q3OtherAnswer}</Row>
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                4. Who else do you live with?{" "}
              </Col>
              <Col md={4} className="mt-2">
                {" "}
                {answers.answer4}
                <Row>Other. {answers.q4OtherAnswer}</Row>
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                5. Are there any members of your household allergic to animals?
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer5}
                <Row>if yes, how: {answers.q5OtherAnswer}</Row>
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                6. Have you had pets in the past?{" "}
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer6}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                7. Who will be financially responsible for your pet’s needs
                (i,e.. food, vet bills, etc.)?
              </Col>
              <Col md={4} className="mt-2">
                {" "}
                {answers.answer7}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                8. Who will be looking after your pet if you go on vacation or
                in case of emergency?
              </Col>
              <Col md={4} className="mt-2">
                {" "}
                {answers.answer8}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                9. How many hours in an average workday will your pet be left
                alone?
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer9}
                <Row>Other. {answers.q9OtherAnswer}</Row>
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                10. Does everyone in the family support your decision to adopt a
                pet?{" "}
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer10}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                11. What steps will you take to familiarize your pet with
                his/her new surroundings?
              </Col>
              <Col md={4} className="mt-2">
                {" "}
                {answers.answer11} <Row>Other. {answers.q11OtherAnswer}</Row>
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                12. What type of building do you live in?{" "}
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer12}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                13. Do you rent?
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer13}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                14. If renting or living in a shared building, can you provide a
                copy of your building’s pet policy?
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer14}{" "}
                <Row>
                  If yes provided:{" "}
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/pet-policy/${selectedCode}.jpg`}
                    alt=""
                    height={110}
                    className="mb-3"
                  />
                </Row>
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                15. What happens to your pet if or when you move, will you take
                your pet?
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer15}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                16. What kind of pet us right for you?{" "}
              </Col>
              <Col md={4} className="mt-2">
                {" "}
                {answers.answer16}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                17. Are you ready for long term commitment with your new pet?{" "}
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer17}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                18. Can you afford to care for your pets healthy and safety?{" "}
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer18}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                19. Do you have time for pet?
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer19}
              </Col>
              <Col md={4} className="mt-2"></Col>

              <Col md={4} className="mt-2">
                20. Are you willing to train your pet? How?
              </Col>
              <Col md={4} className="mt-2">
                {answers.answer20} <Row>Other. {answers.q20OtherAnswer}</Row>
              </Col>
              <Col md={4} className="mt-2"></Col>
            </Row>
          ) : null}
        </ModalBody>
      </Modal>
      <Modal
        className="pb-5"
        isOpen={modalOwnership}
        toggle={toggleOwnership}
        size="lg"
        style={{ transform: "translate(0, 0%)" }}
      >
        <ModalHeader toggle={toggleOwnership}>
          Proof ownership of {userName}
        </ModalHeader>
        <ModalBody>
          <img
            src={`${process.env.REACT_APP_API_URL}/images/proof-ownership/${selectedCode}.jpg`}
            alt=""
            height={300}
            className="mb-3"
          />
        </ModalBody>
      </Modal>
    </>
  );
}

export default Adopties;
