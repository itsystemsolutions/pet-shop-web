import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Button, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { Form, Input, Label, Spinner } from "reactstrap";

import Swal from "sweetalert2";
const axios = require("axios").default;

function ForgetPassword() {
  const history = useHistory();
  const form = useRef();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_t52p73h",
  //       "template_5nv17fq",
  //       form.current,
  //       "4BPwQt3w8poIUZCwB"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //         console.log("message send");
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  const sendEmail = (e) => {
    e.preventDefault();

    setIsLoading(true);
    axios.get("/user/forgot-password?email=" + email).then((response) => {
      if (response.data.statusCode === "OK") {
        Swal.fire({
          icon: "success",
          title: `SUCCESS! `,
          text: `We have sent new password on your email!`,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          icon: "danger",
          title: `Email did not exists on our records! `,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
      setIsLoading(false);
    });
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
              <Label>Email</Label>
              <Input
                type="email"
                name="user_email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                onClick={sendEmail}
                block
                type="submit"
                className="mt-2 bg-info text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm">Loading...</Spinner>
                    <span> Submit</span>
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
export default ForgetPassword;
