import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import ComplaintTable from "../Components/ComplaintTable";
import AssignForm from "../Components/AssignForm";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

const Admin = () => {
  // eslint-disable-next-line
  const [message, setMessage] = useState("");

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:4000/admin",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  // logout

  return (
    <>
      <ComplaintTable></ComplaintTable>
      <AssignForm></AssignForm>
    </>
  );
};

export default Admin;
