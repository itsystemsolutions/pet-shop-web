import { useEffect, useState, useRef } from "react";

// react-bootstrap components
import {
  CardHeader,
  CardBody,
  CardTitle,
  Card,
  Table,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";

import { useReactToPrint } from "react-to-print";

const axios = require("axios").default;

function Users() {
  const [modal, setModal] = useState(false);
  const [userPets, setUserPets] = useState();
  const [filter, setFilter] = useState("");

  const toggle = () => setModal(!modal);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const showReports = (e, entry, title) => {
    e.preventDefault();

    axios
      .get(process.env.REACT_APP_API_URL + "/adopt-form/" + entry.id)
      .then((response) => {
        setUserPets(
          response.data.map((index) => {
            return (
              <Col md={12}>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="username">UserName</Label>
                      <Input defaultValue={entry.name} disabled />
                    </FormGroup>
                  </Col>

                  <Col md={8}>
                    <FormGroup>
                      <Label for="Mobile">Address</Label>
                      <Input disabled defaultValue={entry.address} />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="username">Date Of Adaption</Label>
                      <Input disabled defaultValue={index.dateAdaptation} />
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <Label for="username">Pet Name</Label>
                      <Input disabled defaultValue={index.petName} />
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <Label for="username">Price</Label>
                      <Input disabled defaultValue={index.petPrice} />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="username">Date of Pick Up</Label>
                      <Input disabled defaultValue={index.datePickUp} />
                    </FormGroup>
                    <div>
                      <FormGroup>
                        <Label for="username">PET CODE</Label>
                        <Input disabled defaultValue={index.petCode} />
                      </FormGroup>
                    </div>
                  </Col>

                  <Col md={8}>
                    <Card
                      style={{
                        backgroundImage: `url(
                            ${process.env.REACT_APP_API_URL}/images/pets/${index.petCode}.jpg)`,
                        minHeight: "300px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></Card>
                  </Col>
                </Row>
              </Col>
            );
          })
        );
      });

    toggle();
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user?type=USER")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <CardHeader>
          <CardTitle as="h4">REPORTS</CardTitle>
        </CardHeader>
        <CardBody className="table-full-width table-responsive px-0">
          <FormGroup className="m-3 w-25">
            <Label>Search User:</Label>
            <Input
              type="text"
              className="form-control"
              onChange={(e) => setFilter(e.target.value)}
            />
          </FormGroup>

          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Name</th>
                <th className="border-0">Mobile</th>
                <th className="border-0">Email</th>
                <th className="border-0">Report</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((entry) => {
                  if (filter != "") {
                    return entry.name.includes(filter);
                  }
                  return true;
                })
                .map((entry) => {
                  return (
                    <tr>
                      <td>{entry.name}</td>
                      <td>{entry.mobile}</td>
                      <td>{entry.email}</td>
                      <td>
                        <a
                          href="#"
                          onClick={(e) => {
                            showReports(e, entry, "Qualification Answers of ");
                          }}
                        >
                          Show Reports
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Modal
        className="pb-5"
        isOpen={modal}
        toggle={toggle}
        size="lg"
        style={{ transform: "translate(0, 0%)" }}
      >
        <ModalBody>
          <div ref={componentRef}>
            <Card>
              <CardHeader>
                <h3 className="text-center">USER TRANSACTION</h3>
              </CardHeader>
              <CardBody>
                <Row>{userPets}</Row>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter className="mt-2" style={{ display: "right" }}>
          <Button onClick={handlePrint}>
            <i className="fa fa-print" aria-hidden="true"></i> Print
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default Users;
