import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Fragment } from "react";
import PieChart from "./PieChart";
import SaveIcon from "@material-ui/icons/Save";
import Title from "./Title";
import { Context } from "../context/user/userContext";
import { Redirect } from "react-router-dom";

export default function Simulation() {
  const [privilege, setPrivilege] = useContext(Context);

  if (privilege == "Analyst" || privilege == "Admin") {
    return <Redirect to="" />;
  }

  return (
    <React.Fragment>
      <Title>Simulation data</Title>
      <div>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              required
              id="weeks"
              label="Weeks to simulate"
              value={1}
            />
          </div>
        </form>
      </div>
      <div>
        <PieChart></PieChart>
      </div>
    </React.Fragment>
  );
}
