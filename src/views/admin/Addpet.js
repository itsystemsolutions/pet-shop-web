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
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [name, setName] = useState("");
  const [petType, setPetType] = useState("");

  const [age, setAge] = useState("");
  const [weight, setWeigth] = useState("");
  const [residency, setResidency] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [vacineImage, setVacineImage] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");

  const [selectType, setSelectType] = useState();
  const [selectedGender, setSelectedGender] = useState();

  const [selectedBreed, setSelectedBreed] = useState();
  const [selectedBreedcat, setSelectedBreedCat] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const handleAddpet = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_API_URL + "/pets", {
        name: name,
        type: selectType?.value,
        gender: selectedGender?.value,
        size: selectedSize?.value,
        weight: weight,
        breed:
          selectType?.value === "DOG"
            ? selectedBreed?.value
            : selectedBreedcat?.value,
        age: age,
        shelterResidentYear: residency,
        status: "FOR_ADOPTION",
        price: price,
        color: color,
        petCondition: condition,
        petType: "FOR_ADOPTION",
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

  const hanldePetTypeChange = (type) => {
    setSelectType(type);

    if (type.value === "DOG") {
      setPrice(1500);
    } else {
      setPrice(1000);
    }
  };

  var today = new Date().toISOString().split("T")[0];

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
                      <Label for="name">
                        Name <span className="text-danger">*</span>
                      </Label>
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
                      <Label for="type">
                        Pet Type <span className="text-danger">*</span>
                      </Label>
                      <Select
                        defaultValue={selectType}
                        onChange={hanldePetTypeChange}
                        options={typeOptions}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        Gender <span className="text-danger">*</span>
                      </Label>
                      <Select
                        defaultValue={selectedGender}
                        onChange={setSelectedGender}
                        options={genderOptions}
                      />
                    </FormGroup>
                    {selectType ? (
                      <>
                        {selectType?.value === "DOG" ? (
                          <FormGroup>
                            <Label>Dog Breed</Label>
                            <Select
                              defaultValue={selectedBreed}
                              onChange={setSelectedBreed}
                              options={breedDog}
                            />
                          </FormGroup>
                        ) : (
                          <FormGroup>
                            <Label>Cat Breed</Label>
                            <Select
                              defaultValue={selectedBreedcat}
                              onChange={setSelectedBreedCat}
                              options={breedCat}
                            />
                          </FormGroup>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    <FormGroup>
                      <Label for="age">
                        Age <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Age"
                        required
                        maxLength={2}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="age">
                        Weigth (kg) <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="number"
                        className="form-control"
                        placeholder="Weigth"
                        required
                        value={weight}
                        onChange={(e) => setWeigth(e.target.value)}
                      ></Input>
                    </FormGroup>{" "}
                    <FormGroup>
                      <Label for="color">
                        Color <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Color"
                        required
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>
                        SIZE <span className="text-danger">*</span>
                      </Label>
                      <Select
                        defaultValue={selectedSize}
                        onChange={setSelectedSize}
                        options={breedSize}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="residensy">
                        Shelter Residensy <span className="text-danger">*</span>
                      </Label>

                      <Input
                        id="residensy"
                        type="date"
                        max={today}
                        required
                        className="form-control"
                        placeholder="Enter Date"
                        value={residency}
                        onChange={(e) => setResidency(e.target.value)}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="condition">
                        CONDITION <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Condition"
                        required
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="price">Price </Label>
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
                      <Label for="residensy">
                        PET Image <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="file"
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="residensy">
                        Upload Vaccine and Other Document{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="file"
                        required
                        onChange={(e) => setVacineImage(e.target.files[0])}
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
