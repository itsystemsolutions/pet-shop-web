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
  const [totalScore, setTotalScore] = useState("");

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
      .then(response => {
        setData(response.data);
      });
  }, []);

  const handleAccountApproval = (e, entry) => {
    e.preventDefault();

    showAnswers(e, entry, "Check all valid answers of ");
    setIsShowCheckBox(true);
  };

  const handleApproveModal = e => {
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
        }).then(result => {
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
      preConfirm: reason => {
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
            }).then(result => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          })
          .catch(error => {
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
                        <a
                          href="#"
                          onClick={e => {
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
                              onClick={e => handleAccountApproval(e, entry)}
                            >
                              Approve
                            </Button>
                            <Button
                              className="btn btn-danger"
                              onClick={e => handleAccountDenied(e, entry.id)}
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
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz1.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz1.valid}
                    />{" "}
                    1
                  </th>

                  <td className="w-50">Age ?</td>
                  <td>{quiz1.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "2%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz2.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz2.valid}
                    />{" "}
                    2
                  </th>
                  <td className="w-50">Current Occupation ?</td>
                  <td>{quiz2.answer} </td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "2%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz2.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz3.valid}
                    />{" "}
                    3
                  </th>
                  <td className="w-50">Valid Id ?</td>
                  <td>See Below</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "2%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz4.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz4.valid}
                    />{" "}
                    4
                  </th>
                  <td className="w-50">
                    Expectations of the prospective adopter and the reasons for
                    wanting a pet.
                  </td>
                  <td>{quiz4.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "1%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz5.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz5.valid}
                    />{" "}
                    5
                  </th>
                  <td className="w-50">
                    Are you prepared for the responsibility of caring for the
                    pet?
                  </td>
                  <td>{quiz5.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz6.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz6.valid}
                    />{" "}
                    6
                  </th>
                  <td className="w-50">
                    Give the information and advice specific to your home and
                    new pet.
                  </td>
                  <td>{quiz6.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "1%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {" "}
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz7.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz7.valid}
                    />{" "}
                    7
                  </th>
                  <td className="w-50">
                    Are you able to provide for the pet consistently?
                  </td>
                  <td>{quiz7.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz8.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz8.valid}
                    />{" "}
                    8
                  </th>
                  <td className="w-50">
                    What will you do if you had a drastic lifestyle change where
                    you could no longer care for the pet?
                  </td>
                  <td>{quiz8.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "2%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz9.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz9.valid}
                    />{" "}
                    9
                  </th>
                  <td className="w-50">
                    Do we have permission to visit your home?
                  </td>
                  <td>{quiz9.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {" "}
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz10.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz10.valid}
                    />{" "}
                    10
                  </th>
                  <td className="w-50">
                    Why do they think this is the right time in their lives to
                    adopt a dog/cat?
                  </td>
                  <td>{quiz10.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "2%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz11.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz11.valid}
                    />{" "}
                    11
                  </th>
                  <td className="w-50">
                    Who will be primarily caretaker of the pet?
                  </td>
                  <td>{quiz11.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz12.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz12.valid}
                    />{" "}
                    12
                  </th>
                  <td className="w-50">
                    Is your current residence safe to keep the pet indoors?
                  </td>
                  <td>{quiz12.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "2%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz13.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz13.valid}
                    />{" "}
                    13
                  </th>
                  <td className="w-50">
                    For emergencies, who will be carrying for the pet when you
                    cannot??
                  </td>
                  <td>{quiz13.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz14.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz14.valid}
                    />{" "}
                    14
                  </th>
                  <td className="w-50">Have you ever lost a pet before?</td>
                  <td>{quiz14.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={e => (quiz15.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz15.valid}
                    />{" "}
                    15
                  </th>
                  <td className="w-50">
                    Are you committed for Long-term costs and commitment
                    associated with dog ownership, including ongoing
                    vaccination, deworming, regular veterinary health checks and
                    other treatments??
                  </td>
                  <td>{quiz15.answer}</td>
                  <td>
                    <b>{answers.answer1 === "MYSELF" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h3>Valid Id</h3>
                  </th>
                  <td className="w-50">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/images/valid-id/${userName}.jpg`}
                      alt="example"
                      height={150}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : null}
          <ModalFooter>
            <div className="text-right w-100">
              Total Score:{" "}
              <b>
                {totalScore} ({totalScore >= 75 ? "PASSED" : "FAILED"})
              </b>
            </div>
          </ModalFooter>
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
