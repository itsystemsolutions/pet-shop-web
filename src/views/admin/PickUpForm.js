import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { FormGroup, Placeholder, Row } from "react-bootstrap";
import {
  Input,
  Button,
  Form,
  CardHeader,
  CardBody,
  Card,
  Col,
  Container,
} from "reactstrap";
import Swal from "sweetalert2";

const axios = require("axios").default;

function PickUpForm() {
  let { id, code } = useParams();
  let history = useHistory();

  const [name, setName] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/info?id=" + id)
      .then((response) => {
        setName(response.data.name);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_API_URL + "/schedule/pick-up", {
        userId: id,
        date: date,
        time: time,
        message: message,
        petCode: code,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `SUCCESS! `,
          text: `Pick-Up schedule is saved!`,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/admin/for-pickup");
          }
        });
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <CardHeader className="text-center">
              <h3 className="fw-normal text-secondary fs-4 text-uppercase mb-4 text-center">
                SET UP PICK-UP
              </h3>
              PETCODE: {code}
            </CardHeader>

            <Form onSubmit={handleSubmit}>
              <CardBody>
                <FormGroup className="m-2">
                  <Placeholder>Name</Placeholder>
                  <Input
                    type="text"
                    disabled
                    required
                    className="form-control"
                    placeholder="Enter Date"
                    value={name}
                  ></Input>
                </FormGroup>

                <FormGroup className="m-2">
                  <Placeholder>Date</Placeholder>
                  <Input
                    type="date"
                    required
                    className="form-control"
                    placeholder="Enter Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  ></Input>
                </FormGroup>

                <FormGroup className="m-2">
                  <Placeholder>Time</Placeholder>
                  <Input
                    type="time"
                    className="form-control"
                    required
                    placeholder="Enter Email"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  ></Input>
                </FormGroup>

                <FormGroup className="m-2">
                  <Placeholder>Message</Placeholder>
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    value={message}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
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
