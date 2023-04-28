import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const useStyles = makeStyles(() => ({
  navbar: {
    background: "#37D7BB",
  },
  title: {
    flex: 1,
    color: "#E6F4F1",
    fontFamily: "Source Sans Pro",
    fontWeight: "bold",
    cursor: "pointer",
  },
  button: {
    color: "#E6F4F1",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.6s ease-in-out",
    marginLeft: 25,
    "&:hover": {
      backgroundColor: "#E6F4F1",
      color: "#009292",
      transform: "scale(0.95)",
    },
  },
}));

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const token = cookies.get("TOKEN");

  const handleLogout = () => {
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <AppBar color="transparent" position="static" className={classes.navbar}>
      <Toolbar>
        <Typography
          onClick={() => history.push("/")}
          className={classes.title}
          variant="h6"
        >
          Complaint System
          <Button onClick={() => history.push("/")} className={classes.button}>
            Home
          </Button>
        </Typography>

        <div className={classes.nav}>
          {token ? (
            <Button onClick={handleLogout} className={classes.button}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                onClick={() => history.push("/")}
                className={classes.button}
              >
                Login
              </Button>
              <Button
                onClick={() => history.push("/register")}
                className={classes.button}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
