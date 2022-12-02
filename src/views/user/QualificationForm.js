import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

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
  Label,
} from "reactstrap";

import { Card } from "react-bootstrap";

// axios API library
const axios = require("axios").default;

function QualificationForm() {
  let { code } = useParams();
  const history = useHistory();

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [answer5, setAnswer5] = useState("");
  const [answer6, setAnswer6] = useState("");
  const [answer7, setAnswer7] = useState("");
  const [answer8, setAnswer8] = useState("");
  const [answer9, setAnswer9] = useState("");
  const [answer10, setAnswer10] = useState("");
  const [answer11, setAnswer11] = useState("");
  const [answer12, setAnswer12] = useState("");
  const [answer13, setAnswer13] = useState("");
  const [answer14, setAnswer14] = useState("");
  const [answer15, setAnswer15] = useState("");
  const [answer16, setAnswer16] = useState("");
  const [answer17, setAnswer17] = useState("");
  const [answer18, setAnswer18] = useState("");
  const [answer19, setAnswer19] = useState("");
  const [answer20, setAnswer20] = useState("");

  const [q1Other, setQ1Other] = useState("");
  const [showQ1_other, setShowQ1_other] = useState(false);

  const [q3Other, setQ3Other] = useState("");
  const [showQ3_other, setShowQ3_other] = useState(false);

  const [q4Other, setQ4Other] = useState("");
  const [showQ4_other, setShowQ4_other] = useState(false);

  const [q5Other, setQ5Other] = useState("");
  const [showQ5_other, setShowQ5_other] = useState(false);

  const [q9Other, setQ9Other] = useState("");
  const [showQ9_other, setShowQ9_other] = useState(false);

  const [q11Other, setQ11Other] = useState("");
  const [showQ11_other, setShowQ11_other] = useState(false);

  const [showQ14_other, setShowQ14_other] = useState(false);

  const [q20Other, setQ20Other] = useState("");
  const [showQ20_other, setShowQ20_other] = useState(false);

  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/user/info?id=" +
          localStorage.getItem("user_id")
      )
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_API_URL + "/adopt-form", {
        userId: localStorage.getItem("user_id"),
        validIdUrl: "URL",
        petCode: code,
        formAnswer: {
          answer1: answer1,
          answer2: answer2,
          answer3: answer3,
          answer4: answer4,
          answer5: answer5,
          answer6: answer6,
          answer7: answer7,
          answer8: answer8,
          answer9: answer9,
          answer10: answer10,
          answer11: answer11,
          answer12: answer12,
          answer13: answer13,
          answer14: answer14,
          answer15: answer15,
          answer16: answer16,
          answer17: answer17,
          answer18: answer18,
          answer19: answer19,
          answer20: answer20,

          q1OtherAnswer: q1Other,
          q3OtherAnswer: q3Other,
          q4OtherAnswer: q4Other,
          q5OtherAnswer: q5Other,
          q9OtherAnswer: q9Other,
          q11OtherAnswer: q11Other,
          q20OtherAnswer: q20Other,
        },
      })
      .then((response) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("code", code);

        axios
          .put(
            process.env.REACT_APP_API_URL + `/adopt-form/upload/image`,
            formData
          )
          .catch((error) => {
            console.log(error);
          });

        if (response.data >= 14) {
          Swal.fire({
            icon: "success",
            title: "Congratulations you passed the exam!",
            text: `Your score is ${response.data}`,
            confirmButtonText: "Check EligiblePets",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/user/eligible-pets");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: `Oh no! You have not react the assesment passing grade`,
            text: `Your score was ${response.data}`,
            confirmButtonText: "Try again",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/user/adoptpet");
            }
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Oops...",
          title: "Something went wrong!",
        });
      });
  };

  const date = new Date();
  const defaultValue = date.toLocaleDateString("en-CA");

  return (
    <Container className="my-5">
      <Card>
        <CardHeader>
          <h3 className="text-center">PERSONAL INFORMATIONS</h3>
          <Col md="12">
            <Row>
              <Col md={4}>
                <FormGroup className="ml-2">
                  <Label for="Name">Name</Label>
                  <Input
                    placeholder="Name"
                    type="text"
                    defaultValue={data.name}
                    required
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup className="ml-2">
                  <Label for="Name">Age</Label>
                  <Input
                    placeholder="Name"
                    type="text"
                    defaultValue={data.age}
                    required
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup className="ml-2">
                  <Label for="Date">Date</Label>
                  <Input
                    placeholder="Date"
                    type="date"
                    defaultValue={defaultValue}
                    required
                    disabled
                    onChange={(e) => setDate(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup className="ml-2">
                  <Label for="Email">Address</Label>
                  <Input
                    placeholder="Email"
                    type="text"
                    defaultValue={data.address}
                    required
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup className="ml-2">
                  <Label for="Email">Email</Label>
                  <Input
                    placeholder="Email"
                    type="text"
                    defaultValue={data.email}
                    required
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup className="ml-2">
                  <Label for="mobile">Mobile Number</Label>
                  <Input
                    placeholder="09XX-XXX-XXXX"
                    type="number"
                    pattern="[0-9]"
                    required
                    disabled
                    defaultValue={data.mobile}
                    maxLength={11}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup className="ml-2">
                  <Label for="Occupation">Occupation</Label>
                  <Input
                    placeholder="Occupation"
                    type="text"
                    disabled
                    autoComplete="Occupation"
                    defaultValue={data.occupation}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup className="ml-2">
                  <Label for="FB/IG/TWITTER">FB/IG/TWITTER</Label>
                  <Input
                    placeholder="FB/IG/TWITTER"
                    type="text"
                    autoComplete="FB/IG/TWITTER"
                    defaultValue={data.social}
                    required
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={4} style={{ flexBasis: "min-content" }}>
                <Label for="residensy">Valid Id</Label>
                <img
                  src={`${process.env.REACT_APP_API_URL}/images/valid-id/${data.username}.jpg`}
                  alt="example"
                  height={150}
                />
              </Col>
            </Row>
            <h4 className="text-center">
              QUESTIONAIRE (passsing score - 75% above)
            </h4>
          </Col>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row className="ml-4">
              <Col md={12} className="font-weight-bold">
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
                        required
                        onChange={() => {
                          setAnswer1("FRIENDS");
                          setShowQ1_other(false);
                        }}
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
                        required
                        onChange={() => {
                          setAnswer1("MYSELF");
                          setShowQ1_other(false);
                        }}
                      />
                      Myself
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="radio"
                        required
                        onChange={() => {
                          setAnswer1("FAMILY");
                          setShowQ1_other(false);
                        }}
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
                        onChange={() => {
                          setAnswer1("OTHER");
                          setShowQ1_other(true);
                        }}
                      />
                      Other
                    </FormGroup>
                  </Col>
                </Row>
                {showQ1_other ? (
                  <Col md={4}>
                    -others/explain if necessary
                    <Input
                      required={showQ11_other}
                      style={{ cursor: "pointer" }}
                      onChange={(e) => setQ1Other(e.target.value)}
                      name="question1"
                      type="textbox"
                    />
                  </Col>
                ) : null}
              </Col>

              <Col md={12} className="font-weight-bold">
                2. Are there children below 18 yrs old in the house?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question2"
                        required
                        type="radio"
                        onChange={() => setAnswer2("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question2"
                        required
                        type="radio"
                        onChange={() => setAnswer2("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                3. Do you have other pets?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question3"
                        type="radio"
                        required
                        onChange={() => {
                          setShowQ3_other(true);
                          setAnswer3("YES");
                        }}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question3"
                        required
                        onChange={() => {
                          setShowQ3_other(false);
                          setAnswer3("NO");
                        }}
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
                {showQ3_other ? (
                  <Col md={4}>
                    -if YES tell us about
                    <Input
                      required={showQ3_other}
                      style={{ cursor: "pointer" }}
                      name="question3"
                      type="textbox"
                      onChange={(e) => setQ3Other(e.target.value)}
                    />
                  </Col>
                ) : null}
              </Col>

              <Col md={12} className="font-weight-bold">
                4. Who else do you live with?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question4"
                        required
                        onChange={() => {
                          setShowQ4_other(false);
                          setAnswer4("SPOUSE");
                        }}
                        type="radio"
                      />
                      Spouse
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question4"
                        required
                        type="radio"
                        onChange={() => {
                          setShowQ4_other(false);
                          setAnswer4("PARENTS");
                        }}
                      />
                      Parents
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question4"
                        required
                        type="radio"
                        onChange={() => {
                          setShowQ4_other(false);
                          setAnswer4("ROOMMATES");
                        }}
                      />
                      Roommates
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question4"
                        type="radio"
                        onChange={() => {
                          setShowQ4_other(true);
                          setAnswer4("OTHER");
                        }}
                      />
                      Other
                    </FormGroup>
                  </Col>
                </Row>
                {showQ4_other ? (
                  <Col md={4}>
                    -others
                    <Input
                      required={showQ4_other}
                      style={{ cursor: "pointer" }}
                      name="question1"
                      type="textbox"
                      onChange={(e) => setQ4Other(e.target.value)}
                    />
                  </Col>
                ) : null}
              </Col>

              <Col md={12} className="font-weight-bold">
                5. Are there any members of your household allergic to animals?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question5"
                        type="radio"
                        required
                        onChange={() => {
                          setShowQ5_other(true);
                          setAnswer5("YES");
                        }}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question5"
                        required
                        type="radio"
                        onChange={() => {
                          setShowQ5_other(false);
                          setAnswer5("NO");
                        }}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
                {showQ5_other ? (
                  <Col md={4}>
                    -if yes, how it will be manage?
                    <Input
                      required={showQ5_other}
                      style={{ cursor: "pointer" }}
                      name="question5"
                      type="textbox"
                      onChange={(e) => setQ5Other(e.target.value)}
                    />
                  </Col>
                ) : null}
              </Col>

              <Col md={12} className="font-weight-bold">
                6. Have you had pets in the past?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question6"
                        required
                        type="radio"
                        onChange={() => setAnswer6("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question6"
                        required
                        type="radio"
                        onChange={() => setAnswer6("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                7. Who will be financially responsible for your pet’s needs
                (i,e.. food, vet bills, etc.)?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question7"
                        required
                        type="radio"
                        onChange={() => setAnswer7("MYSELF")}
                      />
                      Myself
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question7"
                        required
                        type="radio"
                        onChange={() => setAnswer7("FAMILY")}
                      />
                      Family
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question7"
                        required
                        onChange={() => setAnswer7("FRIENDS")}
                        type="radio"
                      />
                      Friends
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                8. Who will be looking after your pet if you go on vacation or
                in case of emergency?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question8"
                        required
                        type="radio"
                        onChange={() => setAnswer8("MYSELF")}
                      />
                      Myself
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question8"
                        required
                        type="radio"
                        onChange={() => setAnswer8("FAMILY")}
                      />
                      Family
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question8"
                        required
                        type="radio"
                        onChange={() => setAnswer8("FRIENDS")}
                      />
                      Friends
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                9. How many hours in an average workday will your pet be left
                alone?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question9"
                        required
                        type="radio"
                        onChange={() => {
                          setShowQ9_other(false);
                          setAnswer9("8HRS");
                        }}
                      />
                      8 hours
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question9"
                        type="radio"
                        onChange={() => {
                          setShowQ9_other(false);
                          setAnswer9("9HRS");
                        }}
                      />
                      9 hours
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question9"
                        type="radio"
                        onChange={() => {
                          setShowQ9_other(false);
                          setAnswer9("10HRS");
                        }}
                      />
                      Above 10 hours
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question9"
                        type="radio"
                        onChange={() => {
                          setShowQ9_other(true);
                          setAnswer9("OTHER");
                        }}
                      />
                      Other
                    </FormGroup>
                  </Col>
                </Row>
                {showQ9_other ? (
                  <Col md={4}>
                    -others
                    <Input
                      required={showQ9_other}
                      style={{ cursor: "pointer" }}
                      name="question1"
                      type="textbox"
                      onChange={(e) => setQ9Other(e.target.value)}
                    />
                  </Col>
                ) : null}
              </Col>

              <Col md={12} className="font-weight-bold">
                10. Does everyone in the family support your decision to adopt a
                pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question10"
                        type="radio"
                        onChange={() => setAnswer10("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question10"
                        type="radio"
                        onChange={() => setAnswer10("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                11. What steps will you take to familiarize your pet with
                his/her new surroundings?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question11"
                        type="radio"
                        onChange={() => {
                          setShowQ11_other(false);
                          setAnswer11("PROPER_TRAINING");
                        }}
                      />
                      Proper Training
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question11"
                        type="radio"
                        onChange={() => {
                          setShowQ11_other(false);
                          setAnswer11("HOUSE_TOUR");
                        }}
                      />
                      House Tour
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question11"
                        type="radio"
                        onChange={() => {
                          setShowQ11_other(false);
                          setAnswer11("LET_THEM");
                        }}
                      />
                      Let Them Familiarize
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question11"
                        type="radio"
                        onChange={() => {
                          setShowQ11_other(true);
                          setAnswer11("OTHER");
                        }}
                      />
                      Other
                    </FormGroup>
                  </Col>
                </Row>
                {showQ11_other ? (
                  <Col md={4}>
                    -other
                    <Input
                      required={showQ11_other}
                      style={{ cursor: "pointer" }}
                      name="question1"
                      type="textbox"
                      onChange={(e) => setQ11Other(e.target.value)}
                    />
                  </Col>
                ) : null}
              </Col>

              <Col md={12} className="font-weight-bold">
                12. What type of building do you live in?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question12"
                        type="radio"
                        onChange={() => setAnswer12("HOUSE")}
                      />
                      House
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question12"
                        type="radio"
                        onChange={() => setAnswer12("APARTMENT")}
                      />
                      Apartment
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question12"
                        type="radio"
                        onChange={() => setAnswer12("CONDO")}
                      />
                      Condo
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                13. Do you rent?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question13"
                        type="radio"
                        onChange={() => {
                          setShowQ14_other(true);
                          setAnswer13("YES");
                          setAnswer14("YES");
                        }}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question13"
                        onChange={() => {
                          setShowQ14_other(false);
                          setAnswer13("NO");
                          setAnswer14("NO");
                        }}
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                14. If renting or living in a shared building, can you provide a
                copy of your building’s pet policy?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question14"
                        type="radio"
                        disabled
                        checked={answer13 === "YES"}
                        onChange={() => {
                          setShowQ14_other(true);
                          setAnswer14("YES");
                        }}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question14"
                        type="radio"
                        disabled
                        checked={answer13 === "NO"}
                        onChange={() => {
                          setShowQ14_other(false);
                          setAnswer14("NO");
                        }}
                      />
                      No
                    </FormGroup>
                  </Col>
                  {showQ14_other ? (
                    <Col md={4}>
                      <FormGroup check inline>
                        -if yes, please upload here.
                      </FormGroup>
                      <Input
                        required={showQ14_other}
                        style={{ cursor: "pointer" }}
                        name="question1"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </Col>
                  ) : null}
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                15. What happens to your pet if or when you move, will you take
                your pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question15"
                        type="radio"
                        onChange={() => setAnswer15("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question15"
                        type="radio"
                        onChange={() => setAnswer15("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                16. What kind of pet us right for you?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question16"
                        type="radio"
                        onChange={() => setAnswer16("RACIAL_PET")}
                      />
                      Racial Pet
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question16"
                        required
                        type="radio"
                        onChange={() => setAnswer16("NON_RACIAL_PET")}
                      />
                      Non-Racial Pet
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question16"
                        type="radio"
                        onChange={() => setAnswer16("NOT_A_BIG_DEAL")}
                      />
                      It’s not a big deal if pet has or doesn’t have a breed
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                17. Are you ready for long term commitment with your new pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question17"
                        type="radio"
                        onChange={() => setAnswer17("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question17"
                        type="radio"
                        onChange={() => setAnswer17("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                18. Can you afford to care for your pets healthy and safety?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question18"
                        type="radio"
                        onChange={() => setAnswer18("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question18"
                        type="radio"
                        onChange={() => setAnswer18("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                19. Do you have time for pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question19"
                        type="radio"
                        onChange={() => setAnswer19("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question19"
                        type="radio"
                        onChange={() => setAnswer19("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12} className="font-weight-bold">
                20. Are you willing to train your pet? How?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={4}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question20"
                        type="radio"
                        onChange={() => {
                          setAnswer20("HIRE_PROFESSIONAL");
                          setShowQ20_other(false);
                        }}
                      />
                      Hire Professional Trainer
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question20"
                        type="radio"
                        onChange={() => {
                          setAnswer20("WATCH_YOUTUBE");
                          setShowQ20_other(false);
                        }}
                      />
                      Watch Youtube Videos
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        required
                        name="question20"
                        type="radio"
                        onChange={() => {
                          setAnswer20("ASK_FRIENDS");
                          setShowQ20_other(false);
                        }}
                      />
                      Ask Help To Your Friends, Family etc.
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question20"
                        required
                        type="radio"
                        onChange={() => {
                          setAnswer20("OTHER");
                          setShowQ20_other(true);
                        }}
                      />
                      Other
                    </FormGroup>
                  </Col>
                </Row>
                {showQ20_other ? (
                  <Col md={4}>
                    -others,please explain
                    <Input
                      required={showQ20_other}
                      style={{ cursor: "pointer" }}
                      name="question1"
                      type="textbox"
                      onChange={(e) => setQ20Other(e.target.value)}
                    />
                  </Col>
                ) : null}
              </Col>

              <Button
                className="mt-2 font-italic"
                color="primary"
                type="submit"
                block
                style={{ cursor: "pointer" }}
              >
                Submit
              </Button>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default QualificationForm;
