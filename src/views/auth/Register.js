import { useState } from "react";
import { useHistory } from "react-router-dom";

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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Container } from "react-bootstrap";

// axios API library
const axios = require("axios").default;

function Register() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [social, setSocial] = useState("");
  const [image, setImage] = useState("");
  const [validId, setValidId] = useState("Dropdown");

  const [setshowhide, setShowHide] = useState("password");
  const [eye, seteye] = useState(true);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Not Matched!",
      });
      return;
    }

    if (age < 18) {
      Swal.fire({
        icon: "error",
        title: "Register Failed!",
        text: "You must be 18 yrs old and above",
      });
      return;
    }
    if (validId === "Dropdown") {
      Swal.fire({
        icon: "error",
        title: "Register Failed!",
        text: "Please select a valid id",
      });
      return;
    }

    axios
      .post(process.env.REACT_APP_API_URL + "/user", {
        name: name,
        email: email,
        mobile: mobileNumber,
        username: username,
        password: password,
        age: age,
        address: address,
        occupation: occupation,
        social: social,
        validId: validId,
        type: "USER",
      })
      .then((response) => {
        if (response.data.statusCode == "OK") {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("username", username);

          axios
            .put(process.env.REACT_APP_API_URL + `/user/upload/image`, formData)
            .catch((error) => {
              console.log(error);
            });

          // history.push("/auth/qualification-form/" + username);
          history.push("/auth/email/otp/" + email);
        } else {
          Swal.fire({
            icon: "error",
            title: "Register Failed!",
            text: response.data.message,
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

  const handleEye = () => {
    if (setshowhide === "password") {
      setShowHide("text");
      seteye(false);
    } else {
      setShowHide("password");
      seteye(true);
    }
  };

  const handleMobileNumberChange = (e) => {
    const limit = 11;
    setMobileNumber(e.target.value.slice(0, limit));
  };

  const handleAgeChange = (e) => {
    const limit = 2;
    setAge(e.target.value.slice(0, limit));
  };

  return (
    <Container>
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
            <Row>
              <Col>
                <FormGroup>
                  <Label for="Name">
                    Name <span className="text-danger">*</span>
                  </Label>
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
                  <Label for="Email">
                    Email <span className="text-danger">*</span>
                  </Label>
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
                  <Label for="username">
                    Username <span className="text-danger">*</span>
                  </Label>
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
                  <Label for="mobile">
                    Mobile Number <span className="text-danger">*</span>
                  </Label>

                  <Input
                    type="number"
                    required
                    pattern="[0-9]"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="mobile">
                    Age <span className="text-danger">*</span>
                  </Label>
                  <Input
                    placeholder="18"
                    type="number"
                    pattern="[0-9]"
                    required
                    value={age}
                    onChange={handleAgeChange}
                  />
                </FormGroup>

                <FormGroup row>
                  <Label md={12} for="residensy">
                    Valid Id <span className="text-danger">*</span>
                  </Label>
                  <Col md={12} className="ml-2">
                    <Dropdown
                      isOpen={dropdownOpen}
                      toggle={toggle}
                      onChange={(e) => console.log(e.target.value)}
                    >
                      <DropdownToggle caret>{validId}</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Select Id Type</DropdownItem>
                        <DropdownItem
                          name="SSS"
                          onClick={(e) => setValidId(e.target.name)}
                        >
                          SSS
                        </DropdownItem>
                        <DropdownItem
                          name="PAGIBIG"
                          onClick={(e) => setValidId(e.target.name)}
                        >
                          PAGIBIG
                        </DropdownItem>
                        <DropdownItem
                          name="PHILHEALTH"
                          onClick={(e) => setValidId(e.target.name)}
                        >
                          PHILHEALTH
                        </DropdownItem>
                        <DropdownItem
                          name="DRIVERSLICENSE"
                          onClick={(e) => setValidId(e.target.name)}
                        >
                          DRIVERSLICENSE
                        </DropdownItem>
                        <DropdownItem
                          name="OTHER"
                          onClick={(e) => setValidId(e.target.name)}
                        >
                          OTHER
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                  {validId !== "Dropdown" && (
                    <Col md={12} className="ml-2">
                      <Input
                        type="file"
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </Col>
                  )}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="mobile">
                    Address <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="mobile">Occupation</Label>
                  <Input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="mobile">Social Media</Label>
                  <Input
                    type="text"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">
                    Password (must have atleast 4 characters){" "}
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    placeholder="Password"
                    value={password}
                    minLength={4}
                    required
                    type={setshowhide}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="confirm">
                    Confirm password <span className="text-danger">*</span>
                  </Label>
                  <Input
                    placeholder="Confirm password."
                    type={setshowhide}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
              </Col>
            </Row>

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
                      <span className="text-danger">*</span>
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
    </Container>
  );
}

export default Register;
