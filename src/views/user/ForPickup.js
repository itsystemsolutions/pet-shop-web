import { useEffect, useState } from "react";
import { useHistory } from "react-router";

// react-bootstrap components
import { Card, Table, Container, Button, Row } from "react-bootstrap";

const axios = require("axios").default;

function Appointments() {
  let history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/schedule/for-pick-up?userId=" +
          localStorage.getItem("user_id")
      )
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <Container fluid>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">For PickUp</Card.Title>
          <p className="card-category">List of interviews</p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th className="border-0">Name</th>
                <th className="border-0">Pet Code</th>
                <th className="border-0">Pet Type</th>
                <th className="border-0">Date</th>
                <th className="border-0">Time</th>
                <th className="border-0">Message</th>
                <th className="border-0">Proof of Payment</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
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
                      <div>Code: {entry.petCode}</div>
                    </td>
                    <td>{entry.petType}</td>
                    <td>{entry.proofPaymentCount !== 0 && entry.date}</td>
                    <td>{entry.proofPaymentCount !== 0 && entry.time}</td>
                    <td>{entry.message}</td>
                    <td>
                      {entry.proofPaymentCount != 0 ? (
                        <div>
                          <span>UPLOADED ({entry.proofPaymentCount})</span>

                          <br />

                          <Button
                            className="mb-2 mt-2"
                            onClick={() =>
                              history.push(
                                "/user/upload/proof-of-payment/" +
                                  entry.id +
                                  "/" +
                                  entry.petCode
                              )
                            }
                          >
                            Upload Proof of Payment
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button
                            className="mb-2"
                            onClick={() =>
                              history.push(
                                "/user/upload/proof-of-payment/" +
                                  entry.id +
                                  "/" +
                                  entry.petCode
                              )
                            }
                          >
                            Upload Proof of Payment
                          </Button>
                          <br />
                          {!entry.hasProofPayment && (
                            <i className="font-weigth-bold">
                              *Upload proof of payment to see schedule
                            </i>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Appointments;
