import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import {
  Input,
  Button,
  Form,
  CardHeader,
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
        <Col md="6">
          <Card>
            <CardHeader className="text-center">
              <h3 className="fw-normal text-secondary fs-4 text-uppercase mb-4 text-center">
                UPLOAD PROOF OF PAYMENT
              </h3>
              <h5 className="fw-normal text-secondary fs-4 text-uppercase mb-4 text-center">
                Scan the QR then upload the screenshot
              </h5>
            </CardHeader>

            <Form onSubmit={handleSubmit}>
              <CardBody>
                <img
                  src="http://16.163.143.49:8081/PETSHOP/images/qr/admin-qr.jpg"
                  alt="example"
                  height={700}
                />
                <FormGroup className="mt-3">
                  <Label for="residensy">Screenshot Here</Label>
                  <Input
                    type="file"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </FormGroup>

                <div className="mt-2" style={{ display: "flex" }}>
                  <Button
                    type="submit"
                    required
                    color="primary"
                    style={{ marginLeft: "auto" }}
                  >
                    Submit
                  </Button>
                </div>
              </CardBody>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PickUpForm;
