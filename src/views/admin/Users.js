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

const map1 = new Map();
map1.set(
  "4_A",
  "Yes, because I have a stable financial support for my future pet and I have stable job."
);
map1.set("4_B", "Not compatible in the pets");
map1.set(
  "4_C",
  "I want to surprise my partner because she wants a dog to pet him."
);
map1.set("4_D", "To have a playmate");

map1.set("5_A", "No, because I have a work");
map1.set(
  "5_B",
  "Yes, in terms of financial stability, home space and experience of having another pet."
);
map1.set("5_C", "  ");
map1.set("5_D", "Yes, but it looks like it's too expensive.");

map1.set("6_A", "I want my pet lonely and not active in everyday routine ");
map1.set(
  "6_B",
  "I want my pet to be aggressive like Pitbull so that I can play in dog fighting competition. "
);
map1.set("6_C", "I want a pet that in good condition and no wounds. ");
map1.set(
  "6_D",
  "Joyful pet, makes me happy every day, smart and easy to train. "
);

map1.set("7_A", "No, because I have something to do to my money ");
map1.set(
  "7_B",
  "Yes, because I have a stable financial support for my future pet and I have stable job. "
);
map1.set(
  "7_C",
  "I don’t think I can provide consistently because I’m so busy at my work "
);
map1.set("7_D", "Yes, but with my friends and family.");

map1.set("8_A", "I will sell my pet to my close friends ");
map1.set("8_B", "I'll try to ask help from my friends and neighbors. ");
map1.set(
  "8_C",
  "Request help from family members or return them to the shelter if needed.  "
);
map1.set("8_D", " ");

map1.set(
  "9_A",
  "Yes, because my home is open to the first family who will care for my future pet. "
);
map1.set("9_B", "No, because I always be with my friends ");
map1.set("9_C", "Yes, but not now because I'm working at office. ");
map1.set("9_D", " ");

map1.set("10_A", "	Just for myself. ");
map1.set("10_B", "	I want to adopt pet because it’s my birthday gift. ");
map1.set(
  "10_C",
  "Because I want to try the experience of having a playmate like dogs/cat. "
);
map1.set(
  "10_D",
  "Because I am now dedicated and in a good situation, with a higher income and financial stability "
);

map1.set(
  "11_A",
  " Myself, Because I am the one who adopted the pet, I must accept responsibility for having a new pet."
);
map1.set("11_B", "My neighbor because I can trust them.");
map1.set("11_C", " My siblings, cousins or other family member.");
map1.set("11_D", " ");

map1.set("12_A", "No, because there's a lot of garbage there.");
map1.set(
  "12_B",
  "Not now but we will try to build house pet for them because some random dogs can come in our property "
);
map1.set(
  "12_C",
  "I do have a large pet-friendly space, as well as a backyard for my pet to play in. "
);
map1.set(
  "12_D",
  "•Yes, but there's any pet here like chickens, duck, dove, etc. "
);

map1.set("13_A", "My friends. ");
map1.set("13_B", "Other friends/neighbor who can carry.");
map1.set(
  "13_C",
  " My family since they live with me and can look after my pet when I am not at home."
);
map1.set("13_D", " ");

map1.set(
  "14_A",
  "No, since I am very responsible to my pets and have always considered them like family members. "
);
map1.set("14_B", "Yes, because sometimes I forgot to give them a food. ");
map1.set(
  "14_C",
  "Yes, I lost my pet because I give it to my friend that I thought I can trust it to them but they lost it"
);
map1.set("14_D", "No, because I don't have my own pet before. ");

