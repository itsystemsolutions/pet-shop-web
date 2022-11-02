import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Container,
  Button,
  Badge,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
} from "reactstrap";
import Swal from "sweetalert2";

const axios = require("axios").default;

function EligiblePets() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");

  const [selectedPetCode, setSelectedCode] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/adopt-form/" +
          localStorage.getItem("user_id")
      )
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleRequestInterviews = (e, petCode) => {
    e.preventDefault();

    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/adopt-form/request-interview?id=" +
          localStorage.getItem("user_id") +
          "&petCode=" +
          petCode
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: `SUCCESS! `,
            text: `We will schedule a zoom meeting for you!`,
          });
          window.location.reload();
        }
      })
      .catch((res) => {
        Swal.fire({
          icon: "error",
          title: `FAILED!`,
          text: `You already requested an inteview with this pet!`,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("code", selectedPetCode);

    axios
      .put(
        process.env.REACT_APP_API_URL + `/adopt-form/upload/proof-ownership`,
        formData
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `SUCCESS! `,
          text: `Proof of ownership uploaded!`,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <CardHeader>
          <CardTitle as="h4">Approved Pet's</CardTitle>
          <p className="card-category">Here are list of eligible pets.</p>
        </CardHeader>
        <CardBody className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">ID</th>
                <th className="border-0">Actions</th>
                <th className="border-0">Name</th>
                <th className="border-0">Date And Time</th>
                <th className="border-0">Type</th>
                <th className="border-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td className="w-25">
                    <Row>
                      <Col md={12}>
                        <Button
                          onClick={(e) =>
                            handleRequestInterviews(e, item.petCode)
                          }
                          block
                          className="w-50"
                          color="primary"
                        >
                          Request Interview
                        </Button>
                      </Col>
                      {item.type === "MISSING" &&
                        (item.hasProofOwnerShip ? (
                          <Col className="mt-3" md={12}>
                            Proof Ownership{" "}
                            <i className="fa fa-check text-success"></i>
                          </Col>
                        ) : (
                          <Col md={12} className="mt-2">
                            <Button
                              onClick={(e) => {
                                toggle();
                                setSelectedCode(item.petCode);
                              }}
                              block
                              className="w-50"
                              color="primary"
                            >
                              Upload Proof of Ownership
                            </Button>
                          </Col>
                        ))}
                    </Row>
                  </td>
                  <td>
                    <a
                      href={`${process.env.REACT_APP_URL}/user/pet/info/${item.petCode}`}
                      target="_blank"
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/pets/${item.petCode}.jpg`}
                        alt=""
                        height={110}
                        className="mb-3"
                      />
                    </a>

                    <div>Name: {item.petName}</div>
                    <div>
                      Code:{" "}
                      <a
                        href={`${process.env.REACT_APP_URL}/user/pet/info/${item.petCode}`}
                        target="_blank"
                      >
                        {item.petCode}
                      </a>
                    </div>
                  </td>
                  <td>{item.timestamp}</td>
                  <td>{item.type}</td>
                  <td className="text-white">
                    <Badge
                      className={`${
                        item.status === "PENDING" ||
                        item.status === "FOR_INTERVIEW"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Upload Proof of Ownership to {selectedPetCode}
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Input
              type="file"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
}

export default EligiblePets;
