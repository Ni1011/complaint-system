import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";

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

const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:4000/register",
      data: {
        name,
        username,
        email,
        password,
        role,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className={classes.form}>
      <Typography className={classes.title} variant="h4" align="center">
        Register
      </Typography>

      <Form
        onSubmit={(e) => handleSubmit(e)}
        style={{ width: "50%", padding: "2rem" }}
      >
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </Form.Group>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="jeng">Junior Engineer</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className={classes.button}
        >
          Register
        </Button>

        <p
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          Have An Account?{" "}
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
            Login Now
          </Button>
        </p>
        {/* display success message */}
        {register ? (
          <p style={{ color: "#A93800", fontFamily: "Source Sans Pro" }}>
            You Are Registered Successfully
          </p>
        ) : (
          <p style={{ color: "#A93800", fontFamily: "Source Sans Pro" }}>
            You Are Not Registered
          </p>
        )}
      </Form>
    </div>
  );
};

export default Register;
