import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Dropdown,
  FormGroup,
  Placeholder,
  Row,
} from "react-bootstrap";
import {
  Input,
  Button,
  Form,
  CardHeader,
  CardBody,
  DropdownToggle,
} from "reactstrap";

const axios = require("axios").default;

function Zoom() {
  const [name, setName] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/pets").then(response => {
      console.log(response.data);
      setName(response.data);
    });
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <CardHeader>
              <h3 className="fw-normal text-secondary fs-4 text-uppercase mb-4 text-center">
                ZOOM MEETING
              </h3>
            </CardHeader>

            <Form>
              <CardBody>
                <FormGroup>
                  <Placeholder>Name</Placeholder>
                  <div className="App">
                    <select className="form-control select-class">
                      <option value="0">Name</option>
                      {name.map(entry => {
                        return <option>{entry.name}</option>;
                      })}
                    </select>
                  </div>
                </FormGroup>

                <FormGroup className="mt-2">
                  <Placeholder>Date</Placeholder>
                  <Input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Placeholder>Time</Placeholder>
                  <Input
                    type="time"
                    className="form-control"
                    placeholder="Enter Email"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Placeholder>Message</Placeholder>
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  ></textarea>
                </FormGroup>

                <div className="mt-2" style={{ display: "flex" }}>
                  <Button
                    type="submit"
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
