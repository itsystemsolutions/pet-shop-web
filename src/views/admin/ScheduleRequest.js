import { useEffect, useState } from "react";

// react-bootstrap components
import { Card, Table, Container, Button } from "react-bootstrap";

const axios = require("axios").default;

function Approvers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/user?type=APPROVER").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">Adopties List</Card.Title>
          <p className="card-category">List of users who want to adopt a pet</p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">ID</th>
                <th className="border-0">Name</th>
                <th className="border-0">Mobile Number</th>
                <th className="border-0">Username</th>
                <th className="border-0">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>{entry.id}</td>
                    <td>{entry.name}</td>
                    <td>{entry.mobile}</td>
                    <td>{entry.username}</td>
                    <td>{entry.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
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
              <Col md={6}>Other. {answers.q3OtherAnswer}</Col>

              <Col md={6}>4. {answers.answer4}</Col>
              <Col md={6}>Other. {answers.q4OtherAnswer}</Col>

              <Col md={6}>5. {answers.answer5}</Col>
              <Col md={6}>Other. {answers.q5OtherAnswer}</Col>

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
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default Approvers;
