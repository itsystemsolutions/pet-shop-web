import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Button, Row } from "react-bootstrap";
import { Col, Card, CardHeader, CardBody } from "reactstrap";
import { Form, Input, Label } from "reactstrap";

function ForgetPassword() {
  const history = useHistory();
  const form = useRef();

  const sendEmail = e => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_t52p73h",
        "template_5nv17fq",
        form.current,
        "4BPwQt3w8poIUZCwB"
      )
      .then(
        result => {
          console.log(result.text);
          console.log("message send");
        },
        error => {
          console.log(error.text);
        }
      );
  };

  return (
    <Row className="justify-content-center">
      <Col className="w-100" md={6} sm={12}>
        <Card>
          <CardHeader>
            <span
              onClick={() => history.push("/auth/login")}
              className="pointer ml-2"
              title="Back to Sign In"
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-arrow-left" />
            </span>
            <div className="text-center">
              <h2>FORGET PASSWORD?</h2>
            </div>
            <div>
              <p className="text-center">
                Please enter your email to sign in to PetShop.
              </p>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form ref={form} onSubmit={sendEmail}>
              <Label>Name</Label>
              <Input type="text" name="user_name" />
              <Label>Email</Label>
              <Input type="email" name="user_email" />
              <Button type="submit" className="mt-2">
                Send
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
export default ForgetPassword;
