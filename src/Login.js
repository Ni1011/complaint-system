import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";
const cookies = new Cookies();

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem",
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

const Login = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:4000/login",
      data: {
        username,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });

        // Change here for different user
        // redirect user to the auth page
        if (result.data.role === "user") {
          window.location.href = "/user";
        } else if (result.data.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/jeng";
        }

        // setLogin(true);
      })
      .catch((error) => {
        // error = new Error();
        setError(error.response.data.message);
        // console.log(error.response.data.message);
      });
  };
  return (
    <div className={classes.form}>
      <Typography className={classes.title} variant="h4" align="center">
        Login
      </Typography>

      <Form
        onSubmit={(e) => handleSubmit(e)}
        style={{ width: "50%", padding: "2rem" }}
      >
        {/* Username */}
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

        {/* submit button */}
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className={classes.button}
        >
          Login
        </Button>

        <p
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          Don't Have An Account?{" "}
          <Button
            onClick={() => history.push("/register")}
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
            Register
          </Button>
        </p>

        {/* display success message */}
        <p style={{ color: "#A93800", fontFamily: "Source Sans Pro" }}>
          {error}{" "}
        </p>
      </Form>
    </div>
  );
};

export default Login;
