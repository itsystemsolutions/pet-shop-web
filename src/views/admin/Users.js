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
  ModalFooter,
  Row,
  Col,
  Button,
  Badge,
  Input,
} from "reactstrap";

import Swal from "sweetalert2";

const axios = require("axios").default;

function Users() {
  const history = useHistory();

  const [userName, setUsername] = useState("");
  const [answers, setAnswers] = useState();
  const [modal, setModal] = useState(false);

  const [quiz1, setQuiz1] = useState();
  const [quiz2, setQuiz2] = useState();
  const [quiz3, setQuiz3] = useState();
  const [quiz4, setQuiz4] = useState();
  const [quiz5, setQuiz5] = useState();
  const [quiz6, setQuiz6] = useState();
  const [quiz7, setQuiz7] = useState();
  const [quiz8, setQuiz8] = useState();
  const [quiz9, setQuiz9] = useState();
  const [quiz10, setQuiz10] = useState();
  const [quiz11, setQuiz11] = useState();
  const [quiz12, setQuiz12] = useState();
  const [quiz13, setQuiz13] = useState();
  const [quiz14, setQuiz14] = useState();
  const [quiz15, setQuiz15] = useState();

  const [modalTitle, setModalTitle] = useState();
  const [enableCheckbox, setIsShowCheckBox] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const toggle = () => setModal(!modal);

  const showAnswers = (e, entry, title) => {
    e.preventDefault();

    setModalTitle(title);
    setUsername(entry.username);
    setAnswers(entry.qualificationAnswers);
    setSelectedId(entry.id);

    setQuiz1({
      answer: entry.qualificationAnswers.quiz1.answer,
      valid: entry.qualificationAnswers.quiz1.valid,
    });
    setQuiz2({
      answer: entry.qualificationAnswers.quiz2.answer,
      valid: entry.qualificationAnswers.quiz2.valid,
    });
    setQuiz3({
      answer: entry.qualificationAnswers.quiz3.answer,
      valid: entry.qualificationAnswers.quiz3.valid,
    });
    setQuiz4({
      answer: entry.qualificationAnswers.quiz4.answer,
      valid: entry.qualificationAnswers.quiz4.valid,
    });
    setQuiz5({
      answer: entry.qualificationAnswers.quiz5.answer,
      valid: entry.qualificationAnswers.quiz5.valid,
    });
    setQuiz6({
      answer: entry.qualificationAnswers.quiz6.answer,
      valid: entry.qualificationAnswers.quiz6.valid,
    });
    setQuiz7({
      answer: entry.qualificationAnswers.quiz7.answer,
      valid: entry.qualificationAnswers.quiz7.valid,
    });
    setQuiz8({
      answer: entry.qualificationAnswers.quiz8.answer,
      valid: entry.qualificationAnswers.quiz8.valid,
    });
    setQuiz9({
      answer: entry.qualificationAnswers.quiz9.answer,
      valid: entry.qualificationAnswers.quiz9.valid,
    });
    setQuiz10({
      answer: entry.qualificationAnswers.quiz10.answer,
      valid: entry.qualificationAnswers.quiz10.valid,
    });
    setQuiz11({
      answer: entry.qualificationAnswers.quiz11.answer,
      valid: entry.qualificationAnswers.quiz11.valid,
    });
    setQuiz12({
      answer: entry.qualificationAnswers.quiz12.answer,
      valid: entry.qualificationAnswers.quiz12.valid,
    });
    setQuiz13({
      answer: entry.qualificationAnswers.quiz13.answer,
      valid: entry.qualificationAnswers.quiz13.valid,
    });
    setQuiz14({
      answer: entry.qualificationAnswers.quiz14.answer,
      valid: entry.qualificationAnswers.quiz14.valid,
    });
    setQuiz15({
      answer: entry.qualificationAnswers.quiz15.answer,
      valid: entry.qualificationAnswers.quiz15.valid,
    });

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

  const handleAccountApproval = (e, entry) => {
    e.preventDefault();

    showAnswers(e, entry, "Check all valid answers of ");
    setIsShowCheckBox(true);
  };

  const handleApproveModal = (e) => {
    e.preventDefault();

    axios
      .put(
        process.env.REACT_APP_API_URL + "/user/valid/checklist/" + selectedId,
        {
          quiz1: quiz1,
          quiz2: quiz2,
          quiz3: quiz3,
          quiz4: quiz4,
          quiz5: quiz5,
          quiz6: quiz6,
          quiz7: quiz7,
          quiz8: quiz8,
          quiz9: quiz9,
          quiz10: quiz10,
          quiz11: quiz11,
          quiz12: quiz12,
          quiz13: quiz13,
          quiz14: quiz14,
          quiz15: quiz15,
        }
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

  const handleAccountDenied = (e, id) => {
    e.preventDefault();

    Swal.fire({
      title: "Please type your reason?",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        return axios
          .put(
            process.env.REACT_APP_API_URL +
              "/user/valid/" +
              id +
              "?decision=DENIED&reason=" +
              reason
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: `SUCCESS! `,
              text: `Record updated!`,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
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
                    <td>{entry.username}</td>
                    <td>{entry.password}</td>
                    <td>
                      <span
                        className="pointer text-info"
                        onClick={(e) =>
                          history.push("/admin/user/pets/" + entry.id)
                        }
                      >
                        View
                      </span>
                    </td>
                    <td>
                      {entry.qualificationAnswers !== null && (
                        <a
                          href="#"
                          onClick={(e) => {
                            showAnswers(e, entry, "Qualification Answers of ");
                            setIsShowCheckBox(false);
                          }}
                        >
                          Show Answers
                        </a>
                      )}
                    </td>
                    <td>
                      {entry.userValid === null ? (
                        entry.qualificationAnswers && (
                          <div className="d-flex">
                            <Button
                              className="btn btn-success mr-2"
                              onClick={(e) => handleAccountApproval(e, entry)}
                            >
                              Approve
                            </Button>
                            <Button
                              className="btn btn-danger"
                              onClick={(e) => handleAccountDenied(e, entry.id)}
                            >
                              Deny
                            </Button>
                          </div>
                        )
                      ) : (
                        <>
                          {entry.userValid ? (
                            <Badge className="bg-success text-white">
                              APPROVED
                            </Badge>
                          ) : (
                            <div className="d-flex flex-column">
                              <div>
                                <Badge className="bg-danger text-white">
                                  DENIED
                                </Badge>
                              </div>

                              <div>Reason: {entry.userNotValidReason}</div>
                            </div>
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
          {modalTitle} {userName}
        </ModalHeader>
        <ModalBody>
          {answers ? (
            <Row>
              <Col md={12}>
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz1.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz1.valid}
                    />
                  </Col>

                  <Col md={6}>1. Age ?</Col>
                  <Col md={5}>
                    A: <b>{quiz1.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz2.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz2.valid}
                    />
                  </Col>
                  <Col md={6}>2. Current Occupation ?</Col>
                  <Col md={5}>
                    A: <b>{quiz2.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz3.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz3.valid}
                    />
                  </Col>
                  <Col md={6}>3. Valid Id ?</Col>
                  <Col md={5}>
                    A: <b>See below</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz4.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz4.valid}
                    />
                  </Col>
                  <Col md={6}>
                    4. Expectations of the prospective adopter and the reasons
                    for wanting a dog ?
                  </Col>
                  <Col md={5}>
                    A: <b>{quiz4.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz5.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz5.valid}
                    />
                  </Col>
                  <Col md={6}>
                    5. Long-term costs and commitment associated with dog
                    ownership, including ongoing vaccination, deworming, regular
                    veterinary health checks and other treatments. ?
                  </Col>
                  <Col md={5}>
                    A: <b>{quiz5.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz6.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz6.valid}
                    />
                  </Col>
                  <Col md={6}>
                    6. Give the information and advice specific to your home and
                    new pet ?
                  </Col>
                  <Col md={5}>
                    A: <b>{quiz6.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz7.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz7.valid}
                    />
                  </Col>
                  <Col md={6}>7. Is your home situation stable ?</Col>
                  <Col md={5}>
                    A: <b>{quiz7.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz8.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz8.valid}
                    />
                  </Col>
                  <Col md={6}>8. Have you ever had a dog or cat before ?</Col>
                  <Col md={5}>
                    A: <b>{quiz8.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz9.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz9.valid}
                    />
                  </Col>
                  <Col md={6}>
                    9. Explain any known medical conditions or behavioral
                    special needs of your new pet ?
                  </Col>
                  <Col md={5}>
                    A: <b>{quiz9.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz10.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz10.valid}
                    />
                  </Col>
                  <Col md={6}>
                    10. Why do they think this is the right time in their lives
                    to adopt a dog/cat ?
                  </Col>
                  <Col md={5}>
                    A: <b>{quiz10.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="mt-2">
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz11.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz11.valid}
                    />
                  </Col>
                  <Col md={6}>
                    11. Do we have permission to visit your home ?
                  </Col>
                  <Col md={5}>
                    A: <b>{quiz11.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="mt-2">
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz12.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz12.valid}
                    />
                  </Col>
                  <Col md={6}>12. Please describe your household. ?</Col>
                  <Col md={5}>
                    A: <b>{quiz12.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="mt-2">
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz13.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz13.valid}
                    />
                  </Col>
                  <Col md={6}>13. Have you ever had a pet euthanized?</Col>
                  <Col md={5}>
                    A: <b>{quiz13.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="mt-2">
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz14.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz14.valid}
                    />
                  </Col>
                  <Col md={6}>14. Have you ever lost a pet?</Col>
                  <Col md={5}>
                    A: <b>{quiz14.answer}</b>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="mt-2">
                <Row>
                  <Col className="text-center">
                    <Input
                      className="pointer"
                      type="checkbox"
                      onChange={(e) => (quiz15.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz15.valid}
                    />
                  </Col>
                  <Col md={6}>
                    15. Please state a reason for wanting to adopt a pet?
                  </Col>
                  <Col md={5}>
                    A: <b>{quiz15.answer}</b>
                  </Col>
                </Row>
              </Col>

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

        {enableCheckbox && (
          <ModalFooter>
            <Button color="primary" onClick={handleApproveModal}>
              Approve
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        )}
      </Modal>
    </Container>
  );
}

export default Users;
