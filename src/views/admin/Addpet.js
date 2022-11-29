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

import Select from "react-select";

import {
  breedDog,
  breedSize,
  genderOptions,
  breedCat,
  typeOptions,
} from "./consts";

const axios = require("axios").default;

function Addpet() {
  const history = useHistory();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("Select Type");
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeigth] = useState("");
  const [residency, setResidency] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [vacineImage, setVacineImage] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");

  const handleAddpet = e => {
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
            .catch(error => {
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
            .catch(error => {
              console.log(error);
            });

          Swal.fire({
            icon: "success",
            text: "The pet code is " + response.data,
            title: "Do you want to add another pet?",
            showCancelButton: true,
            cancelButtonText: "YES",
            confirmButtonText: "NO - goto Dashboard",
          }).then(result => {
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

  const handleUpdatePrice = type => {
    setType(type);

    if (type === "DOG") {
      setPrice(1500);
    } else {
      setPrice(1000);
    }
  };

  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedBreedcat, setSelectedBreedCat] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedGender, setSelectedGender] = useState();
  const [selectType, setSelectType] = useState("");

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="12">
          <Card>
            <CardHeader>
              <h3 className="fw-normal text-secondary fs-4 text-uppercase mb-4 text-center">
                Add Pet
              </h3>
            </CardHeader>

            <CardBody>
              <Form role="form" onSubmit={handleAddpet}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="type">Pet Type</Label>
                      <Select
                        defaultValue={selectType}
                        onChange={setSelectType}
                        options={typeOptions}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Gender</Label>
                      <Select
                        defaultValue={selectedGender}
                        onChange={setSelectedGender}
                        options={genderOptions}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Dog Breed</Label>
                      <Select
                        defaultValue={selectedBreed}
                        onChange={setSelectedBreed}
                        options={breedDog}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Cat Breed</Label>
                      <Select
                        defaultValue={selectedBreedcat}
                        onChange={setSelectedBreedCat}
                        options={breedCat}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="age">Age</Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Age"
                        required
                        maxLength={2}
                        value={age}
                        onChange={e => setAge(e.target.value)}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="age">Weigth</Label>
                      <Input
                        type="number"
                        className="form-control"
                        placeholder="Weigth"
                        required
                        value={weight}
                        onChange={e => setWeigth(e.target.value)}
                      ></Input>
                    </FormGroup>{" "}
                    <FormGroup>
                      <Label for="color">Color</Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Color"
                        required
                        value={color}
                        onChange={e => setColor(e.target.value)}
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>SIZE</Label>
                      <Select
                        defaultValue={selectedSize}
                        onChange={setSelectedSize}
                        options={breedSize}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="residensy">Shelter Residensy</Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Date"
                        required
                        value={residency}
                        onChange={e => setResidency(e.target.value)}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="condition">CONDITION</Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Condition"
                        required
                        value={condition}
                        onChange={e => setCondition(e.target.value)}
                      ></Input>
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
                        onChange={e => setImage(e.target.files[0])}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="residensy">
                        Upload Vaccine and Other Document
                      </Label>
                      <Input
                        type="file"
                        required
                        onChange={e => setVacineImage(e.target.files[0])}
                      />
                    </FormGroup>
                  </Col>
                </Row>

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
