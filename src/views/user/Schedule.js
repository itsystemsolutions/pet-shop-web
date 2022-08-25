import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Row,
  Input,
  Form,
  Label,
  Button,
} from "reactstrap";

const axios = require("axios").default;
import Swal from "sweetalert2";

function Schedule() {
  let { code } = useParams();

  const [name, setName] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [meetingURL, setMeetingU] = useState("");

  useEffect(() => {
    axios.get("/pets?petCode=" + code).then((response) => {
      console.log(response.data);
      setName(response.data[0].name);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/pets", {
        userId: localStorage.getItem("userId"),
        date: date,
        time: time,
        message: message,
        petCode: code,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: `Scheduled! Success one more step to adtop ${name}`,
          title: `Please come to the petshop at this schedule \n Date: ${date} and Time @ ${time}`,
        });

        console.log(response.data);
        setMessage(response.data.message);
      });

    console.log(name);
    console.log(date);
    console.log(time);
    console.log(message);
    console.log(code);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <CardHeader>
              <h3 className="fw-normal text-secondary fs-4 text-uppercase mb-4 text-center">
                Set a meeting to adopt '{name}'
                <img
                  src={`http://localhost:8081/PETSHOP/images/pets/${code}.jpg`}
                  alt=""
                  height={110}
                  className="my-3"
                />
              </h3>
            </CardHeader>

            <Form>
              <CardBody>
                <FormGroup className="mt-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Label>Time</Label>
                  <Input
                    type="time"
                    className="form-control"
                    placeholder="Enter Email"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Label>Message</Label>
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </FormGroup>

                <div className="mt-2" style={{ display: "flex" }}>
                  <Button
                    onClick={() => history.push("/user/interviewstatus")}
                    type="submit"
                    color="primary"
                  >
                    Back
                  </Button>
                  <Button type="submit" color="primary" className="ml-auto">
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

export default Schedule;
