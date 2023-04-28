import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "4rem",
  },
  title: {
    color: "#009292",
    fontFamily: "Source Sans Pro",
    fontWeight: "bold",
  },
  button: {
    color: "#E6F4F1",
    background: "#009292",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.6s ease-in-out",
    marginTop: "0.5rem",
    "&:hover": {
      backgroundColor: "#E6F4F1",
      color: "#009292",
      transform: "scale(0.95)",
    },
  },
}));

const AssignForm = () => {
  const classes = useStyles();
  const [complaintID, setComplaintID] = useState("");
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    // fetch engineers data from API
    axios
      .get("http://localhost:4000/engineer")
      .then((response) => {
        setEngineers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAssign = (e) => {
    e.preventDefault();

    // send assign complaint request to API
    axios
      .post("http://localhost:4000/assign", {
        complaintID,
        engineerName: e.target.engineerName.value,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mt-5 border p-5" style={{ width: "70%" }}>
      <h2 className={classes.title}>Assign the Complaint to Engineer</h2>
      <br />
      <Form onSubmit={handleAssign}>
        <Form.Group>
          <Form.Label>Complaint Number</Form.Label>
          <Form.Control
            type="text"
            name="complaintID"
            placeholder="Complaint Number"
            value={complaintID}
            onChange={(e) => setComplaintID(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Engineer</Form.Label>
          <Form.Control as="select" name="engineerName">
            {engineers.map((engineer) => (
              <option key={engineer._id} value={engineer.username}>
                {engineer.username}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button className={classes.button} type="submit" block>
          Assign to Engineer
        </Button>
      </Form>
    </div>
  );
};

export default AssignForm;
