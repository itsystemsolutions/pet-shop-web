import { Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import {
  Row,
  CardHeader,
  CardBody,
  Card,
  Col,
  Container,
  CardFooter,
} from "reactstrap";

function ProofPayment() {
  let { id, count } = useParams();
  let history = useHistory();

  const showImages = () => {
    var payments = [];
    for (let i = 0; i < count; i++) {
      payments.push(
        <Col>
          <img
            src={`${process.env.REACT_APP_API_URL}/images/payment/${id}-${
              i + 1
            }.jpg`}
            alt="example"
            width={300}
            height={300}
          />
        </Col>
      );
    }
    return payments;
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="12">
          <Card>
            <CardHeader className="text-center">
              <h3 className="fw-normal text-secondary fs-4 text-uppercase mb-4 text-center">
                SET UP PICK-UP
              </h3>
            </CardHeader>

            <CardBody className="text-center">
              <Row>{showImages()}</Row>
            </CardBody>
            <CardFooter>
              <Button onClick={() => history.push("/admin/for-pickup")}>
                GO BACK
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProofPayment;
