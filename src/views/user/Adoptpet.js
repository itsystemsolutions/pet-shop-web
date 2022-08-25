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

const axios = require("axios").default;

function Adoptpet() {
  const history = useHistory();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/pets").then((response) => {
      setData(response.data);
    });
  }, []);

  console.log(data);

  return (
    <Card>
      <CardHeader className="text-center">
        <h3>AVAILABLE PER TO ADOPT</h3>
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
                    http://localhost:8081/PETSHOP/images/pets/${pet.petCode}.jpg)`,
                        minHeight: "250px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></Card>
                    <CardTitle className="text-center" tag="h3">
                      <Button
                        onClick={() =>
                          history.push("/user/adopt-form/" + pet.petCode)
                        }
                        color="info"
                        className="mb-2"
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
