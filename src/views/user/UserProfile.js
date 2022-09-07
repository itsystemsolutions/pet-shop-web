import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
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

  useEffect(() => {
    axios
      .get("/user/info?id=" + localStorage.getItem("user_id"))
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put("/user", {
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
        </CardBody>
      </Card>
    </Container>
  );
}

export default User;
