import React from "react";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap";

function Interviewstatus() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Status of Interview</Card.Title>
                <p className="card-category">Here are the Info</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Date And Time</th>
                      <th className="border-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Elvin Ramos</td>
                      <td>July 28,2022 20:00</td>
                      <ButtonGroup>
                        <Button>Passed</Button>
                        <Button>Failed</Button>
                      </ButtonGroup>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Vince Benito</td>
                      <td>July 24,2022 04:00</td>
                      <ButtonGroup>
                        <Button>Passed</Button>
                        <Button>Failed</Button>
                      </ButtonGroup>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Marlon</td>
                      <td>Aug 28,2022 19:30</td>
                      <ButtonGroup>
                        <Button>Passed</Button>
                        <Button>Failed</Button>
                      </ButtonGroup>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Andre E</td>
                      <td>Sept. 4,2022 20:15</td>
                      <ButtonGroup>
                        <Button>Passed</Button>
                        <Button>Failed</Button>
                      </ButtonGroup>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Allan</td>
                      <td>Aug 1,2022 21:25</td>
                      <ButtonGroup>
                        <Button>Passed</Button>
                        <Button>Failed</Button>
                      </ButtonGroup>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" color="primary" className="mr-3">
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Interviewstatus;
