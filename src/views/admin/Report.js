import { useEffect, useState } from "react";
import { useHistory } from "react-router";

// react-bootstrap components
import {
  CardHeader,
  CardBody,
  CardTitle,
  Card,
  Table,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import Swal from "sweetalert2";

const axios = require("axios").default;

function Users() {
  const history = useHistory();

  const [petData, setPetData] = useState([]);

  const [userName, setUsername] = useState("");
  const [answers, setAnswers] = useState();
  const [modal, setModal] = useState(false);

  const [modalTitle, setModalTitle] = useState();
  const [enableCheckbox, setIsShowCheckBox] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();

  const toggle = () => setModal(!modal);

  const showAnswers = (e, entry, title) => {
    e.preventDefault();

    setUsername(entry.username);
    setAnswers(entry.qualificationAnswers);
    setSelectedId(entry.id);
    setAddress(entry.address);

    toggle();
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user?type=USER")
      .then(response => {
        setData(response.data);
      });
  }, []);

  const handleAccountApproval = (e, entry) => {
    e.preventDefault();

    showAnswers(e, entry, "Check all valid answers of ");
    setIsShowCheckBox(true);
  };

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <CardHeader>
          <CardTitle as="h4">REPORTS</CardTitle>
        </CardHeader>
        <CardBody className="table-full-width table-responsive px-0">
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
              {data.map(entry => {
                return (
                  <tr>
                    <td>{entry.name}</td>
                    <td>{entry.mobile}</td>
                    <td>{entry.email}</td>
                    <td>
                      <a
                        href="#"
                        onClick={e => {
                          showAnswers(e, entry, "Qualification Answers of ");
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
        scrollable={true}
        size="lg"
        style={{ transform: "translate(0, 0%)" }}
      >
        <ModalBody>
          <Card>
            <CardHeader>
              <h3 className="text-center">USER TRANSACTION</h3>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">UserName</Label>
                        <Input
                          defaultValue={userName}
                          disabled
                          onChange={e => setUsername(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={8}>
                      <FormGroup>
                        <Label for="Mobile">Address</Label>
                        <Input
                          disabled
                          defaultValue={address}
                          onChange={e => setAddress(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">Date Of Adaption</Label>
                        <Input disabled />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">Pet Name</Label>
                        <Input
                          disabled
                          onChange={e => setIsUserValidForAdopt(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">Price</Label>
                        <Input
                          disabled
                          onChange={e => setIsUserValidForAdopt(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">Date of Pick Up</Label>
                        <Input
                          disabled
                          onChange={e => setIsUserValidForAdopt(e.target.value)}
                        />
                      </FormGroup>
                      <div>
                        <FormGroup>
                          <Label for="username">PET CODE</Label>
                          <Input
                            disabled
                            onChange={e => setAddress(e.target.value)}
                          />
                        </FormGroup>
                      </div>
                    </Col>

                    <Col md={8}>
                      <Card
                        style={{
                          backgroundImage: `url(
                            ${process.env.REACT_APP_API_URL}/images/pets/${data.petCode}.jpg)`,
                          minHeight: "250px",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter className="mt-2" style={{ display: "right" }}>
          <button>PRINT</button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default Users;
