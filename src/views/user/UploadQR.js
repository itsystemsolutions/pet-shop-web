import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import {
  Input,
  Button,
  Form,
  CardBody,
  Card,
  Col,
  Container,
  FormGroup,
  Row,
  Label,
} from "reactstrap";
import Swal from "sweetalert2";

const axios = require("axios").default;

import gcash from "assets/img/gcash.png";
import maya from "assets/img/maya.png";
import paypal from "assets/img/paypal.png";

function PickUpForm() {
  const history = useHistory();
  let { id } = useParams();

  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("id", id);

    axios
      .put(
        process.env.REACT_APP_API_URL + `/schedule/upload/proof-payment`,
        formData
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `SUCCESS! `,
          text: `Proof of payment uploaded!`,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/user/pick-up");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="10">
          <Card>
            <CardBody className="p-4">
              <h3 className="fw-normal  fs-4 text-uppercase mb-4">Donate</h3>
              <h2 className="fw-normal fs-4 mb-4 font-weight-bold">
                Appreciates all you help!
              </h2>
              <h4 className="fw-normal text-secondary fs-4 mb-4">
                Thank you for your on-going suppport and donations big and small
                that help the animals we help, big and small, Every donation is
                important and appreciated by the staff of supporters, but most
                of all it makes a massive difference to the animals we rescue!
              </h4>
              <h4 className="fw-normal text-secondary fs-4 mb-4 font-weight-bold">
                Please choose from any of the following Donation Channels:
              </h4>
              <Card>
                <CardBody>
                  <Row className="text-center">
                    <Col md={4}>
                      <img src={paypal} alt="example" height={100} />
                      <h4 className="fw-normal text-secondary fs-4 mb-4 font-weight-bold">
                        PayPal
                      </h4>
                    </Col>
                    <Col md={4}>
                      <img src={maya} alt="example" height={100} />
                      <h4 className="fw-normal text-secondary fs-4 mb-4 font-weight-bold">
                        Maya
                      </h4>
                    </Col>
                    <Col md={4}>
                      <img src={gcash} alt="example" height={100} />
                      <h4 className="fw-normal text-secondary fs-4 mb-4 font-weight-bold">
                        GCash App
                      </h4>
                    </Col>
                    <Col>
                      Send to <b>09511556503</b> ZeroPing Petshop
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="mt-3">
                  <Label for="residensy">Screenshot Here</Label>
                  <Input
                    type="file"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </FormGroup>

                <div className="mt-2">
                  <Button
                    type="submit"
                    required
                    color="primary"
                    style={{ marginLeft: "auto" }}
                  >
                    Submit
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

export default PickUpForm;
