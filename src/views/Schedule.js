import React from "react";
import { Container, Row } from "react-bootstrap";
import { Button, Col } from "reactstrap";
function Schedule() {
  return (
    <Container>
      <Row>
        <Col sm={{ size: "auto", offset: 3 }}>
          <Button
            type="submit"
            color="primary"
            size="lg"
            href="/admin/Appointment"
          >
            PICK UP
          </Button>
        </Col>
        <Col sm={{ size: "auto", offset: 1 }}>
          <Button type="submit" color="primary" size="lg" href="/admin/Zoom">
            ZOOM MEETING
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Schedule;
