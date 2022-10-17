import { useState, useEffect } from "react";
import { useParams } from "react-router";

import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Label,
} from "reactstrap";

import { Card } from "react-bootstrap";

import Swal from "sweetalert2";

const axios = require("axios").default;

function PetInformation() {
  const { code } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/pets?petCode=" + code)
      .then((response) => {
        setData(response.data[0]);
      });
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="8">
          <Card className="p-3">
            <CardBody>
              {data && (
                <Row>
                  <Col md={12}>
                    <CardTitle>
                      <h4>Pet Infomation</h4>
                    </CardTitle>
                  </Col>
                  <Col md={12}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/images/pets/${data.petCode}.jpg`}
                      alt=""
                      height={300}
                      className="mb-3"
                    />
                  </Col>
                  <Col md={4}>Name:</Col>
                  <Col md={8}>{data.name}</Col>
                  <Col md={4}>Pet Code:</Col>
                  <Col md={8}>{data.petCode}</Col>
                  <Col md={4}>Gender:</Col>
                  <Col md={8}>{data.gender}</Col>
                  <Col md={4}>Age:</Col>
                  <Col md={8}>{data.age}</Col>
                  <Col md={4}>Size:</Col>
                  <Col md={8}>{data.size}</Col>
                  <Col md={4}>Breed:</Col>
                  <Col md={8}>{data.breed}</Col>
                  <Col md={4}>Shelter Resident Year:</Col>
                  <Col md={8}>{data.shelterResidentYear}</Col>
                  <Col md={12} className="mt-4">
                    Vaccine Record
                  </Col>
                  <Col md={12}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/images/vaccine/${data.petCode}.jpg`}
                      alt=""
                      height={300}
                      className="mb-3"
                    />
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PetInformation;
