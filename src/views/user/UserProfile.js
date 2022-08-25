import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

const axios = require("axios").default;

function User() {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    axios
      .get("/user/info?id=" + localStorage.getItem("user_id"))
      .then(response => {
        console.log(response);
        setData(response.data);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <CardHeader>
              <h3 className="text-center">PROFILE</h3>
            </CardHeader>
            <CardBody>
              <Col>
                <FormGroup>
                  <Label>Name</Label>
                  <Input value={data.name} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="username">UserName</Label>
                  <Input value={data.username} disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input value={data.email} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Mobile">Mobile</Label>
                  <Input value={data.mobile} />
                </FormGroup>
              </Col>
              <div className="mt-2">
                <Button
                  className="btn-fill pull-end"
                  type="submit"
                  variant="info"
                  color="primary"
                >
                  Update Profile
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default User;
