import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
// react-bootstrap components
import { Button, Card, Container, Row, Col, CardGroup } from "react-bootstrap";
import { CardBody, CardTitle, CardText, CardHeader } from "reactstrap";

// IMAGES
import pexelimage from "../assets/img/pexels-torsten-dettlaff-59523.jpg";
// import pexel1 from "../assets/img/pexels-pixabay-162140.jpg";
import pexel2 from "../assets/img/pexels-burst-374906.jpg";
// import pexel3 from "../assets/img/pexels-kat-smith-568022.jpg";
// import pexel4 from "../assets/img/pexels-lad-fury-2835623.jpg";
// import pexel5 from "../assets/img/pexels-pixabay-257519.jpg";
// import pexel6 from "../assets/img/pexels-vadim-b-127027.jpg";
// import pexel7 from "../assets/img/pexels-pixabay-326012.jpg";
import pexel8 from "../assets/img/pexels-charles-1851164.jpg";
// import pexel9 from "../assets/img/pexels-lucas-andrade-4128416.jpg";

const axios = require("axios").default;

function Adoptpet() {
  const history = useHistory();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/pets").then(response => {
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
          {data.map(pet => {
            return (
              <Col md={3}>
                <Card>
                  <img className="img-fit" alt="Card" src={pexel8} />
                  <CardBody>
                    <CardTitle className="text-center" tag="h3">
                      ADOPT ME!
                    </CardTitle>
                    <CardText className="mt-2"></CardText>
                    <CardText></CardText>
                    <CardText>They need a home as much as we did</CardText>
                    <CardText></CardText>
                  </CardBody>
                </Card>
                <div>
                  <p>Name: {pet.name}</p>
                  <p>Gender: {pet.gender}</p>
                  <p>Breed: {pet.breed}</p>
                  <p>Age: {pet.age}</p>
                  <p>Size: {pet.size}</p>
                  <Button
                    onClick={() => history.push("/admin/Question")}
                    color="primary"
                    className="bg-info text-white rounded-pill mb-2"
                    size="sm"
                  >
                    ADOPT NOW!
                  </Button>
                </div>
              </Col>
            );
          })}
        </Row>
      </CardBody>
    </Card>
  );
}

export default Adoptpet;
