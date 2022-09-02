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
  let { username } = useParams();
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [social, setSocial] = useState("");
  const [image, setImage] = useState("");

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
  const [q3Other, setQ3Other] = useState("");
  const [q4Other, setQ4Other] = useState("");
  const [q5Other, setQ5Other] = useState("");
  const [q9Other, setQ9Other] = useState("");
  const [q11Other, setQ11Other] = useState("");
  const [q20Other, setQ20Other] = useState("");

  useEffect(() => {
    axios.get("/user/data?username=" + username).then((response) => {
      setData(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("/user/qualification-form?username=" + username, {
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
      })
      .then((response) => {
        if (response.data > 12) {
          Swal.fire({
            icon: "success",
            title: "Congratulations you passed the exam!",
            text: `Your score is ${response.data}`,
            confirmButtonText: "Cool",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/auth/login");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            text: `Oh no! You have failed the assesment questions`,
            text: `Your score was ${response.data}`,
            confirmButtonText: "Confirm",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/auth/login");
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                  src={`http://localhost:8081/PETSHOP/images/valid-id/${data.username}.jpg`}
                  alt="example"
                  height={150}
                />
              </Col>
            </Row>
            <h4 className="text-center">
              QUESTIONAIRE (passsing score - 60% above)
            </h4>
          </Col>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="ml-4">
              <Col md={12}>
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
                        onChange={() => setAnswer1("FRIENDS")}
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
                        onChange={() => setAnswer1("MYSELF")}
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
                        onChange={() => setAnswer1("FAMILY")}
                      />
                      Family
                    </FormGroup>
                  </Col>
                </Row>
                <Col md={4}>
                  -others/explain if necessary
                  <Input
                    style={{ cursor: "pointer" }}
                    onChange={(e) => setQ1Other(e.target.value)}
                    name="question1"
                    type="textbox"
                  />
                </Col>
              </Col>

              <Col md={12}>
                2. Are there children below 18 yrs old in the house?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question2"
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
                        type="radio"
                        onChange={() => setAnswer2("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>3. Do you have other pets?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question3"
                        type="radio"
                        onChange={() => setAnswer3("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question3"
                        onChange={() => setAnswer3("NO")}
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
                <Col md={4}>
                  -if yes tell us about
                  <Input
                    style={{ cursor: "pointer" }}
                    name="question1"
                    type="textbox"
                    onChange={(e) => setQ3Other(e.target.value)}
                  />
                </Col>
              </Col>

              <Col md={12}>4. Who else do you live with?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question4"
                        onChange={() => setAnswer4("SPOUSE")}
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
                        type="radio"
                        onChange={() => setAnswer4("PARENTS")}
                      />
                      Parents
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question4"
                        type="radio"
                        onChange={() => setAnswer4("ROOMMATES")}
                      />
                      Roommates
                    </FormGroup>
                  </Col>
                </Row>
                <Col md={4}>
                  -others
                  <Input
                    style={{ cursor: "pointer" }}
                    name="question1"
                    type="textbox"
                    onChange={(e) => setQ4Other(e.target.value)}
                  />
                </Col>
              </Col>

              <Col md={12}>
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
                        onChange={() => setAnswer5("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question5"
                        type="radio"
                        onChange={() => setAnswer5("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
                <Col md={4}>
                  -if yes, how it will be manage?
                  <Input
                    style={{ cursor: "pointer" }}
                    name="question1"
                    type="textbox"
                    onChange={(e) => setQ5Other(e.target.value)}
                  />
                </Col>
              </Col>

              <Col md={12}>6. Have you had pets in the past?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question6"
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
                        type="radio"
                        onChange={() => setAnswer6("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
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
                        onChange={() => setAnswer7("FRIENDS")}
                        type="radio"
                      />
                      Friends
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
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
                        type="radio"
                        onChange={() => setAnswer8("FRIENDS")}
                      />
                      Friends
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
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
                        type="radio"
                        onChange={() => setAnswer9("8HRS")}
                      />
                      8 hours
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question9"
                        type="radio"
                        onChange={() => setAnswer9("9HRS")}
                      />
                      9 hours
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question9"
                        type="radio"
                        onChange={() => setAnswer9("10HRS")}
                      />
                      Above 10 hours
                    </FormGroup>
                  </Col>
                </Row>
                <Col md={4}>
                  -others
                  <Input
                    style={{ cursor: "pointer" }}
                    name="question1"
                    type="textbox"
                    onChange={(e) => setQ9Other(e.target.value)}
                  />
                </Col>
              </Col>

              <Col md={12}>
                10. Does everyone in the family support your decision to adopt a
                pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
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
                        name="question10"
                        type="radio"
                        onChange={() => setAnswer10("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                11. What steps will you take to familiarize your pet with
                his/her new surroundings?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question11"
                        type="radio"
                        onChange={() => setAnswer11("PROPER_TRAINING")}
                      />
                      Proper Training
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question11"
                        type="radio"
                        onChange={() => setAnswer11("HOUSE_TOUR")}
                      />
                      House Tour
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question11"
                        type="radio"
                        onChange={() => setAnswer11("LET_THEM")}
                      />
                      Let Them Familiarize
                    </FormGroup>
                  </Col>
                </Row>
                <Col md={4}>
                  -other
                  <Input
                    style={{ cursor: "pointer" }}
                    name="question1"
                    type="textbox"
                    onChange={(e) => setQ11Other(e.target.value)}
                  />
                </Col>
              </Col>

              <Col md={12}>12. What type of building do you live in?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
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
                        name="question12"
                        type="radio"
                        onChange={() => setAnswer12("CONDO")}
                      />
                      Condo
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>13. Do you rent?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question13"
                        type="radio"
                        onChange={() => setAnswer13("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question13"
                        onChange={() => setAnswer13("NO")}
                        type="radio"
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                14. If renting or living in a shared building, can you provide a
                copy of your building’s pet policy?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question14"
                        type="radio"
                        onChange={() => setAnswer14("YES")}
                      />
                      Yes
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question14"
                        type="radio"
                        onChange={() => setAnswer14("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup check inline>
                      -if yes, please upload here.
                    </FormGroup>
                    <Input
                      style={{ cursor: "pointer" }}
                      name="question1"
                      type="file"
                      onChange={() => setAnswer1("")}
                    />
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                15. What happens to your pet if or when you move, will you take
                your pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
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
                        name="question15"
                        type="radio"
                        onChange={() => setAnswer15("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>16. What kind of pet us right for you?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question16"
                        type="radio"
                        onChange={() => setAnswer16("NON_")}
                      />
                      Racial Pet
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question16"
                        type="radio"
                        onChange={() => setAnswer16("NON_")}
                      />
                      Non-Racial Pet
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question16"
                        type="radio"
                        onChange={() => setAnswer16("NOT_A_BIG_DEAL")}
                      />
                      It’s not a big deal if pet has or doesn’t have a breed
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                17. Are you ready for long term commitment with your new pet?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
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
                        name="question17"
                        type="radio"
                        onChange={() => setAnswer17("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>
                18. Can you afford to care for your pets healthy and safety?
              </Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
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
                        name="question18"
                        type="radio"
                        onChange={() => setAnswer18("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>19. Do you have time for pet?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={2}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
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
                        name="question19"
                        type="radio"
                        onChange={() => setAnswer19("NO")}
                      />
                      No
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={12}>20. Are you willing to train your pet? How?</Col>

              <Col md={12}>
                <Row className="mx-4">
                  <Col md={4}>
                    <FormGroup check inline>
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question20"
                        type="radio"
                        onChange={() => setAnswer20("HIRE_PROFESSIONAL")}
                      />
                      Hire Professional Trainer
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question20"
                        type="radio"
                        onChange={() => setAnswer20("WATCH_YOUTUBE")}
                      />
                      Watch Youtube Videos
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup check inline className="ml-2">
                      <Input
                        style={{ cursor: "pointer" }}
                        name="question20"
                        type="radio"
                        onChange={() => setAnswer20("ASK_FRIENDS")}
                      />
                      Ask Help To Your Friends, Family etc.
                    </FormGroup>
                  </Col>
                </Row>
                <Col md={4}>
                  -others,please explain
                  <Input
                    style={{ cursor: "pointer" }}
                    name="question1"
                    type="textbox"
                    onChange={(e) => setQ20Other(e.target.value)}
                  />
                </Col>
              </Col>

              <Button
                className="mt-2 font-italic"
                color="primary"
                type="submit"
                block
                onClick={handleSubmit}
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
