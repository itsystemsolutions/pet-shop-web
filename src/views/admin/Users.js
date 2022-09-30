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
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Button,
  Badge,
} from "reactstrap";

import Swal from "sweetalert2";

const axios = require("axios").default;

function Users() {
  const [userName, setUsername] = useState("");
  const [answers, setAnswers] = useState();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const showAnswers = (e, entry) => {
    e.preventDefault();

    setUsername(entry.username);
    setAnswers(entry.qualificationAnswers);

    toggle();
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user?type=USER")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleAccountEligibility = (e, id, decision) => {
    e.preventDefault();

    axios
      .put(
        process.env.REACT_APP_API_URL +
          "/user/valid/" +
          id +
          "?decision=" +
          decision
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
        <CardHeader>
          <CardTitle as="h4">Users Masterlist</CardTitle>
        </CardHeader>
        <CardBody className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Name</th>
                <th className="border-0">Age</th>
                <th className="border-0">Address</th>
                <th className="border-0">Mobile</th>
                <th className="border-0">Email</th>
                <th className="border-0">Occupation</th>
                <th className="border-0">Social</th>
                <th className="border-0">Is Account Eligible</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>{entry.name}</td>
                    <td>{entry.age}</td>
                    <td>{entry.address}</td>
                    <td>{entry.mobile}</td>
                    <td>{entry.email}</td>
                    <td>{entry.occupation}</td>
                    <td>{entry.social}</td>
                    <td>
                      {entry.qualificationAnswers !== null && (
                        <a href="#" onClick={(e) => showAnswers(e, entry)}>
                          Show Answers
                        </a>
                      )}
                    </td>
                    <td>
                      {entry.userValid === null ? (
                        <>
                          <Button
                            className="btn btn-success mr-2"
                            onClick={(e) =>
                              handleAccountEligibility(e, entry.id, "APPROVE")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={(e) =>
                              handleAccountEligibility(e, entry.id, "DENIED")
                            }
                          >
                            Deny
                          </Button>
                        </>
                      ) : (
                        <>
                          {entry.userValid ? (
                            <Badge className="bg-success text-white">
                              APPROVED
                            </Badge>
                          ) : (
                            <Badge className="bg-danger text-white">
                              DENIED
                            </Badge>
                          )}
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
              <Col md={12}>1. Age - {answers.quiz1}</Col>
              <Col md={12}>2. CURRENT OCCUPATION – {answers.quiz2}</Col>
              <Col md={12}>3. VALID ID – See below</Col>
              <Col md={12}>4. {answers.quiz4}</Col>
              <Col md={12}>5. {answers.quiz5}</Col>
              <Col md={12}>6. {answers.quiz6}</Col>
              <Col md={12}>7. {answers.quiz7}</Col>
              <Col md={12}>8. {answers.quiz8}</Col>
              <Col md={12}>9. {answers.quiz9}</Col>
              <Col md={12}>10. {answers.quiz10}</Col>
              <Col md={12}>11. {answers.quiz11}</Col>
              <Col md={12}>12. {answers.quiz12}</Col>
              <Col md={12}>13. {answers.quiz13}</Col>
              <Col md={12}>14. {answers.quiz14}</Col>
              <Col md={12}>15. {answers.quiz15}</Col>
              <Col md={12}>
                <h3>Valid Id</h3>
                <img
                  src={`http://16.163.143.49:8081/PETSHOP/images/valid-id/${userName}.jpg`}
                  alt="example"
                  height={150}
                />
              </Col>
            </Row>
          ) : null}
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default Users;
