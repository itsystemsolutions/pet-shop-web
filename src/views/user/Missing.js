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
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Type } from "../admin/consts/index";

import { Card } from "react-bootstrap";

import Select from "react-select";
import Swal from "sweetalert2";

const axios = require("axios").default;

function Missing() {
  const [dropOpen, setDropOpen] = useState(false);
  const [type, setType] = useState("");
  const toggleS = () => setDropOpen(prevState => !prevState);
  const [lastSeen, setLastSeen] = useState("");
  const [image, setImage] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/user/info?id=" +
          localStorage.getItem("user_id")
      )
      .then(response => {
        console.log(response.data);
        setData(response.data);
      });
  }, []);

  const handleAddpet = e => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_API_URL + "/pets", {
        ownerId: localStorage.getItem("user_id"),
        lastSeen: lastSeen,
        breed: breed,
        gender: gender,
        description: description,
        status: "MISSING",
        petType: "MISSING",
      })
      .then(function (response) {
        if (response.status == 200) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("code", response.data);

          axios
            .put(process.env.REACT_APP_API_URL + `/pets/upload/image`, formData)
            .catch(error => {
              console.log(error);
            });

          console.log(response);
          Swal.fire({
            icon: "success",
            title: "This added pet code is " + response.data,
            text: "Please wait for the administrator to approve your report; this indicates that your lost pet is in the shelter",
            showCancelButton: true,
            confirmButtonText: "OKAY",
          }).then(result => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      });
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <Col md="12">
            <h4>Your Infomation</h4>
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
              <Col md={12}>
                <h4>Pet Information</h4>
                <FormGroup>
                  <Label for="mobile">Set Last seen Location.</Label>
                  <Input
                    type="text"
                    required
                    onChange={e => setLastSeen(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="residensy">Pet Image</Label>
                  <Input
                    type="file"
                    required
                    onChange={e => setImage(e.target.files[0])}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="residensy">Select Status</Label>
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={Type}
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
                        onChange={() => setGender("MALE")}
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
                        onChange={() => setGender("FEMALE")}
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
                        onChange={() => setGender("UNSURE")}
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
                    onChange={e => setDescription(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Button
                className="my-2 font-italic"
                color="primary"
                type="submit"
                block
                onClick={handleAddpet}
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
