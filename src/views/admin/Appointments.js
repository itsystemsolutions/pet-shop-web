import { useEffect, useState } from "react";
import { useHistory } from "react-router";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Button,
  Badge,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Label,
} from "reactstrap";

// Alert Dialogs
import Swal from "sweetalert2";

const axios = require("axios").default;

function Appointments() {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [checlist1, setCheckList1] = useState(false);
  const [checlist2, setCheckList2] = useState(false);
  const [checlist3, setCheckList3] = useState(false);
  const [checlist4, setCheckList4] = useState(false);
  const [checlist5, setCheckList5] = useState(false);
  const [checlist6, setCheckList6] = useState(false);
  const [checlist7, setCheckList7] = useState(false);
  const [checlist8, setCheckList8] = useState(false);
  const [checlist9, setCheckList9] = useState(false);
  const [checlist10, setCheckList10] = useState(false);

  const toggleModal = () => setShow(!show);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/schedule/for-interview")
      .then(response => {
        setData(response.data);
      });
  }, []);

  const handleApproveAppointment = (e, data) => {
    e.preventDefault();

    toggleModal();

    // axios
    //   .put(
    //     process.env.REACT_APP_API_URL +
    //       "/schedule/" +
    //       data.id +
    //       "?decision=PASSED"
    //   )
    //   .then(() => {
    //     Swal.fire({
    //       icon: "success",
    //       title: `SUCCESS! `,
    //       text: `Record approved! We will redirect you now to PICK-UP form`,
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         history.push(`/admin/pick-up/${data.userId}/${data.petCode}`);
    //       }
    //     });
    //   });
  };

  const handleDenyAppointment = (e, id) => {
    e.preventDefault();

    axios
      .put(
        process.env.REACT_APP_API_URL + "/schedule/" + id + "?decision=FAILED"
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

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <CardHeader>
          <CardTitle as="h4">Admin Interviews</CardTitle>
          <p className="card-category">List of interviews</p>
        </CardHeader>
        <CardBody className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Name</th>
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
              {data.map(entry => {
                return (
                  <tr>
                    <td>{entry.name}</td>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/pets/${entry.petCode}.jpg`}
                        alt=""
                        height={110}
                        className="mb-3"
                      />
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
                      {entry.status !== "WAITING" ? (
                        <Badge className="bg-info text-white">
                          {entry.status}
                        </Badge>
                      ) : (
                        <>
                          <Button
                            className="btn btn-success mr-2"
                            onClick={e => handleApproveAppointment(e, entry.id)}
                          >
                            PASSED
                          </Button>

                          <Button
                            className="btn btn-danger"
                            onClick={e => handleDenyAppointment(e, entry.id)}
                          >
                            FAILED
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Modal className="pb-5" isOpen={show} size="lg">
        <ModalHeader toggle={toggleModal}>
          <span>Passed Checklist</span>
        </ModalHeader>
        <ModalBody>
          <div className="table-full-width table-responsive p-3">
            <FormGroup>
              <Input
                id="checkList1"
                type="checkbox"
                className="mt-2 pointer"
                onChange={e => setCheckList1(e.target.checked)}
              />
              <Label
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
                onChange={e => setCheckList2(e.target.checked)}
              />
              <Label
                check
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
                onChange={e => setCheckList3(e.target.checked)}
              />
              <Label
                check
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
                onChange={e => setCheckList4(e.target.checked)}
              />
              <Label
                check
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
                onChange={e => setCheckList5(e.target.checked)}
              />
              <Label
                check
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
                onChange={e => setCheckList6(e.target.checked)}
              />
              <Label
                check
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
                onChange={e => setCheckList7(e.target.checked)}
              />
              <Label
                check
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
                onChange={e => setCheckList8(e.target.checked)}
              />
              <Label
                check
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
                onChange={e => setCheckList9(e.target.checked)}
              />
              <Label
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Is he/she
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                type="checkbox"
                className="mt-2 pointer"
                id="checkList10"
                onChange={e => setCheckList10(e.target.checked)}
              />
              <Label
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Is he/she
              </Label>
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={toggleModal}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default Appointments;
