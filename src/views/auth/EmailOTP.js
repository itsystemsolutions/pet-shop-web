import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { Form, Input, Label, Spinner } from "reactstrap";

import Swal from "sweetalert2";
const axios = require("axios").default;

function EmailOTP() {
  let { email } = useParams();

  const history = useHistory();
  const form = useRef();

  const [otp, setOTPCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();

    setIsLoading(true);
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/user/verify-email?email=${email}&otp=${otp}`
      )
      .then((response) => {
        if (response.data.statusCode === "OK") {
          Swal.fire({
            icon: "success",
            title: `SUCCESS! `,
            text: `Congratulations Email is now Verified!`,
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/auth/login");
            }
          });
        } else {
          Swal.fire({
            icon: "danger",
            title: `OTP on email is Invalid! `,
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
            <div className="text-center">
              <h2>Email Verification</h2>
            </div>
            <div>
              <p className="text-center">
                Please check your email for the OTP.
              </p>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form ref={form} onSubmit={submitForm}>
              <Input
                type="email"
                name="user_email"
                required
                onChange={(e) => setOTPCode(e.target.value)}
              />
              <Button
                onClick={submitForm}
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
export default EmailOTP;
