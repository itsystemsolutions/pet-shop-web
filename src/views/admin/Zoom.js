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

function Zoom() {
  let { id, code } = useParams();
  let history = useHistory();

  const [name, setName] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [zoomLink, setZoomLink] = useState("");

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
      .post(process.env.REACT_APP_API_URL + "/schedule", {
        userId: id,
        date: date,
        time: time,
        message: message,
        petCode: code,
        zoomLink: zoomLink,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: `SUCCESS! `,
          text: `Meeting schedule is saved!`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Success!", "Your file has been submitted.", "success");
            history.push("/admin/appointment");
          }
        });
      });
  };

  var today = new Date().toISOString().split("T")[0];

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <CardHeader className="text-center">
              <h3 className="fw-normal text-secondary fs-4 text-uppercase mb-4 text-center">
                SET UP ZOOM MEETING
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
                    min={today}
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
                    min="08:00"
                    max="17:00"
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

                <FormGroup className="m-2">
                  <Placeholder>Zoom Link</Placeholder>
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    value={zoomLink}
                    required
                    onChange={(e) => setZoomLink(e.target.value)}
                  ></textarea>
                </FormGroup>

                <div className="mt-2" style={{ display: "flex" }}>
                  <Button
                    type="submit"
                    required
                    color="primary"
                    style={{ marginLeft: "auto" }}
                  >
                    Set Meeting
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

export default Zoom;
