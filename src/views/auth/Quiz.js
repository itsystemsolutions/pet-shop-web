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
  Label,
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
          quiz1: data.age,
          quiz2: data.occupation,
          quiz3: "",
          quiz4: quiz4,
          quiz5: quiz5,
          quiz6: quiz6,
          quiz7: quiz7,
          quiz7Explain: quiz7Explain,
          quiz8: quiz8,
          quiz8Explain: quiz8Explain,
          quiz9: quiz9,
          quiz10: quiz10,
          quiz11: quiz11,
          quiz12: quiz12,
          quiz13: quiz13,
          quiz14: quiz14,
          quiz15: quiz15,
        }
      )
      .then((response) => {
        if (response.data.statusCode === "OK") {
          Swal.fire({
            icon: "success",
            title: "Quiz submitted!",
            text: `Please wait for the admin to approve the quiz before adopting a pet`,
            confirmButtonText: "Check EligiblePets",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/user/dashboard");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            text: `Oh no! Something went wrong!`,
            confirmButtonText: "Try again",
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
              <Col md={12}>
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

              <Col md={12}>
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

              <Col md={12}>
                3.VALID ID
                <Col md={4}>
                  <img
                    src={`http://16.163.143.49:8081/PETSHOP/images/valid-id/${data.username}.jpg`}
                    alt="example"
                    height={150}
                  />
                </Col>
              </Col>

              <Col md={12}>
                4. Expectations of the prospective adopter and the reasons for
                wanting a dog.
              </Col>

              <Col md={6}>
                <Input
                  style={{ cursor: "pointer" }}
                  name="quiz4"
                  type="textbox"
                  required
                  onChange={(e) => setQuiz4(e.target.value)}
                />
              </Col>

              <Col md={12}>
                5. Long-term costs and commitment associated with dog ownership,
                including ongoing vaccination, deworming, regular veterinary
                health checks and other treatments.
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz5"
                        type="radio"
                        required
                        onChange={(e) => setQuiz5("Agree")}
                      />
                      Agree
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz5"
                        required
                        type="radio"
                        onChange={(e) => setQuiz5("Disagree")}
                      />
                      Disagree
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                6. Give the information and advice specific to your home and new
                pet.
              </Col>

              <Col md={6}>
                <Input
                  style={{ cursor: "pointer" }}
                  name="quiz6"
                  type="textbox"
                  required
                  onChange={(e) => setQuiz6(e.target.value)}
                />
              </Col>

              <Col md={12}>7. Is your home situation stable?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="quiz7"
                        type="radio"
                        onChange={(e) => setQuiz7("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="quiz7"
                        type="radio"
                        onChange={(e) => setQuiz7("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={6}>
                if yes, explain.
                <Input
                  style={{ cursor: "pointer" }}
                  name="question1"
                  type="textbox"
                  onChange={(e) => setQuiz7Explain(e.target.value)}
                />
              </Col>

              <Col md={12}>8. Have you ever had a dog or cat before?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="quiz8"
                        type="radio"
                        onChange={(e) => setQuiz8("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="quiz8"
                        type="radio"
                        onChange={(e) => setQuiz8("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={6}>
                if yes, ewhere are they now?
                <Input
                  style={{ cursor: "pointer" }}
                  name="quiz8"
                  type="textbox"
                  onChange={(e) => setQuiz8Explain(e.target.value)}
                />
              </Col>

              <Col md={12}>
                9. Explain any known medical conditions or behavioral special
                needs of your new pet.
              </Col>
              <Col md={6}>
                <Input
                  style={{ cursor: "pointer" }}
                  name="quiz9"
                  type="textbox"
                  onChange={(e) => setQuiz9(e.target.value)}
                />
              </Col>

              <Col md={12}>
                10. Why do they think this is the right time in their lives to
                adopt a dog/cat?
              </Col>
              <Col md={6}>
                <Input
                  style={{ cursor: "pointer" }}
                  name="quiz10"
                  type="textbox"
                  onChange={(e) => setQuiz10(e.target.value)}
                />
              </Col>
              <Col md={12}>11. Do we have permission to visit your home?</Col>
              <Col md={6}>
                <Input
                  style={{ cursor: "pointer" }}
                  name="quiz11"
                  type="textbox"
                  onChange={(e) => setQuiz11(e.target.value)}
                />
              </Col>
              <Col md={12}>12. Please describe your household.</Col>
              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz12"
                        type="radio"
                        required
                        onChange={(e) => setQuiz12("Active")}
                      />
                      Active
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz12"
                        required
                        type="radio"
                        onChange={(e) => setQuiz12("Noisy")}
                      />
                      Noisy
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz12"
                        required
                        type="radio"
                        onChange={(e) => setQuiz12("Quiet")}
                      />
                      Quiet
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="quiz12"
                        required
                        type="radio"
                        onChange={(e) => setQuiz12("Average")}
                      />
                      Average
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md={12}>13. Have you ever had a pet euthanized?</Col>
              <Col md={6}>
                <Input
                  style={{ cursor: "pointer" }}
                  name="quiz13"
                  type="textbox"
                  onChange={(e) => setQuiz13(e.target.value)}
                />
              </Col>
              <Col md={12}>14. Have you ever lost a pet?</Col>
              <Col md={6}>
                <Input
                  style={{ cursor: "pointer" }}
                  name="quiz14"
                  type="textbox"
                  onChange={(e) => setQuiz14(e.target.value)}
                />
              </Col>
              <Col md={12}>
                15. Please state a reason for wanting to adopt a pet?
              </Col>
              <Col md={6}>
                <Input
                  style={{ cursor: "pointer" }}
                  name="quiz15"
                  type="textbox"
                  onChange={(e) => setQuiz15(e.target.value)}
                />
              </Col>

              <Button
                className="mt-2 font-italic"
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