map1.set(
  "15_A",
  "No, I'm not fully committed. I also unsure to be the owner of a dog and cats. I also thinking I will not accomplish all the responsibilities that is needed. "
);
map1.set(
  "15_B",
  "Yes, I am fully committed and prepared for long-term objectives, challenges with my future pet. "
);
map1.set("15_C", "Birthday gift to my girlfriend/boyfriend.");
map1.set(
  "15_D",
  "Yes, but it is too expensive so I'll just wait for free public treatments. "
);

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

    let scoreCount = 12;
    if (entry.qualificationAnswers.quiz4.answer === "A") {
      scoreCount = scoreCount + 3;
    }
    if (entry.qualificationAnswers.quiz5.answer === "B") {
      scoreCount = scoreCount + 10;
    }
    if (entry.qualificationAnswers.quiz6.answer === "D") {
      scoreCount = scoreCount + 3;
    }
    if (entry.qualificationAnswers.quiz7.answer === "B") {
      scoreCount = scoreCount + 10;
    }
    if (entry.qualificationAnswers.quiz8.answer === "C") {
      scoreCount = scoreCount + 4;
    }
    if (entry.qualificationAnswers.quiz9.answer === "A") {
      scoreCount = scoreCount + 10;
    }
    if (entry.qualificationAnswers.quiz10.answer === "D") {
      scoreCount = scoreCount + 4;
    }
    if (entry.qualificationAnswers.quiz11.answer === "A") {
      scoreCount = scoreCount + 10;
    }
    if (entry.qualificationAnswers.quiz12.answer === "C") {
      scoreCount = scoreCount + 4;
    }
    if (entry.qualificationAnswers.quiz13.answer === "C") {
      scoreCount = scoreCount + 10;
    }
    if (entry.qualificationAnswers.quiz14.answer === "A") {
      scoreCount = scoreCount + 10;
    }
    if (entry.qualificationAnswers.quiz15.answer === "B") {
      scoreCount = scoreCount + 10;
    }

    setTotalScore(scoreCount);
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
            <Table>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>#</th>
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
                      onChange={(e) => (quiz1.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz1.valid}
                    />{" "}
                    1
                  </th>

                  <td className="w-50">Age ?</td>
                  <td>{quiz1.answer} </td>
                  <td>
                    <b>{"4%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz2.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz2.valid}
                    />{" "}
                    2
                  </th>
                  <td className="w-50">Current Occupation ?</td>
                  <td>{quiz2.answer} </td>
                  <td>
                    <b>{"4%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz2.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz3.valid}
                    />{" "}
                    3
                  </th>
                  <td className="w-50">Valid Id ?</td>
                  <td>See Below</td>
                  <td>
                    <b>{"4%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz4.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz4.valid}
                    />{" "}
                    4
                  </th>
                  <td className="w-50">
                    Expectations of the prospective adopter and the reasons for
                    wanting a pet.
                  </td>
                  <td>{map1.get("4_" + quiz4.answer)}</td>
                  <td>
                    <b>{quiz4.answer === "A" && "3%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz5.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz5.valid}
                    />{" "}
                    5
                  </th>
                  <td className="w-50">
                    Are you prepared for the responsibility of caring for the
                    pet?
                  </td>
                  <td>{map1.get("5_" + quiz5.answer)}</td>
                  <td>
                    <b>{quiz5.answer === "B" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz6.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz6.valid}
                    />{" "}
                    6
                  </th>
                  <td className="w-50">
                    Give the information and advice specific to your home and
                    new pet.
                  </td>
                  <td>{map1.get("6_" + quiz6.answer)}</td>
                  <td>
                    <b>{quiz6.answer === "D" && "3%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {" "}
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz7.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz7.valid}
                    />{" "}
                    7
                  </th>
                  <td className="w-50">
                    Are you able to provide for the pet consistently?
                  </td>
                  <td>{map1.get("7_" + quiz7.answer)}</td>
                  <td>
                    <b>{quiz7.answer === "B" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz8.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz8.valid}
                    />{" "}
                    8
                  </th>
                  <td className="w-50">
                    What will you do if you had a drastic lifestyle change where
                    you could no longer care for the pet?
                  </td>
                  <td>{map1.get("8_" + quiz8.answer)}</td>
                  <td>
                    <b>{quiz8.answer === "C" && "4%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz9.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz9.valid}
                    />{" "}
                    9
                  </th>
                  <td className="w-50">
                    Do we have permission to visit your home?
                  </td>
                  <td>{map1.get("9_" + quiz9.answer)}</td>
                  <td>
                    <b>{quiz9.answer === "A" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {" "}
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz10.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz10.valid}
                    />{" "}
                    10
                  </th>
                  <td className="w-50">
                    Why do they think this is the right time in their lives to
                    adopt a dog/cat?
                  </td>
                  <td>{map1.get("10_" + quiz10.answer)}</td>
                  <td>
                    <b>{quiz10.answer === "D" && "4%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz11.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz11.valid}
                    />{" "}
                    11
                  </th>
                  <td className="w-50">
                    Who will be primarily caretaker of the pet?
                  </td>
                  <td>{map1.get("11_" + quiz11.answer)}</td>
                  <td>
                    <b>{quiz11.answer === "A" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz12.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz12.valid}
                    />{" "}
                    12
                  </th>
                  <td className="w-50">
                    Is your current residence safe to keep the pet indoors?
                  </td>
                  <td>{map1.get("12_" + quiz12.answer)}</td>
                  <td>
                    <b>{quiz12.answer === "C" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz13.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz13.valid}
                    />
                    13
                  </th>
                  <td className="w-50">
                    For emergencies, who will be carrying for the pet when you
                    cannot??
                  </td>
                  <td>{map1.get("13_" + quiz13.answer)}</td>
                  <td>
                    <b>{quiz13.answer === "C" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz14.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz14.valid}
                    />
                    14
                  </th>
                  <td className="w-50">Have you ever lost a pet before?</td>
                  <td>{map1.get("14_" + quiz14.answer)}</td>
                  <td>
                    <b>{quiz14.answer === "A" && "10%"}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Input
                      className="pointer mt-2"
                      type="checkbox"
                      onChange={(e) => (quiz15.valid = e.target.checked)}
                      disabled={!enableCheckbox}
                      defaultChecked={quiz15.valid}
                    />
                    15
                  </th>
                  <td className="w-50">
                    Are you committed for Long-term costs and commitment
                    associated with dog ownership, including ongoing
                    vaccination, deworming, regular veterinary health checks and
                    other treatments??
                  </td>
                  <td>{map1.get("15_" + quiz15.answer)}</td>
                  <td>
                    <b>{quiz15.answer === "B" && "10%"}</b>
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
        </ModalBody>
        <ModalFooter>
          <div className="text-right w-100">
            Total Score:{" "}
            <b>
              {totalScore} (
              {totalScore >= 75 ? (
                <span className="text-success">PASSED</span>
              ) : (
                <span className="text-danger">FAILED</span>
              )}
              )
            </b>
          </div>
        </ModalFooter>

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
