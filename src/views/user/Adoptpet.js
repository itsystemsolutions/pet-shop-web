import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
// react-bootstrap components
import {
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  Row,
  Col,
  Card,
  Button,
} from "reactstrap";
import Swal from "sweetalert2";

const axios = require("axios").default;

function Adoptpet() {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [isUserValidToAdopt, setIsUserValidForAdopt] = useState(false);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/pets").then((response) => {
      setData(response.data);
    });

    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/user/info?id=" +
          localStorage.getItem("user_id")
      )
      .then((response) => {
        if (response.data.userValid !== null) {
          setIsUserValidForAdopt(response.data.userValid);
        }
      });
  }, []);

  const handleAdopt = (e, petCode) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_API_URL + "/adopt-form", {
        userId: localStorage.getItem("user_id"),
        petCode: petCode,
      })
      .then((response) => {
        if (response.status === 204) {
          Swal.fire({
            icon: "success",
            title: `SUCCESS! `,
            text: `We will schedule a interview for you!`,
          });
          history.push("/user/eligible-pets");
        }
      });
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <h3>AVAILABLE PETS TO ADOPT</h3>
      </CardHeader>
      <CardBody className="mt-3">
        <Row>
          {isUserValidToAdopt &&
            data.map((pet) => {
              return (
                <Col md={3}>
                  <Card>
                    <CardBody>
                      <Card
                        style={{
                          backgroundImage: `url(
                            ${process.env.REACT_APP_API_URL}/images/pets/${pet.petCode}.jpg)`,
                          minHeight: "250px",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></Card>
                      <CardTitle className="text-center" tag="h3">
                        <Button
                          onClick={() => {
                            if (isUserValidToAdopt) {
                              history.push("/user/adopt-form/" + pet.petCode);
                            } else {
                              Swal.fire({
                                icon: "warning",
                                title: `Your account needs to be approved by admin! `,
                              });
                            }
                          }}
                          color="info"
                          className="mb-2"
                          block
                        >
                          ADOPT PET
                        </Button>
                      </CardTitle>

                      <CardText>They need a home as much as we did</CardText>
                      <div>
                        <p className="text-center h3">
                          <b>{pet.name}</b>
                        </p>
                        <p>
                          <b>Pet Code:</b> {pet.petCode}
                        </p>
                        <p>
                          <b>Pet Name:</b> {pet.name}
                        </p>
                        <p>
                          <b>Gender:</b> {pet.gender}
                        </p>
                        <p>
                          <b>Breed:</b> {pet.breed}
                        </p>
                        <p>
                          <b>Age:</b> {pet.age}
                        </p>
                        <p>
                          <b>Size:</b> {pet.size}
                        </p>
                        <p>
                          <b>
                            Shelter residence since {pet.shelterResidentYear}{" "}
                          </b>
                        </p>
                        <p>
                          <b>Type:</b> {pet.type}
                        </p>
                        <p>
                          <b>Price:</b> {pet.price}
                        </p>
                        <p>
                          <b>Weight:</b> {pet.weight}
                        </p>
                        <p>
                          <b>Color:</b> {pet.color}
                        </p>
                        <p>
                          <b>Condition:</b> {pet.petCondition}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </CardBody>
    </Card>
  );
}

export default Adoptpet;
