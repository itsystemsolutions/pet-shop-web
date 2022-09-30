import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormGroup,
  Input,
  Label,
  Progress,
  Row,
  Col,
  CardTitle,
  CardText,
} from "reactstrap";

import Swal from "sweetalert2";

const axios = require("axios").default;

function User() {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    age: "",
    address: "",
    occupation: "",
    social: "",
  });

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [occupation, setOccupation] = useState();
  const [social, setSocial] = useState();
  const [accountStatusColor, setAccountStatusColor] = useState();

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/user/info?id=" +
          localStorage.getItem("user_id")
      )
      .then((response) => {
        setData(response.data);

        if (response.data.userValid === null) {
          setAccountStatusColor("warning");
        } else if (response.data.userValid) {
          setAccountStatusColor("success");
        } else if (!response.data.userValid) {
          setAccountStatusColor("danger");
        }
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(process.env.REACT_APP_API_URL + "/user", {
        id: localStorage.getItem("user_id"),
        name: name,
        email: email,
        mobile: mobile,
        age: age,
        address: address,
        occupation: occupation,
        social: social,
      })
      .then((response) => {
        if (response.status === 204) {
          Swal.fire({
            icon: "success",
            title: `SUCCESS! `,
            text: `Profile Updated!`,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      });
  };

  return (
    <Container fluid>
      <Card>
        <CardHeader>
          <h3 className="text-center">PROFILE</h3>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Col>
                <FormGroup>
                  <Label for="username">UserName</Label>
                  <Input defaultValue={data.username} disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    defaultValue={data.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    defaultValue={data.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Mobile">Mobile</Label>
                  <Input
                    defaultValue={data.mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Mobile">Age</Label>
                  <Input
                    defaultValue={data.age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Mobile">Address</Label>
                  <Input
                    defaultValue={data.address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Mobile">Occupation</Label>
                  <Input
                    defaultValue={data.occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Mobile">Social</Label>
                  <Input
                    defaultValue={data.social}
                    onChange={(e) => setSocial(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <div className="mt-2">
                <Button
                  className="btn-fill pull-end"
                  type="submit"
                  variant="info"
                  color="primary"
                  onClick={handleUpdate}
                >
                  Update Profile
                </Button>
              </div>
            </Col>
            <Col>
              <div className="text-center">Your Account Status</div>
              <Progress multi>
                <Progress bar color="warning" value="33.33">
                  Pending
                </Progress>
                <Progress bar color="success" value="33.33">
                  Approved
                </Progress>
                <Progress bar color="info" value="33.33">
                  Interview
                </Progress>
              </Progress>
              <div className="mt-2">
                <Row className="justify-content-center mt-4">
                  <Col md={3}>
                    <Card
                      className={`rounded-circle bg-${accountStatusColor}`}
                      style={{ height: "10rem", width: "10rem" }}
                    >
                      <CardBody></CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

export default User;
