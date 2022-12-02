import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Button,
  Badge,
  CardHeader,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  FormGroup,
  ModalHeader,
  ModalFooter,
  Spinner,
} from "reactstrap";

import Swal from "sweetalert2";
const axios = require("axios").default;

function MissingPets() {
  const [data, setData] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const [approveModal, setApproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);

  const [activeTab, setActiveTab] = useState("1");
  const history = useHistory();

  const [checklist1, setCheckList1] = useState(false);
  const [checklist2, setCheckList2] = useState(false);
  const [checklist3, setCheckList3] = useState(false);
  const [checklist4, setCheckList4] = useState(false);
  const [checklist5, setCheckList5] = useState(false);

  const [checklist1Decline, setCheckList1Decline] = useState(false);
  const [checklist2Decline, setCheckList2Decline] = useState(false);
  const [checklist3Decline, setCheckList3Decline] = useState(false);
  const [checklist4Decline, setCheckList4Decline] = useState(false);
  const [checklist5Decline, setCheckList5Decline] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isMissingPetFound, setIsMissingPetFound] = useState(false);
  const [selectedPetCode, setSelectedPetCode] = useState();
  const [selectedUserId, setSelectedUserId] = useState();
  const [selectedCheckList, setSelectedCheckList] = useState({
    checklist1: false,
    checklist2: false,
    checklist3: false,
    checklist4: false,
    checklist5: false,
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/pets/missing")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const toggleApproveModal = () => setApproveModal(!approveModal);
  const toggleDeclineModal = () => setDeclineModal(!declineModal);

  const toggleShowApproveModal = () => setShowApproveModal(!showApproveModal);
  const toggleShowDeclineModal = () => setShowDeclineModal(!showDeclineModal);

  const handleApproveFound = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios
      .put(process.env.REACT_APP_API_URL + "/pets/approve/" + selectedPetCode, {
        checklist1: checklist1,
        checklist2: checklist2,
        checklist3: checklist3,
        checklist4: checklist4,
        checklist5: checklist5,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `SUCCESS! `,
          text: `Record approved! We'll redirect you to schedule interview`,
          allowOutsideClick: false,
        }).then((result) => {
          console.log(result.isConfirmed);
          if (result.isConfirmed) {
            history.push(`/admin/zoom/${selectedUserId}/${selectedPetCode}`);
          }
        });
      });
  };

  const handleDeclineModal = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios
      .put(process.env.REACT_APP_API_URL + "/pets/decline/" + selectedPetCode, {
        checklist1: checklist1Decline,
        checklist2: checklist2Decline,
        checklist3: checklist3Decline,
        checklist4: checklist4Decline,
        checklist5: checklist5Decline,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `SUCCESS! `,
          text: `Record Decline!`,
          allowOutsideClick: false,
        }).then((result) => {
          console.log(result.isConfirmed);
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      });
  };

  const handleApprove = (e, entry, isForApprove) => {
    e.preventDefault();

    if (isForApprove) {
      if (entry.missingType === "FOUND") {
        setIsMissingPetFound(true);
      } else {
        setIsMissingPetFound(false);
      }
      toggleApproveModal();
    } else {
      toggleDeclineModal();
    }

    setSelectedUserId(entry.user.id);
    setSelectedPetCode(entry.petCode);
  };

  const handleDeclineFound = (e, petCode) => {
    e.preventDefault();

    Swal.fire({
      title: "Please type your reason?",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return axios
          .put(
            process.env.REACT_APP_API_URL +
              "/pets/decline/found/" +
              petCode +
              "?reason=" +
              login
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: `SUCCESS! `,
              text: `Record is updated!`,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <CardHeader>
          <CardTitle as="h4">Missing Pets for Approval</CardTitle>
        </CardHeader>
        <CardBody className="table-full-width table-responsive">
          <Nav tabs>
            <NavItem className="pointer">
              <NavLink
                className={activeTab === "1" && "active"}
                onClick={(e) => setActiveTab("1")}
              >
                All
              </NavLink>
            </NavItem>
            <NavItem className="pointer">
              <NavLink
                className={activeTab === "2" && "active"}
                onClick={(e) => setActiveTab("2")}
              >
                Missing
              </NavLink>
            </NavItem>
            <NavItem className="pointer">
              <NavLink
                className={activeTab === "3" && "active"}
                onClick={(e) => setActiveTab("3")}
              >
                Found
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">Image</th>
                    <th className="border-0">User</th>
                    <th className="border-0">Pet Code</th>
                    <th className="border-0">Gender</th>
                    <th className="border-0">Breed</th>
                    <th className="border-0">Description</th>
                    <th className="border-0">Last Seen</th>
                    <th className="border-0">Report</th>
                    <th className="border-0">Approve ?</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((entry) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_API_URL}/images/pets/${entry.petCode}.jpg`}
                            alt=""
                            height={110}
                            className="mb-3"
                          />
                        </td>
                        <td>
                          <p>Name: {entry.user.name}</p>
                          <p>Email: {entry.user.email}</p>
                          <p>Mobile: {entry.user.mobile}</p>
                        </td>
                        <td>{entry.petCode}</td>
                        <td>{entry.gender}</td>
                        <td>{entry.breed}</td>
                        <td>{entry.description}</td>
                        <td>{entry.lastSeen}</td>
                        <td>{entry.missingType}</td>
                        <td>
                          {entry.approvalStatus !== "PENDING" ? (
                            <>
                              <div className="d-flex flex-column">
                                <div>
                                  <Badge
                                    color={`${
                                      entry.approvalStatus === "APPROVED"
                                        ? "success"
                                        : "danger"
                                    }`}
                                  >
                                    {entry.approvalStatus}
                                  </Badge>
                                </div>
                                <br />
                                <div>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      if (entry.approvalStatus === "APPROVED") {
                                        if (entry.missingType === "FOUND") {
                                          setIsMissingPetFound(false);
                                        } else {
                                          setIsMissingPetFound(true);
                                        }

                                        toggleShowApproveModal();
                                        setSelectedCheckList(
                                          entry.approvedChecklist
                                        );
                                      } else {
                                        if (entry.missingType === "FOUND") {
                                          toggleShowDeclineModal();
                                        } else {
                                        }

                                        setSelectedCheckList(
                                          entry.declineChecklist
                                        );
                                      }
                                    }}
                                  >
                                    {!entry.declineReason && "Show Checklist"}
                                  </a>
                                  {entry.approvalStatus !== "APPROVED" &&
                                    entry.missingType === "MISSING" &&
                                    "Reason: " + entry.declineReason}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <Button
                                className="btn btn-success mr-2"
                                onClick={(e) => handleApprove(e, entry, true)}
                              >
                                APPROVE
                              </Button>
                              <Button
                                className="btn btn-danger"
                                onClick={(e) => {
                                  if (entry.missingType === "MISSING") {
                                    handleDeclineFound(e, entry.petCode);
                                  } else {
                                    handleApprove(e, entry, false);
                                  }
                                }}
                              >
                                DECLINE
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </TabPane>

            <TabPane tabId="2">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">Image</th>
                    <th className="border-0">User</th>
                    <th className="border-0">Pet Code</th>
                    <th className="border-0">Gender</th>
                    <th className="border-0">Breed</th>
                    <th className="border-0">Description</th>
                    <th className="border-0">Last Seen</th>
                    <th className="border-0">Approve ?</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter(function (entry) {
                      return entry.missingType === "MISSING";
                    })
                    .map((entry) => {
                      return (
                        <tr>
                          <td>
                            <img
                              src={`${process.env.REACT_APP_API_URL}/images/pets/${entry.petCode}.jpg`}
                              alt=""
                              height={110}
                              className="mb-3"
                            />
                          </td>
                          <td>
                            <p>Name: {entry.user.name}</p>
                            <p>Email: {entry.user.email}</p>
                            <p>Mobile: {entry.user.mobile}</p>
                          </td>
                          <td>{entry.petCode}</td>
                          <td>{entry.gender}</td>
                          <td>{entry.breed}</td>
                          <td>{entry.description}</td>
                          <td>{entry.lastSeen}</td>
                          <td>
                            {entry.approvalStatus !== "PENDING" ? (
                              <>
                                <div className="d-flex flex-column">
                                  <div>
                                    <Badge
                                      color={`${
                                        entry.approvalStatus === "APPROVED"
                                          ? "success"
                                          : "danger"
                                      }`}
                                    >
                                      {entry.approvalStatus}
                                    </Badge>
                                  </div>
                                  <br />
                                  <div>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        if (
                                          entry.approvalStatus === "APPROVED"
                                        ) {
                                          if (entry.missingType === "MISSING") {
                                            setIsMissingPetFound(false);
                                          } else {
                                            setIsMissingPetFound(true);
                                          }

                                          toggleShowApproveModal();
                                          setSelectedCheckList(
                                            entry.approvedChecklist
                                          );
                                        } else {
                                          if (entry.missingType === "MISSING") {
                                            toggleShowDeclineModal();
                                          } else {
                                          }

                                          setSelectedCheckList(
                                            entry.declineChecklist
                                          );
                                        }
                                      }}
                                    >
                                      {entry.approvalStatus === "MISSING" &&
                                      entry.missingType === "FOUND"
                                        ? ""
                                        : "Show Checklist"}
                                    </a>
                                    {entry.approvalStatus !== "APPROVED" &&
                                      entry.missingType === "FOUND" &&
                                      "Reason: " + entry.declineReason}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <Button
                                  className="btn btn-success mr-2"
                                  onClick={(e) => handleApprove(e, entry, true)}
                                >
                                  APPROVE
                                </Button>
                                <Button
                                  className="btn btn-danger"
                                  onClick={(e) => {
                                    if (entry.missingType === "FOUND") {
                                      handleDeclineFound(e, entry.petCode);
                                    } else {
                                      handleApprove(e, entry, false);
                                    }
                                  }}
                                >
                                  DECLINE
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </TabPane>
            <TabPane tabId="3">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">Image</th>
                    <th className="border-0">User</th>
                    <th className="border-0">Pet Code</th>
                    <th className="border-0">Gender</th>
                    <th className="border-0">Breed</th>
                    <th className="border-0">Description</th>
                    <th className="border-0">Last Seen</th>
                    <th className="border-0">Approve ?</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter(function (entry) {
                      return entry.missingType === "FOUND";
                    })
                    .map((entry) => {
                      return (
                        <tr>
                          <td>
                            <img
                              src={`${process.env.REACT_APP_API_URL}/images/pets/${entry.petCode}.jpg`}
                              alt=""
                              height={110}
                              className="mb-3"
                            />
                          </td>
                          <td>
                            <p>Name: {entry.user.name}</p>
                            <p>Email: {entry.user.email}</p>
                            <p>Mobile: {entry.user.mobile}</p>
                          </td>
                          <td>{entry.petCode}</td>
                          <td>{entry.gender}</td>
                          <td>{entry.breed}</td>
                          <td>{entry.description}</td>
                          <td>{entry.lastSeen}</td>
                          <td>
                            {entry.approvalStatus !== "PENDING" ? (
                              <>
                                <div className="d-flex flex-column">
                                  <div>
                                    <Badge
                                      color={`${
                                        entry.approvalStatus === "APPROVED"
                                          ? "success"
                                          : "danger"
                                      }`}
                                    >
                                      {entry.approvalStatus}
                                    </Badge>
                                  </div>
                                  <br />
                                  <div>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        if (
                                          entry.approvalStatus === "APPROVED"
                                        ) {
                                          if (entry.missingType === "MISSING") {
                                            setIsMissingPetFound(false);
                                          } else {
                                            setIsMissingPetFound(true);
                                          }

                                          toggleShowApproveModal();
                                          setSelectedCheckList(
                                            entry.approvedChecklist
                                          );
                                        } else {
                                          if (entry.missingType === "MISSING") {
                                            toggleShowDeclineModal();
                                          } else {
                                          }

                                          setSelectedCheckList(
                                            entry.declineChecklist
                                          );
                                        }
                                      }}
                                    >
                                      {entry.approvalStatus === "MISSING" &&
                                      entry.missingType === "FOUND"
                                        ? ""
                                        : "Show Checklist"}
                                    </a>
                                    {entry.approvalStatus !== "APPROVED" &&
                                      entry.missingType === "FOUND" &&
                                      "Reason: " + entry.declineReason}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <Button
                                  className="btn btn-success mr-2"
                                  onClick={(e) => handleApprove(e, entry, true)}
                                >
                                  APPROVE
                                </Button>
                                <Button
                                  className="btn btn-danger"
                                  onClick={(e) => {
                                    if (entry.missingType === "FOUND") {
                                      handleDeclineFound(e, entry.petCode);
                                    } else {
                                      handleApprove(e, entry, false);
                                    }
                                  }}
                                >
                                  DECLINE
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>

      <Modal
        className="pb-5"
        isOpen={approveModal}
        toggle={toggleApproveModal}
        scrollable={true}
        size="lg"
        style={{ transform: "translate(0, 0%)" }}
      >
        <ModalHeader toggle={toggleApproveModal}>
          <span>Approve Checklist</span>
        </ModalHeader>
        <ModalBody>
          <div className="table-full-width table-responsive p-3">
            <FormGroup>
              <Input
                id="checkList1"
                type="checkbox"
                className="mt-2 pointer"
                onChange={(e) => setCheckList1(e.target.checked)}
              />
              <Label
                for="checkList1"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                {!isMissingPetFound
                  ? "Is the reported pet currently held in this shelter?"
                  : "Is the report accurate?"}
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList2"
                type="checkbox"
                className="mt-2 pointer"
                onChange={(e) => setCheckList2(e.target.checked)}
              />
              <Label
                for="checkList2"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                {!isMissingPetFound
                  ? "Is the said report accurate with all of the information provided?"
                  : "The shelter has confirmed the information provided."}
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList3"
                type="checkbox"
                className="mt-2 pointer"
                onChange={(e) => setCheckList3(e.target.checked)}
              />
              <Label
                for="checkList3"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Did the shelter/administrator contact the mentioned reporter for
                confirmation?
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList4"
                type="checkbox"
                className="mt-2 pointer"
                onChange={(e) => setCheckList4(e.target.checked)}
              />
              <Label
                for="checkList4"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                {!isMissingPetFound
                  ? "Is this person the rightful owner of the lost pet?"
                  : "Did the rescuer verify the reported claim from the shelter?"}
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList5"
                type="checkbox"
                className="mt-2 pointer"
                onChange={(e) => setCheckList5(e.target.checked)}
              />
              <Label
                for="checkList5"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                {!isMissingPetFound
                  ? "Is the person cooperative and informed for the interview?"
                  : "Is it possible for the volunteer to save the aforementioned report?"}
              </Label>
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggleApproveModal}>
            Close
          </Button>
          {isLoading ? (
            <Spinner>Loading...</Spinner>
          ) : (
            <Button color="info" onClick={handleApproveFound}>
              Submit
            </Button>
          )}
        </ModalFooter>
      </Modal>

      <Modal
        className="pb-5"
        isOpen={declineModal}
        toggle={toggleDeclineModal}
        scrollable={true}
        size="lg"
        style={{ transform: "translate(0, 0%)" }}
      >
        <ModalHeader toggle={toggleDeclineModal}>Decline Checklist</ModalHeader>
        <ModalBody>
          <div className="table-full-width table-responsive p-3">
            <FormGroup>
              <Input
                id="checkList1"
                type="checkbox"
                className="mt-2 pointer"
                onChange={(e) => setCheckList1Decline(e.target.checked)}
              />
              <Label
                for="checkList1"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                This is a false report.
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList2"
                type="checkbox"
                className="mt-2 pointer"
                onChange={(e) => setCheckList2Decline(e.target.checked)}
              />
              <Label
                for="checkList2"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                This report is already reported
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList3"
                type="checkbox"
                className="mt-2 pointer"
                onChange={(e) => setCheckList3Decline(e.target.checked)}
              />
              <Label
                for="checkList3"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                The shelter has already rescued this report
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList4"
                type="checkbox"
                className="mt-2 pointer"
                onChange={(e) => setCheckList4Decline(e.target.checked)}
              />
              <Label
                for="checkList4"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                The user does not confirm or coordinate with the shelter.
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList5"
                type="checkbox"
                className="mt-2 pointer"
                onChange={(e) => setCheckList5Decline(e.target.checked)}
              />
              <Label
                for="checkList5"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                The report does not cover the city or the surrounding area
              </Label>
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggleDeclineModal}>
            Close
          </Button>
          {isLoading ? (
            <Spinner>Loading...</Spinner>
          ) : (
            <Button color="info" onClick={handleDeclineModal}>
              Submit
            </Button>
          )}
        </ModalFooter>
      </Modal>

      {/* SHOW MODALS */}
      <Modal
        className="pb-5"
        isOpen={showApproveModal}
        toggle={toggleShowApproveModal}
        scrollable={true}
        size="lg"
        style={{ transform: "translate(0, 0%)" }}
      >
        <ModalHeader toggle={toggleShowApproveModal}>
          <span>Approved Checklist</span>
        </ModalHeader>
        <ModalBody>
          <div className="table-full-width table-responsive p-3">
            <FormGroup>
              <Input
                id="checkList1"
                type="checkbox"
                className="mt-2 pointer"
                defaultChecked={selectedCheckList.checklist1}
                disabled
              />
              <Label
                for="checkList1"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                {isMissingPetFound
                  ? "Is the reported pet currently held in this shelter?"
                  : "Is the report accurate?"}
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList2"
                type="checkbox"
                className="mt-2 pointer"
                defaultChecked={selectedCheckList.checklist2}
                disabled
              />
              <Label
                for="checkList2"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                {isMissingPetFound
                  ? "Is the said report accurate with all of the information provided?"
                  : "The shelter has confirmed the information provided."}
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList3"
                type="checkbox"
                className="mt-2 pointer"
                defaultChecked={selectedCheckList.checklist3}
                disabled
              />
              <Label
                for="checkList3"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                Did the shelter/administrator contact the mentioned reporter for
                confirmation?
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList4"
                type="checkbox"
                className="mt-2 pointer"
                defaultChecked={selectedCheckList.checklist4}
                disabled
              />
              <Label
                for="checkList4"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                {isMissingPetFound
                  ? "Is this person the rightful owner of the lost pet?"
                  : "Did the rescuer verify the reported claim from the shelter?"}
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList5"
                type="checkbox"
                className="mt-2 pointer"
                defaultChecked={selectedCheckList.checklist5}
                disabled
              />
              <Label
                for="checkList5"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                {isMissingPetFound
                  ? "Is the person cooperative and informed for the interview?"
                  : "Is it possible for the volunteer to save the aforementioned report?"}
              </Label>
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggleShowApproveModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        className="pb-5"
        isOpen={showDeclineModal}
        toggle={toggleShowDeclineModal}
        scrollable={true}
        size="lg"
        style={{ transform: "translate(0, 0%)" }}
      >
        <ModalHeader toggle={toggleShowDeclineModal}>
          Decline Checklist
        </ModalHeader>
        <ModalBody>
          <div className="table-full-width table-responsive p-3">
            <FormGroup>
              <Input
                id="checkList1"
                type="checkbox"
                className="mt-2 pointer"
                defaultChecked={selectedCheckList.checklist1}
                disabled
              />
              <Label
                for="checkList1"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                This is a false report.
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList2"
                type="checkbox"
                className="mt-2 pointer"
                defaultChecked={selectedCheckList.checklist2}
                disabled
              />
              <Label
                for="checkList2"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                This report is already reported
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList3"
                type="checkbox"
                className="mt-2 pointer"
                defaultChecked={selectedCheckList.checklist3}
                disabled
              />
              <Label
                for="checkList3"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                The shelter has already rescued this report
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList4"
                type="checkbox"
                className="mt-2 pointer"
                defaultChecked={selectedCheckList.checklist4}
                disabled
              />
              <Label
                for="checkList4"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                The user does not confirm or coordinate with the shelter.
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="checkList5"
                type="checkbox"
                className="mt-2 pointer"
                defaultChecked={selectedCheckList.checklist5}
                disabled
              />
              <Label
                for="checkList5"
                check
                className="font-weight-bold"
                style={{ fontSize: 18 }}
              >
                The report does not cover the city or the surrounding area
              </Label>
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggleShowDeclineModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default MissingPets;
