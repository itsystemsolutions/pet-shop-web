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

function MissingPetsBoard() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isUserValidToAdopt, setIsUserValidForAdopt] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/pets/missing/approved")
      .then((response) => {
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

    if (!isUserValidToAdopt) {
      Swal.fire({
        icon: "warning",
        title: `Your account needs to be approved by admin! `,
      });
      return;
    }

    axios
      .post(process.env.REACT_APP_API_URL + "/adopt-form/missing", {
        userId: localStorage.getItem("user_id"),
        petCode: petCode,
      })
      .then((response) => {
        if (response.status === 204) {
          Swal.fire({
            icon: "success",
            title: `SUCCESS! `,
            text: `Missing Pet onboard!`,
          });
          history.push("/user/eligible-pets");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "danger",
          title: `FAILED `,
          text: `Pet already on board!`,
        });
      });
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <h3>LOST AND FOUND PETS</h3>
      </CardHeader>
      <CardBody className="mt-3">
        <Row>
          {data.map((pet) => {
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
                      {/* <Button
                        onClick={(e) => handleAdopt(e, pet.petCode)}
                        color="info"
                        className="mb-2"
                        block
                      >
                        REPORT MISSING PET
                      </Button> */}
                    </CardTitle>
                    <CardTitle className="text-center" tag="h3"></CardTitle>
                    <div>
                      <p className="text-center h3">
                        <b>{pet.name}</b>
                      </p>
                      <p>
                        <b>Pet Code:</b> {pet.petCode}
                      </p>
                      <p>
                        <b>Last Seen Location:</b> {pet.lastSeen}
                      </p>
                      <p>
                        <b>Breed:</b> {pet.breed}
                      </p>
                      <p>
                        <b>Gender:</b> {pet.gender}
                      </p>
                      <p>
                        <b>Description:</b> {pet.description}
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

export default MissingPetsBoard;
