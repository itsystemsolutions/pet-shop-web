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

  const [userdata, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    age: "",
    address: "",
    occupation: "",
    social: "",
  });

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

  const toggle = () => setModal(!modal);

  const showAnswers = (e, entry, title) => {
    e.preventDefault();

    setModalTitle(title);
    setUsername(entry.username);
    setAnswers(entry.qualificationAnswers);
    setSelectedId(entry.id);

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

  const handleApproveModal = e => {
    e.preventDefault();

    axios
      .put(
        process.env.REACT_APP_API_URL + "/user/valid/checklist/" + selectedId,
        {}
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `SUCCESS! `,
          text: `Record is updated!`,
        }).then(result => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      });
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/user/info?id=" +
          localStorage.getItem("user_id")
      )
      .then(response => {
        setUserData(response.data);
      });
  }, []);

  axios.put(process.env.REACT_APP_API_URL + "/user", {
    id: localStorage.getItem("user_id"),
    name: name,
    email: email,
    mobile: mobile,
  });

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <CardHeader>
          <CardTitle as="h4">Reports</CardTitle>
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
                        <Input defaultValue={userdata.username} disabled />
                      </FormGroup>
                    </Col>

                    <Col md={8}>
                      <FormGroup>
                        <Label for="Mobile">Address</Label>
                        <Input
                          defaultValue={userdata.address}
                          onChange={e => setAddress(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">UserName</Label>
                        <Input disabled />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">UserName</Label>
                        <Input disabled />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">UserName</Label>
                        <Input disabled />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">UserName</Label>
                        <Input disabled />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="username">UserName</Label>
                        <Input disabled />
                      </FormGroup>
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
