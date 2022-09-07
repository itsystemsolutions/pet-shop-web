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
  ModalFooter,
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
    axios.get("/adopt-form/for-interview").then((response) => {
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
                {data.map((entry) => {
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
                          <a href="#" onClick={(e) => showAnswers(e, entry)}>
                            Show Answers
                          </a>
                        )}
                      </td>
                      <td>
                        {entry.type}
                        <a
                          href="#"
                          className="ml-3"
                          onClick={(e) => showProofOwnership(e, entry)}
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
                  src={`http://localhost:8081/PETSHOP/images/pet-policy/${selectedCode}.jpg`}
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
            src={`http://localhost:8081/PETSHOP/images/proof-ownership/${selectedCode}.jpg`}
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
