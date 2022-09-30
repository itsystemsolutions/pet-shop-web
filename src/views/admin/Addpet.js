import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";
import { CardBody, CardHeader, Input, Label } from "reactstrap";
import Swal from "sweetalert2";

const axios = require("axios").default;

function Addpet() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [residency, setResidency] = useState("");
  const [image, setImage] = useState("");

  const handleAddpet = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_API_URL + "/pets", {
        name: name,
        gender: gender,
        breed: breed,
        age: age,
        size: size,
        shelterResidentYear: residency,
        status: "IN_HOUSE",
      })
      .then(function (response) {
        if (response.status == 200) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("code", response.data);

          axios
            .put(process.env.REACT_APP_API_URL + `/pets/upload/image`, formData)
            .catch((error) => {
              console.log(error);
            });

          Swal.fire({
            icon: "success",
            text: "The pet code is " + response.data,
            title: "Do you want to add another pet?",
            showCancelButton: true,
            cancelButtonText: "YES",
            confirmButtonText: "NO - goto PETS",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/admin/adoptpet");
            } else {
              setName("");
              setGender("");
              setBreed("");
              setAge("");
              setSize("");
              setResidency("");
            }
          });
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <CardHeader>
              <h3 className="fw-normal text-secondary fs-4 text-uppercase mb-4 text-center">
                Add Pet
              </h3>
            </CardHeader>

            <CardBody>
              <Form role="form" onSubmit={handleAddpet}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="gender">Gender</Label>
                  <Input
                    type="gender"
                    className="form-control"
                    placeholder="Gender"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="breed">Breed</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Breed"
                    value={breed}
                    required
                    onChange={(e) => setBreed(e.target.value)}
                  ></Input>
                </FormGroup>{" "}
                <FormGroup>
                  <Label for="age">Age</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Age"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  ></Input>
                </FormGroup>{" "}
                <FormGroup>
                  <Label for="size">Size</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Size"
                    required
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  ></Input>
                </FormGroup>{" "}
                <FormGroup>
                  <Label for="residensy">Shelter Residensy</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Date"
                    required
                    value={residency}
                    onChange={(e) => setResidency(e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="residensy">PET Image</Label>
                  <Input
                    type="file"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="residensy">
                    Upload Vaccine and Other Document
                  </Label>
                  <Input
                    type="file"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </FormGroup>
                <div className="text-center ">
                  <Button
                    type="submit"
                    className="mt-5 mb-4 font-italic rounded-pill btn-fill btn-block"
                    color="primary"
                    block
                  >
                    Add
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Addpet;
