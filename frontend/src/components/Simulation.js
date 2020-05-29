<<<<<<< HEAD
import React from 'react';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';


export default function Simulation() {
    return (
        <div>
            <Container maxWidth="sm">
                <form noValidate autoComplete="off">
                    <div>
                     <TextField id="standard-basic" label="User" />
                     </div>
                     <div>
                     <TextField id="standard-basic" label="Date" />
                     </div>
                     <div>
                         <p></p>
                     </div>
                     <div>
                     <Button variant="outlined" color="primary">
                        Simulation
                    </Button>
                     </div>
                </form>
            </Container>
        </div>
    )
}
=======
import React, { Fragment } from "react";
import PieChart from "./PieChart";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
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
>>>>>>> 377c798b82a5582c958f5ddc359944b64ab0ccf2
