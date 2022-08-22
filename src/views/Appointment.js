import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  FormGroup,
  Placeholder,
  Row,
} from "react-bootstrap";
import { Input, Button, Form, CardHeader, CardBody, Label } from "reactstrap";

const axios = require("axios").default;
function Appointment() {
  const [user, setUser] = useState([]);
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/pets").then(response => {
      console.log(response.data);
      setUser(response.data);
    });
  }, []);
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <CardHeader>
              <h3 className=" text-center">PET PICK UP</h3>
            </CardHeader>
            <Form>
              <CardBody>
                <FormGroup>
                  <Label>First Name</Label>
                  <div className="App">
                    <select className="form-control select-class">
                      <option value="0">Name</option>
                      {user.map(entry => {
                        return <option>{entry.name}</option>;
                      })}
                    </select>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Label>Time</Label>
                  <Input
                    type="time"
                    className="form-control"
                    placeholder="Enter Time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  ></Input>
                </FormGroup>

                <Label>Message</Label>
                <textarea
                  className="form-control"
                  placeholder="Message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                ></textarea>
                <div className="mt-2" style={{ display: "flex" }}>
                  <Button
                    type="submit"
                    color="primary"
                    style={{ marginLeft: "auto" }}
                  >
                    Set Pick Up
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

export default Appointment;
