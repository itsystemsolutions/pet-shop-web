import { useState, useEffect } from "react";

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

const axios = require("axios").default;

function Missing() {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [breed, setBreed] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    axios
      .get("/user/info?id=" + localStorage.getItem("user_id"))
      .then(response => {
        console.log(response.data);
        setData(response.data);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <Col md="12">
            <Row>
              <Col md={4}>
                <FormGroup className="ml-2">
                  <Label for="Name">Name</Label>
                  <Input
                    placeholder="Name"
                    type="text"
                    defaultValue={data.name}
                    required
                    disabled
                  />
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup className="ml-2">
                  <Label for="Email">Email</Label>
                  <Input
                    placeholder="Email"
                    type="text"
                    defaultValue={data.email}
                    required
                    disabled
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup className="ml-2">
                  <Label for="mobile">Mobile Number</Label>
                  <Input
                    placeholder="09XX-XXX-XXXX"
                    type="number"
                    pattern="[0-9]"
                    required
                    disabled
                    defaultValue={data.mobile}
                    maxLength={11}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="mobile">Set Last seen Location.</Label>
                  <Input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="residensy">Pet Image</Label>
                  <Input
                    type="file"
                    required
                    onChange={e => setImage(e.target.files[0])}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Name">Breed.</Label>
                  <Input
                    type="text"
                    required
                    value={breed}
                    onChange={e => setBreed(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>Gender:</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question8"
                        type="radio"
                        onChange={() => setAnswer("")}
                      />
                      MALE
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question8"
                        type="radio"
                        onChange={() => setAnswer("")}
                      />
                      FEMALE
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question8"
                        type="radio"
                        onChange={() => setAnswer("")}
                      />
                      UNSURE
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Name">Pet Description</Label>
                  <Input
                    type="textarea"
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Button
                className="mt-2 font-italic"
                color="primary"
                type="submit"
                block
                onClick={handleSubmit}
                style={{ cursor: "pointer" }}
              >
                Submit
              </Button>
            </Row>
          </Col>
        </CardHeader>
      </Card>
    </Container>
  );
}

export default Missing;
