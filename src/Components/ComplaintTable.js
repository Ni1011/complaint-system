import { Typography, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const useStyles = makeStyles(() => ({
  table: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 2rem 0 2rem",
  },
  title: {
    color: "#009292",
    fontFamily: "Source Sans Pro",
    fontWeight: "bold",
  },
  tablehead: {
    background: "#37D7BB",
    color: "#E6F4F1",
  },
}));

const ComplaintTable = () => {
  const classes = useStyles();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // fetch complaints data from API
    axios
      .get("http://localhost:4000/complains")
      .then((response) => {
        setComplaints(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={classes.table}>
      <Typography className={classes.title} variant="h4" align="center">
        Hello Admin!!!
      </Typography>

      <br />

      <Table striped bordered hover>
        <thead className={classes.tablehead}>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Customer Contact</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint._id}</td>
              <td>{complaint.name}</td>
              <td>{complaint.contact}</td>
              <td>{complaint.desc}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ComplaintTable;
