import React from "react";
import Swal from "sweetalert2";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  CardBody,
  CardHeader,
  Row,
  Col,
} from "reactstrap";
import { Card } from "react-bootstrap";

const handleSubmit = e => {
  e.preventDefault();

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to change this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Submit!",
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire("Success!", "Your file has been submitted.", "success");
    }
    console.log(result.isConfirmed);
  });
};

function Question() {
  return (
    <Container>
      <Card>
        <CardHeader>
          <h3>Adopt a pet qualification questions...</h3>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={12}>
                1. Who will be responsible for feeding, grooming and generally
                taking care for your pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Friends
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Myself
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Family
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>
                2. Are there children below 18 yrs old in the house?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>3. Do you have other pets?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <Form>
            <Row>
              <Col md={12}>4. Who else do you live with?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Spouse
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Parents
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Roommates
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>
                {" "}
                5. Are there any members of your household allergic to animals?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <Form>
            <Row>
              <Col md={12}>
                7. Who will be financially responsible for your pet’s needs
                (i,e.. food, vet bills, etc.)?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Myself
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Family
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Friends
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <Form>
            <Row>
              <Col md={12}>
                8. Who will be looking after your pet if you go on vacation or
                in case of emergency?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Myself
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Family
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Friends
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>
                9. How many hours in an average workday will your pet be left
                alone?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      8 hours
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      9 hours
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Above 10 hours
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <Form>
            <Row>
              <Col md={12}>
                10. Does everyone in the family support your decision to adopt a
                pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>
                11. What steps will you take to familiarize your pet with
                his/her new surroundings?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Proper Training
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      House Tour
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Let Them Familiarize
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <Form>
            <Row>
              <Col md={12}>12. What type of building do you live in?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      House
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Apartment
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Condo
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>13. Do you rent?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>
                14. If renting or living in a shared building, can you provide a
                copy of your building’s pet policy?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>
                15. What happens to your pet if or when you move, will you take
                your pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>16. What kind of pet us right for you?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Racial Pet
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Non-Racial Pet
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <Form>
            <Row>
              <Col md={12}>
                17. Are you ready for long term commitment with your new pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <Form>
            <Row>
              <Col md={12}>
                18. Can you afford to care for your pets healthy and safety?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <Form>
            <Row>
              <Col md={12}>19. Do you have time for pet?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>20. Are you willing to train your pet? How?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Hire Professional Trainer
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Watch Youtube Videos
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                      />
                      Ask Help To Your Friends, Family etc.
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Button
            className="mt-2 font-italic rounded-pill"
            color="primary"
            type="submit"
            style={{ cursor: "pointer" }}
          >
            Submit
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Question;
