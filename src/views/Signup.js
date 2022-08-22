import React from "react";

import { Container, Col, Card, CardHeader, CardBody } from "reactstrap";

import { Button, FormGroup, Form, Input, Label } from "reactstrap";

function Signup() {
  return (
    <>
      <Container lg={6}>
        <Col className="mx-auto" md="6">
          <Card>
            <CardHeader></CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label>First name</Label>
                  <Input name="username" type="username" />
                </FormGroup>
                <FormGroup>
                  <Label>Last name</Label>
                  <Input name="username" type="username" />
                </FormGroup>
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input name="username" type="username" />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input name="password" type="password" />
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="btn-fill "
                    type="submit"
                    color="info"
                    href="/admin/Login"
                  >
                    Sign Up
                  </Button>
                </div>
                <p className="forgot-password text-right mt-2">
                  Already registered
                  <a className="ml-2" href="/admin/Login">
                    Sign in?
                  </a>
                </p>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
}

export default Signup;
