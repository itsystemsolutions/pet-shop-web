import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

// alert prompt
import Swal from "sweetalert2";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  FormFeedback,
  FormText,
} from "reactstrap";

import { Container } from "react-bootstrap";

// axios API library
const axios = require("axios").default;

function Register() {
  let {} = useParams();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [setshowhide, setShowHide] = useState("password");
  const [eye, seteye] = useState(true);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Not Matched!",
      });
    } else {
      axios
        .post("/user", {
          name: name,
          email: email,
          mobile: mobileNumber,
          username: username,
          password: password,
          type: "USER",
        })
        .then(function (response) {
          if (response.data.statusCode == "OK") {
            history.push("/auth/login");
            Swal.fire({
              icon: "success",
              text: `New user: ${name} is now registered`,
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
    }
  };

  const handleEye = () => {
    if (setshowhide === "password") {
      setShowHide("text");
      seteye(false);
    } else {
      setShowHide("password");
      seteye(true);
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <Card>
              <CardHeader>
                <Row>
                  <span
                    onClick={() => history.push("/auth/login")}
                    className="pointer ml-5 h2"
                    title="Back to Sign In"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa fa-arrow-left" />
                  </span>
                  <Col md={10}>
                    <div className="text-center">
                      <h2>CREATE ACCOUNT</h2>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={handleRegister}>
                  <FormGroup>
                    <Label for="Name">Name</Label>
                    <Input
                      placeholder="Name"
                      type="text"
                      minLength={5}
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                      placeholder="Email"
                      type="text"
                      minLength={5}
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      placeholder="Username"
                      type="text"
                      minLength={5}
                      autoComplete="new-username"
                      value={username}
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="mobile">Mobile Number</Label>
                    <Input
                      placeholder="09XX-XXX-XXXX"
                      type="number"
                      pattern="[0-9]"
                      required
                      maxLength={11}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">
                      Password (must have atleast 4 characters)
                    </Label>
                    <Input
                      placeholder="Password"
                      value={password}
                      minLength={4}
                      required
                      type={setshowhide}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormFeedback>Password did not matched</FormFeedback>
                    <FormText onClick={handleEye} className="pointer">
                      <div className="font-italic mt-2">
                        <i
                          className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
                          style={{ cursor: "pointer" }}
                        />
                        <span className="ml-2">
                          {eye ? "Show" : "Hide"} password
                        </span>
                      </div>
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirm">Confirm password</Label>
                    <Input
                      placeholder="Confirm password."
                      type={setshowhide}
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormGroup>

                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <Input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                          required
                        />

                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        >
                          <span className="text-muted">
                            I agree with the{" "}
                            <a href="null" onClick={(e) => e.preventDefault()}>
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center ">
                    <Button
                      type="submit"
                      className="mt-5 mb-4 font-italic rounded-pill btn-fill"
                      color="primary"
                      block
                    >
                      Create account
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
