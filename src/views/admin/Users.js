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
  const history = useHistory();

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
      .then(response => {
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
        }).then(result => {
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
                <th className="border-0">Username</th>
                <th className="border-0">Password</th>
                <th className="border-0">View Adopts</th>
                <th className="border-0">Is Account Eligible</th>
              </tr>
            </thead>
            <tbody>
              {data.map(entry => {
                return (
                  <tr>
                    <td>{entry.name}</td>
                    <td>{entry.age}</td>
                    <td>{entry.address}</td>
                    <td>{entry.mobile}</td>
                    <td>{entry.email}</td>
                    <td>{entry.occupation}</td>
                    <td>{entry.social}</td>
                    <td>{entry.username}</td>
                    <td>{entry.password}</td>
                    <td>
                      <span
                        className="pointer text-info"
                        onClick={e =>
                          history.push("/admin/user/pets/" + entry.id)
                        }
                      >
                        View
                      </span>
                    </td>
                    <td>
                      {entry.qualificationAnswers !== null && (
                        <a href="#" onClick={e => showAnswers(e, entry)}>
                          Show Answers
                        </a>
                      )}
                    </td>
                    <td>
                      {entry.userValid === null ? (
                        <>
                          <Button
                            className="btn btn-success mr-2"
                            onClick={e =>
                              handleAccountEligibility(e, entry.id, "APPROVE")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={e =>
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
            <Row md={12}>
              <Col md={6}>Question</Col>
              <Col md={6}>Answer</Col>

              <Col md={6} className="mt-2">
                1. Age -
              </Col>
              <Col md={6} className="mt-2">
                {answers.quiz1}
              </Col>

              <Col md={12} className="mt-2">
                Question 2.
              </Col>
              <Col md={6}>CURRENT OCCUPATION – </Col>
              <Col md={6}>{answers.quiz2}</Col>

              <Col md={12} className="mt-2">
                Question 3.
              </Col>
              <Col md={6}>VALID ID –</Col>
              <Col md={6}>See below</Col>

              <Col md={12} className="mt-2">
                Question 4.
              </Col>
              <Col md={6}>
                Expectations of the prospective adopter and the reasons for
                wanting a dog?
              </Col>
              <Col md={6}>{answers.quiz4}</Col>

              <Col md={12} className="mt-2">
                Question 5.
              </Col>
              <Col md={6}>
                Long-term costs and commitment associated with dog ownership,
                including ongoing vaccination, deworming, regular veterinary
                health checks and other treatments.
              </Col>
              <Col md={6}>{answers.quiz5}</Col>

              <Col md={12} className="mt-2">
                Question 6.
              </Col>
              <Col md={6}>
                Give the information and advice specific to your home and new
                pet.
              </Col>
              <Col md={6}>{answers.quiz6}</Col>

              <Col md={12} className="mt-2">
                Question 7.
              </Col>
              <Col md={6}>Is your home situation stable?</Col>
              <Col md={6}>{answers.quiz7}</Col>

              <Col md={12} className="mt-2">
                Question 8.
              </Col>
              <Col md={6}>Have you ever had a dog or cat before?</Col>
              <Col md={6}>{answers.quiz8}</Col>

              <Col md={12} className="mt-2">
                Question 9.
              </Col>
              <Col md={6}>
                Explain any known medical conditions or behavioral special needs
                of your new pet.
              </Col>
              <Col md={6}>{answers.quiz9}</Col>

              <Col md={12} className="mt-2">
                Question 10.
              </Col>
              <Col md={6}>
                Why do they think this is the right time in their lives to adopt
                a dog/cat?
              </Col>
              <Col md={6}>{answers.quiz10}</Col>

              <Col md={12} className="mt-2">
                Question 11.
              </Col>
              <Col md={6}>Do we have permission to visit your home?</Col>
              <Col md={6}>{answers.quiz11}</Col>

              <Col md={12} className="mt-2">
                Question 12.
              </Col>
              <Col md={6}>Please describe your household.</Col>
              <Col md={6}>{answers.quiz12}</Col>

              <Col md={12} className="mt-2">
                Question `3`.
              </Col>
              <Col md={6}>Have you ever had a pet euthanized?</Col>
              <Col md={6}>{answers.quiz13}</Col>

              <Col md={12} className="mt-2">
                Question 14.
              </Col>
              <Col md={6}>Have you ever lost a pet?</Col>
              <Col md={6}>{answers.quiz14}</Col>

              <Col md={12} className="mt-2">
                Question 15.
              </Col>
              <Col md={6}>
                Please state a reason for wanting to adopt a pet?
              </Col>
              <Col md={6}>{answers.quiz15}</Col>
              <Col md={12} className="mt-2">
                <h3>Valid Id</h3>
                <img
                  src={`${process.env.REACT_APP_API_URL}/images/valid-id/${userName}.jpg`}
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
