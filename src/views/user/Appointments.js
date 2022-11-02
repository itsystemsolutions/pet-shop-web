import { useEffect, useState } from "react";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";

// Alert Dialogs
import Swal from "sweetalert2";

const axios = require("axios").default;

function Appointments() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({
    answer1: false,
    answer2: false,
    answer3: false,
    answer4: false,
    answer5: false,
    answer6: false,
    answer7: false,
    answer8: false,
    answer9: false,
    answer10: false,
  });

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/schedule/for-interview?userId=" +
          localStorage.getItem("user_id")
      )
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const toggleModal = () => setShow(!show);

  const showSummary = (e, checklist) => {
    e.preventDefault();
    setSelected(checklist);
    toggleModal();
  };

  const showFailedSummary = (e, reason) => {
    e.preventDefault();
    Swal.fire("Failed the assesment", "Reasons: " + reason, "error");
  };

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <CardHeader>
          <span classNam="h4">My Appointments</span>
          <p className="card-category">List of interview set by admin</p>
        </CardHeader>
        <CardBody className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Pet Code</th>
                <th className="border-0">Pet Type</th>
                <th className="border-0">Date</th>
                <th className="border-0">Time</th>
                <th className="border-0">Message</th>
                <th className="border-0">Interview LINK</th>
                <th className="border-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                return (
                  <tr>
                    <td>
                      <a
                        href={`${process.env.REACT_APP_URL}/user/pet/info/${entry.petCode}`}
                        target="_blank"
                      >
                        <img
                          src={`${process.env.REACT_APP_API_URL}/images/pets/${entry.petCode}.jpg`}
                          alt=""
                          height={110}
                          className="mb-3"
                        />
                      </a>

                      <div>Name: {entry.petName}</div>
                      <div>
                        Code:{" "}
                        <a
                          href={`${process.env.REACT_APP_URL}/user/pet/info/${entry.petCode}`}
                          target="_blank"
                        >
                          {entry.petCode}
                        </a>
                      </div>
                    </td>
                    <td>{entry.petType}</td>
                    <td>{entry.date}</td>
                    <td>{entry.time}</td>
                    <td>{entry.message}</td>
                    <td>
                      <a href={entry.zoomLink} target="_blank">
                        {entry.zoomLink}
                      </a>
                    </td>
                    <td>
                      {entry.status} <br />
                      {entry.status == "PASSED"
                        ? entry.checklist && (
                            <a
                              href="#"
                              onClick={(e) => showSummary(e, entry.checklist)}
                            >
                              summary
                            </a>
                          )
                        : entry.failedReason && (
                            <a
                              href="#"
                              onClick={(e) =>
                                showFailedSummary(e, entry.failedReason)
                              }
                            >
                              summary
                            </a>
                          )}
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
        isOpen={show}
        size="lg"
        style={{ marginTop: "-6rem" }}
      >
        <ModalHeader toggle={toggleModal}>
          <span>Passed Summary</span>
        </ModalHeader>
        <ModalBody>
          <div className="table-full-width table-responsive p-3">
            <FormGroup>
              <Input
                id="checkList1"
                type="checkbox"
                className="mt-2 pointer"
                disabled
                defaultChecked={"true" === selected.answer1}
              />
              <Label
                for="checkList1"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Is the user eligible to adapt a pet?
              </Label>
            </FormGroup>

            <FormGroup>
              <Input
                type="checkbox"
                className="mt-2 pointer"
                id="checkList2"
                disabled
                defaultChecked={"true" === selected.answer2}
              />
              <Label
                check
                for="checkList2"
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Is the user has valid i.d?
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                type="checkbox"
                className="mt-2 pointer"
                id="checkList3"
                disabled
                defaultChecked={"true" === selected.answer3}
              />
              <Label
                check
                for="checkList3"
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Is the user has job or finacially stable?
              </Label>
            </FormGroup>

            <FormGroup>
              <Input
                type="checkbox"
                className="mt-2 pointer"
                id="checkList4"
                disabled
                defaultChecked={"true" === selected.answer4}
              />
              <Label
                check
                for="checkList4"
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Is it safe for the pet to live with him/her place?
              </Label>
            </FormGroup>

            <FormGroup>
              <Input
                type="checkbox"
                className="mt-2 pointer"
                id="checkList5"
                disabled
                defaultChecked={"true" === selected.answer5}
              />
              <Label
                check
                for="checkList5"
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Has the adopte ever owned a pet before?
              </Label>
            </FormGroup>

            <FormGroup>
              <Input
                type="checkbox"
                className="mt-2 pointer"
                id="checkList6"
                disabled
                defaultChecked={"true" === selected.answer6}
              />
              <Label
                check
                for="checkList6"
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                If she/he is renting a property, is she/he provided the
                building's pet policy?
              </Label>
            </FormGroup>

            <FormGroup>
              <Input
                type="checkbox"
                className="mt-2 pointer"
                id="checkList7"
                disabled
                defaultChecked={"true" === selected.answer7}
              />
              <Label
                check
                for="checkList7"
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Is he/she understand the responsibility of adopting a life?
              </Label>
            </FormGroup>

            <FormGroup>
              <Input
                type="checkbox"
                className="mt-2 pointer"
                id="checkList8"
                defaultChecked={"true" === selected.answer8}
                disabled
              />
              <Label
                check
                for="checkList8"
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Is he/she comitted to taking thier animal to get a checkup once
                a month?
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                type="checkbox"
                className="mt-2 pointer"
                id="checkList9"
                disabled
                defaultChecked={"true" === selected.answer9}
              />
              <Label
                check
                for="checkList9"
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                If the user understand emergency situations about the adopted
                pet
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                type="checkbox"
                className="mt-2 pointer"
                id="checkList10"
                disabled
                defaultChecked={"true" === selected.answer10}
              />
              <Label
                for="checkList10"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Adoptees must understand tht all donations are non
                refundable/transferable under any circumstances
              </Label>
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default Appointments;
