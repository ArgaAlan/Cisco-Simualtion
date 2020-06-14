import React from "react";
import PieChart from "./PieChart";
import TextField from "@material-ui/core/TextField";
import Title from "./Title";

export default function Simulation() {
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
