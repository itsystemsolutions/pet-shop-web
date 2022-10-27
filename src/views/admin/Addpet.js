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

import {
  CardBody,
  CardHeader,
  Input,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Swal from "sweetalert2";

const axios = require("axios").default;

function Addpet() {
  const history = useHistory();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("Select Type");
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [residency, setResidency] = useState("");
  const [image, setImage] = useState("");
  const [vacineImage, setVacineImage] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

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
        type: type,
        price: price,
        petType: "IN_HOUSE",
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

          const vaccineForm = new FormData();
          vaccineForm.append("file", vacineImage);
          vaccineForm.append("code", response.data);

          axios
            .put(
              process.env.REACT_APP_API_URL + `/pets/upload/vaccine/image`,
              vaccineForm
            )
            .catch((error) => {
              console.log(error);
            });

          Swal.fire({
            icon: "success",
            text: "The pet code is " + response.data,
            title: "Do you want to add another pet?",
            showCancelButton: true,
            cancelButtonText: "YES",
            confirmButtonText: "NO - goto Dashboard",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/admin/dashboard");
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

  const handleUpdatePrice = (type) => {
    setType(type);

    if (type === "DOG") {
      setPrice(1500);
    } else {
      setPrice(1000);
    }
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
                  <Label for="type">PET Type</Label>
                  <Dropdown id="type" isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>{selected}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Select Id Type</DropdownItem>
                      <DropdownItem
                        name="SSS"
                        onClick={(e) => handleUpdatePrice("DOG")}
                      >
                        DOG
                      </DropdownItem>
                      <DropdownItem
                        name="PAGIBIG"
                        onClick={(e) => handleUpdatePrice("CAT")}
                      >
                        CAT
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Price"
                    required
                    disabled
                    value={price}
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
                    onChange={(e) => setVacineImage(e.target.files[0])}
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
