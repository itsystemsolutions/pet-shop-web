import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  CardBody,
  CardHeader,
  Row,
  Col,
} from "reactstrap";

import { Card } from "react-bootstrap";

// axios API library
const axios = require("axios").default;

function Quiz() {
  const history = useHistory();

  const [data, setData] = useState({
    validid: "",
  });

  const [quiz4, setQuiz4] = useState("");
  const [quiz5, setQuiz5] = useState("");
  const [quiz6, setQuiz6] = useState("");
  const [quiz7, setQuiz7] = useState("");
  const [quiz7Explain, setQuiz7Explain] = useState("");
  const [quiz8, setQuiz8] = useState("");
  const [quiz8Explain, setQuiz8Explain] = useState("");
  const [quiz9, setQuiz9] = useState("");
  const [quiz10, setQuiz10] = useState("");
  const [quiz11, setQuiz11] = useState("");
  const [quiz12, setQuiz12] = useState("");
  const [quiz13, setQuiz13] = useState("");
  const [quiz14, setQuiz14] = useState("");
  const [quiz15, setQuiz15] = useState("");

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/user/info?id=" +
          localStorage.getItem("user_id")
      )
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        process.env.REACT_APP_API_URL +
          "/user/quiz-answer/" +
          localStorage.getItem("user_id"),
        {
          quiz1: {
            answer: data.age,
            valid: false,
          },
          quiz2: {
            answer: data.occupation,
            valid: false,
          },
          quiz3: {
            answer: "",
            valid: false,
          },
          quiz4: {
            answer: quiz4,
            valid: false,
          },
          quiz5: {
            answer: quiz5,
            valid: false,
          },
          quiz6: {
            answer: quiz6,
            valid: false,
          },
          quiz7: {
            answer: quiz7,
            valid: false,
          },
          quiz7Explain: quiz7Explain,
          quiz8: {
            answer: quiz8,
            valid: false,
          },
          quiz8Explain: quiz8Explain,
          quiz9: {
            answer: quiz9,
            valid: false,
          },
          quiz10: {
            answer: quiz10,
            valid: false,
          },
          quiz11: {
            answer: quiz11,
            valid: false,
          },
          quiz12: {
            answer: quiz12,
            valid: false,
          },
          quiz13: {
            answer: quiz13,
            valid: false,
          },
          quiz14: {
            answer: quiz14,
            valid: false,
          },
          quiz15: {
            answer: quiz15,
            valid: false,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data === 0) {
          Swal.fire({
            icon: "error",
            title: "Quiz Failed!",
            text: `You have missed the correct answer to an important question.`,
            confirmButtonText: "Continue",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/user/dashboard");
            }
          });
        } else if (response.data >= 75) {
          Swal.fire({
            icon: "success",
            title: "Success You have Passed the Quiz!",
            text: `You can now adopt pets, Your score was ` + response.data,
            confirmButtonText: "Check EligiblePets",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/user/dashboard");
            }
          });
        } else if (response.data < 75) {
          Swal.fire({
            icon: "error",
            title: "Quiz Failed!",
            text:
              `You have not react the passing score, Your score was ` +
              response.data,
            confirmButtonText: "Continue",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/user/dashboard");
            }
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Oops...",
          title: "Something went wrong!",
        });
      });
  };

  return (
    <Container className="my-5">
      <Card>
        <CardHeader>
          <h3 className="text-center">
            15 QUESTIONS/REQUIREMENTS THAT USER NEEDS TO ANSWER TO QUALIFY TO
            ADOPT A PET
          </h3>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row className="ml-4">
              <Col md={12} className="font-weight-bold">
                1. AGE:
                <Col md={4}>
                  <Input
                    placeholder="Name"
                    type="text"
                    defaultValue={data.age}
                    required
                    disabled
                  />
                </Col>
              </Col>

              <Col md={12} className="font-weight-bold">
                2. CURRENT OCCUPATION
                <Col md={4}>
                  <Input
                    placeholder="Occupation"
                    type="text"
                    disabled
                    autoComplete="Occupation"
                    defaultValue={data.occupation}
                    required
                  />
                </Col>
              </Col>

              <Col md={12} className="font-weight-bold">
                3.VALID ID
                <Col md={4}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/valid-id/${data.username}.jpg`}
                    alt="example"
                    height={150}
                  />
                </Col>
              </Col>
              <Col md={12} className="font-weight-bold">
                4. Expectations of the prospective adopter and the reasons for
                wanting a pet.
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className="mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz4"
                        type="radio"
                        required
                        onChange={(e) => setQuiz4("A")}
                      />
                      Yes, because I have a stable financial support for my
                      future pet and I have stable job.
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz4"
                        required
                        type="radio"
                        onChange={(e) => setQuiz4("B")}
                      />
                      Not compatible in the pets.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz4"
                        required
                        type="radio"
                        onChange={(e) => setQuiz4("C")}
                      />
                      I want to surprise my partner because she wants a dog to
                      pet him.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz4"
                        required
                        type="radio"
                        onChange={(e) => setQuiz4("D")}
                      />
                      To have a playmate.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                5. Are you prepared for the responsibility of caring for the
                pet?
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className="mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz5"
                        type="radio"
                        required
                        onChange={(e) => setQuiz5("A")}
                      />
                      No, because I have a work
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz5"
                        required
                        type="radio"
                        onChange={(e) => setQuiz5("B")}
                      />
                      Yes, in terms of financial stability, home space and
                      experience of having another pet.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz5"
                        required
                        type="radio"
                        onChange={(e) => setQuiz5("C")}
                      />
                      No, my partner will be responsible for caring because I’m
                      busy with my work.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz5"
                        required
                        type="radio"
                        onChange={(e) => setQuiz5("D")}
                      />
                      Yes, but it looks like it's too expensive.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                6. Give the information and advice specific to your home and new
                pet.
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className="mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz6"
                        type="radio"
                        required
                        onChange={(e) => setQuiz6("A")}
                      />
                      I want my pet lonely and not active in everyday routine
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz6"
                        required
                        type="radio"
                        onChange={(e) => setQuiz6("B")}
                      />
                      I want my pet to be aggressive like Pitbull so that I can
                      play in dog fighting competition.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz6"
                        required
                        type="radio"
                        onChange={(e) => setQuiz6("C")}
                      />
                      I want a pet that in good condition and no wounds.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz6"
                        required
                        type="radio"
                        onChange={(e) => setQuiz6("D")}
                      />
                      Joyful pet, makes me happy every day, smart and easy to
                      train.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                7. Are you able to provide for the pet consistently?
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className="mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz7"
                        type="radio"
                        required
                        onChange={(e) => setQuiz7("A")}
                      />
                      No, because I have something to do to my money
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz7"
                        required
                        type="radio"
                        onChange={(e) => setQuiz7("B")}
                      />
                      Yes, because I have a stable financial support for my
                      future pet and I have stable job.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz7"
                        required
                        type="radio"
                        onChange={(e) => setQuiz7("C")}
                      />
                      I don’t think I can provide consistently because I’m so
                      busy at my work
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz7"
                        required
                        type="radio"
                        onChange={(e) => setQuiz7("D")}
                      />
                      Yes, but with my friends and family.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                8. What will you do if you had a drastic lifestyle change where
                you could no longer care for the pet?
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className="mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz8"
                        type="radio"
                        required
                        onChange={(e) => setQuiz8("A")}
                      />
                      I will sell my pet to my close friends
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz8"
                        required
                        type="radio"
                        onChange={(e) => setQuiz8("C")}
                      />
                      I'll try to ask help from my friends and neighbors.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz8"
                        required
                        type="radio"
                        onChange={(e) => setQuiz8("C")}
                      />
                      Request help from family members or return them to the
                      shelter if needed.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                9. Do we have permission to visit your home?
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className="mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz9"
                        type="radio"
                        required
                        onChange={(e) => setQuiz9("A")}
                      />
                      Yes, because my home is open to the first family who will
                      care for my future pet.
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz9"
                        required
                        type="radio"
                        onChange={(e) => setQuiz9("B")}
                      />
                      No, because I always be with my friends
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz9"
                        required
                        type="radio"
                        onChange={(e) => setQuiz9("C")}
                      />
                      Yes, but not now because I'm working at office.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                10. Why do they think this is the right time in their lives to
                adopt a dog/cat?
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className="mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz10"
                        type="radio"
                        required
                        onChange={(e) => setQuiz10("A")}
                      />
                      Just for myself.
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz10"
                        required
                        type="radio"
                        onChange={(e) => setQuiz10("B")}
                      />
                      I want to adopt pet because it’s my birthday gift.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz10"
                        required
                        type="radio"
                        onChange={(e) => setQuiz10("C")}
                      />
                      Because I want to try the experience of having a playmate
                      like dogs/cat.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz10"
                        required
                        type="radio"
                        onChange={(e) => setQuiz10("D")}
                      />
                      Because I am now dedicated and in a good situation, with a
                      higher income and financial stability
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                11. Who will be primarily caretaker of the pet?
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className="mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz11"
                        type="radio"
                        required
                        onChange={(e) => setQuiz11("A")}
                      />
                      Myself, Because I am the one who adopted the pet, I must
                      accept responsibility for having a new pet.
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz11"
                        required
                        type="radio"
                        onChange={(e) => setQuiz11("B")}
                      />
                      My neighbor because I can trust them.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="mt-2 ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz11"
                        required
                        type="radio"
                        onChange={(e) => setQuiz11("C")}
                      />
                      My siblings, cousins or other family member.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                12. Is your current residence safe to keep the pet indoors?
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className=" mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz12"
                        type="radio"
                        required
                        onChange={(e) => setQuiz12("A")}
                      />
                      No, because there's a lot of garbage there.
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz12"
                        required
                        type="radio"
                        onChange={(e) => setQuiz12("B")}
                      />
                      Not now but we will try to build house pet for them
                      because some random dogs can come in our property
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz12"
                        required
                        type="radio"
                        onChange={(e) => setQuiz12("C")}
                      />
                      I do have a large pet-friendly space, as well as a
                      backyard for my pet to play in.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz12"
                        required
                        type="radio"
                        onChange={(e) => setQuiz12("D")}
                      />
                      Yes, but there's any pet here like chickens, duck, dove,
                      etc.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                13. For emergencies, who will be carrying for the pet when you
                cannot??
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className=" mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz13"
                        type="radio"
                        required
                        onChange={(e) => setQuiz13("A")}
                      />
                      My friends.
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz13"
                        required
                        type="radio"
                        onChange={(e) => setQuiz13("B")}
                      />
                      Other friends/neighbor who can carry.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz13"
                        required
                        type="radio"
                        onChange={(e) => setQuiz13("C")}
                      />
                      My family since they live with me and can look after my
                      pet when I am not at home.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                14. Have you ever lost a pet before?
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className=" mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz14"
                        type="radio"
                        required
                        onChange={(e) => setQuiz14("A")}
                      />
                      No, since I am very responsible to my pets and have always
                      considered them like family members.
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz14"
                        required
                        type="radio"
                        onChange={(e) => setQuiz14("B")}
                      />
                      Yes, because sometimes I forgot to give them a food.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz14"
                        required
                        type="radio"
                        onChange={(e) => setQuiz14("C")}
                      />
                      Yes, I lost my pet because I give it to my friend that I
                      thought I can trust it to them but they lost it
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz14"
                        required
                        type="radio"
                        onChange={(e) => setQuiz14("D")}
                      />
                      No, because I don't have my own pet before.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                15. Are you committed for Long-term costs and commitment
                associated with dog ownership, including ongoing vaccination,
                deworming, regular veterinary health checks and other
                treatments??
              </Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={12}>
                    <FormGroup check inline className=" mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz15"
                        type="radio"
                        required
                        onChange={(e) => setQuiz15("A")}
                      />
                      No, I'm not fully committed. I also unsure to be the owner
                      of a dog and cats. I also thinking I will not accomplish
                      all the responsibilities that is needed.
                    </FormGroup>
                  </Col>

                  <Col md={12}>
                    <FormGroup check inline className="ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz15"
                        required
                        type="radio"
                        onChange={(e) => setQuiz15("B")}
                      />
                      Yes, I am fully committed and prepared for long-term
                      objectives, challenges with my future pet.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className=" ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz15"
                        required
                        type="radio"
                        onChange={(e) => setQuiz15("C")}
                      />
                      Birthday gift to my girlfriend/boyfriend.
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup check inline className="ml-2 mt-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz15"
                        required
                        type="radio"
                        onChange={(e) => setQuiz15("D")}
                      />
                      Yes, but it is too expensive so I'll just wait for free
                      public treatments.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Button
                className="mt-2 font-italic mr-5"
                color="primary"
                type="submit"
                block
                style={{ cursor: "pointer" }}
              >
                Submit
              </Button>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Quiz;
