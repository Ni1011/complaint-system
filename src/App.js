import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import { makeStyles } from "@material-ui/core";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoutes from "./ProtectedRoutes";
import Admin from "./Pages/Admin";
import User from "./Pages/User";
import Jeng from "./Pages/Jeng";

const userStyles = makeStyles(() => ({
  App: {
    backgroundColor: "white",
    color: "#14161a",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = userStyles();

  return (
    <div className={classes.App}>
      <Header />
      {/* <Login></Login> */}

      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoutes path="/admin" component={Admin} />
        <ProtectedRoutes path="/user" component={User} />
        <ProtectedRoutes path="/jeng" component={Jeng} />
      </Switch>
    </div>
  );
}

export default App;
