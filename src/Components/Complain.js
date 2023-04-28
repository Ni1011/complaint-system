import { Typography, makeStyles } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

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
    fontWeight: "bold",
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

const Complain = () => {
  const classes = useStyles();
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    desc: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/complain", formData)
      .then((response) => {
        console.log(response.data);
        // reset form data after successful submission
        setFormData({
          name: "",
          email: "",
          contact: "",
          desc: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.form}>
      <Typography className={classes.title} variant="h4" align="center">
        Register a Complaint
      </Typography>
      <Form onSubmit={handleSubmit} style={{ width: "50%", padding: "2rem" }}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            className="form-control"
            type="text"
            name="contact"
            placeholder="Phone Number"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="desc"
            // cols="10"
            rows="4"
            placeholder="Enter the Description"
            value={formData.desc}
            onChange={handleChange}
          ></textarea>
        </div>
        <Button className={classes.button} type="submit">
          Submit Complaint
        </Button>
        <br />
        Wanna change your mind?{" "}
        <Button
          onClick={() => history.push("/")}
          style={{
            color: "#E6F4F1",
            background: "#009292",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.6s ease-in-out",
            "&:hover": {
              backgroundColor: "#E6F4F1",
              color: "#009292",
              transform: "scale(0.95)",
            },
          }}
        >
          Back
        </Button>
      </Form>
    </div>
  );
};

export default Complain;
