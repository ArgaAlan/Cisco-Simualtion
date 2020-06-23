import React, { useContext, useState } from "react";
import { Context } from "../context/user/userContext";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Title from "./Title";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import { useAuth0 } from "../react-auth0-spa";

import Row from '../components/simulation/Row';
import rows from '../components/simulation/rows';



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  table: {
    minWidth: 650,
  },
}));

export default function Simulation() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [privilege, setPrivilege] = useContext(Context);
  const [state, setState] = useState({
    mlt_risk_0: 0.2,
    mlt_risk_1: 0.2,
    mlt_risk_2: 0.1,
    mlt_risk_3: 0.5,
    mqnt_risk_0: 0.3,
    mqnt_risk_1: 0.3,
    mqnt_risk_2: 0.4,
    mqlt_risk_0: 0.1,
    mqlt_risk_1: 0.05,
    mqlt_risk_2: 0.25,
    mqlt_risk_3: 0.4,
    mqlt_risk_4: 0.2,
  });

  var mlt_risk = [
    [state.mlt_risk_0, state.mlt_risk_1, state.mlt_risk_2, state.mlt_risk_3],
    [],
  ];
  var mqnt_risk = [
    [state.mqnt_risk_0, state.mqnt_risk_1, state.mqnt_risk_2],
    [0, 0, 1],
  ];
  var mqlt_risk = [
    [
      state.mqlt_risk_0,
      state.mqlt_risk_1,
      state.mqlt_risk_2,
      state.mqlt_risk_3,
      state.mqlt_risk_4,
    ],
    [0, 0, 0, 0, 1],
  ];

  var months = 12;

  //Getting periods of calculations
  var mlt_count_ti_periods = [];
  var mlt_count_ds_periods = [];
  var mlt_count_pdc_periods = [];
  var mqnt_count_yi_periods = [];
  var mqnt_count_se_periods = [];
  var mqlt_count_mi_periods = [];
  var mqlt_count_di_periods = [];
  var mqlt_count_pi_periods = [];
  var mqlt_count_ti_periods = [];

  var sumMaterialLeadTimeDemand = 0;
  var sumMaterialLeadTimeDesign = 0;
  var sumMaterialLeadTimeTransport = 0;
  var sumMaterialQualityManufaturing = 0;
  var sumMaterialQualityDesign = 0;
  var sumMaterialQualityProcess = 0;
  var sumMaterialQualityTraining = 0;
  var sumMaterialQuantityYield = 0;
  var sumMaterialQuantityScrap = 0;

  var sumMaterialLeadTime = 0;
  var sumMaterialQuality = 0;
  var sumMaterialQuantity = 0;

  const dataPerPeriod = () => {
    //Count of problems obtained computing bayesian
    var mlt_count_ti = 0;
    var mlt_count_ds = 0;
    var mlt_count_pdc = 0;
    var mqnt_count_yi = 0;
    var mqnt_count_se = 0;
    var mqlt_count_mi = 0;
    var mqlt_count_di = 0;
    var mqlt_count_pi = 0;
    var mqlt_count_ti = 0;

    for (var i = 0; i < 420; i++) {
      var values = [];
      values = bayesian(mlt_risk, mqnt_risk, mqlt_risk);

      switch (values[0]) {
        case "Fail due to Material Lead Time Risk: Transport Issue":
          mlt_count_ti++;
          break;
        case "Fail due to Material Lead Time Risk: Demand Surge":
          mlt_count_ds++;
          break;
        case "Fail due to Material Lead Time Risk: Product Design Change":
          mlt_count_pdc++;
          break;
      }
      switch (values[1]) {
        case "Fail due to Material Quantity: Yield Issue":
          mqnt_count_yi++;
          break;
        case "Fail due to Material Quantity: Scrap due to ECO":
          mqnt_count_se++;
          break;
      }
      switch (values[2]) {
        case "Fail due to Material Quality: Manufacturing Issue":
          mqlt_count_mi++;
          break;
        case "Fail due to Material Quality: Design Issue":
          mqlt_count_di++;
          break;
        case "Fail due to Material Quality: Process Issue":
          mqlt_count_pi++;
          break;
        case "Fail due to Material Quality: Training Issue":
          mqlt_count_ti++;
          break;
      }
    }

    return [
      mlt_count_ti,
      mlt_count_ds,
      mlt_count_pdc,
      mqnt_count_yi,
      mqnt_count_se,
      mqlt_count_mi,
      mqlt_count_di,
      mqlt_count_pi,
      mqlt_count_ti,
    ];
  };

  const bayesian = (mlt_risk_input, mqnt_risk_input, mqlt_risk_input) => {
    // Main simulation
    const mlt_risk = mlt_risk_input;
    const mqnt_risk = mqnt_risk_input;
    const mqlt_risk = mqlt_risk_input;

    var output, rand, failure, l, u, i, probs;

    output = [];

    // First random probability value (Material Lead Time)
    rand = Math.random();
    failure = 0;
    l = 0;
    u = 0;
    i = 0;
    probs = mlt_risk[failure];
    for (let index = 0; index < probs.length; index++) {
      u += probs[index];
      if (l < rand && rand <= u) {
        if (i == 0 || i == 1 || i == 2) {
          failure = 1;
        }
        if (i == 0) {
          output.push("Fail due to Material Lead Time Risk: Transport Issue");
          break;
        } else if (i == 1) {
          output.push("Fail due to Material Lead Time Risk: Demand Surge");
          break;
        } else if (i == 2) {
          output.push(
            "Fail due to Material Lead Time Risk: Product Design Change"
          );
          break;
        } else if (i == 3) {
          output.push("No errors in Material Lead Time");
          break;
        }
      }
      i++;
      l = u;
    }

    // Second random probability value (Material Quantity)
    rand = Math.random();
    l = 0;
    u = 0;
    i = 0;
    probs = mqnt_risk[failure];
    for (let index = 0; index < probs.length; index++) {
      u += probs[index];
      if (l < rand && rand <= u) {
        if (i == 0 || i == 1) {
          failure = 1;
        }
        if (i == 0) {
          output.push("Fail due to Material Quantity: Yield Issue");
          break;
        } else if (i == 1) {
          output.push("Fail due to Material Quantity: Scrap due to ECO");
          break;
        } else if (i == 2) {
          output.push("No errors in Material Quantity");
          break;
        }
      }
      i++;
      l = u;
    }

    // Last random probability value (Material Quality)
    rand = Math.random();
    l = 0;
    u = 0;
    i = 0;
    probs = mqlt_risk[failure];
    for (let index = 0; index < probs.length; index++) {
      u += probs[index];
      if (l < rand && rand <= u) {
        if (i == 0 || i == 1 || i == 2 || i == 3) {
          failure = 1;
        }
        if (i == 0) {
          output.push("Fail due to Material Quality: Manufacturing Issue");
          break;
        } else if (i == 1) {
          output.push("Fail due to Material Quality: Design Issue");
          break;
        } else if (i == 2) {
          output.push("Fail due to Material Quality: Process Issue");
          break;
        } else if (i == 3) {
          output.push("Fail due to Material Quality: Training Issue");
          break;
        } else if (i == 4) {
          output.push("No errors in Material Quality");
          break;
        }
      }
      i++;
      l = u;
    }

    output.push(Boolean(failure));

    return output;
  };

  const createData = () => {
    for (let i = 0; i < months; i++) {
      var values = dataPerPeriod();
      mlt_count_ti_periods.push(values[0]);
      sumMaterialLeadTimeTransport += values[0];
      sumMaterialLeadTime += values[0];

      mlt_count_ds_periods.push(values[1]);
      sumMaterialLeadTimeDemand += values[1];
      sumMaterialLeadTime += values[1];

      mlt_count_pdc_periods.push(values[2]);
      sumMaterialLeadTimeDesign += values[2];
      sumMaterialLeadTime += values[2];

      mqnt_count_yi_periods.push(values[3]);
      sumMaterialQuantityYield += values[3];
      sumMaterialQuantity += values[3];

      mqnt_count_se_periods.push(values[4]);
      sumMaterialQuantityScrap += values[4];
      sumMaterialQuantity += values[4];

      mqlt_count_mi_periods.push(values[5]);
      sumMaterialQualityManufaturing += values[5];
      sumMaterialQuality += values[5];

      mqlt_count_di_periods.push(values[6]);
      sumMaterialQualityDesign += values[6];
      sumMaterialQuality += values[6];

      mqlt_count_pi_periods.push(values[7]);
      sumMaterialQualityProcess += values[7];
      sumMaterialQuality += values[7];

      mqlt_count_ti_periods.push(values[8]);
      sumMaterialQualityTraining += values[8];
      sumMaterialQuality += values[8];
    }
  };

  createData();

  function createDataRows(name, num) {
    return { name, num };
  }

  const rowsLeadTime = [
    createDataRows("Transport Issue", sumMaterialLeadTimeTransport),
    createDataRows("Demand Surge", sumMaterialLeadTimeDemand),
    createDataRows("Product Design Change", sumMaterialLeadTimeDesign),
    createDataRows("Total", sumMaterialLeadTime),
  ];

  const rowsQuality = [
    createDataRows("Manufacturing Issue", sumMaterialQualityManufaturing),
    createDataRows("Design Issue", sumMaterialQualityDesign),
    createDataRows("Process Issue", sumMaterialQualityProcess),
    createDataRows("Training Issue", sumMaterialQualityTraining),
    createDataRows("Total", sumMaterialQuality),
  ];

  const rowsQuantity = [
    createDataRows("Yield Issue", sumMaterialQuantityYield),
    createDataRows("Scrap due to ECO", sumMaterialQuantityScrap),
    createDataRows("Quantity Issue", sumMaterialQuantity),
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: parseFloat(event.target.value) });
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const [data, setData] = useState("Bayesnet");

  if (privilege != "Analyst" && privilege != "Admin") {
    return <Redirect to="" />;
  }

  const handleClick = () => {
    if (data === "Bayesnet") {
      setData("Database");
    } else if (data === "Database") {
      setData("Bayesnet");
    }
  };

  if (data === "Bayesnet") {
    return (
      <div>
        <React.Fragment>
          <div>
            <Grid container justify="space-between">
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClick}
                  align="left"
                >
                  Change data
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                  align="right"
                >
                  Change Probabilities
                </Button>
              </Grid>
            </Grid>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              fullScreen
            >
              <DialogTitle id="form-dialog-title">Probabilities</DialogTitle>
              <DialogContent>
                <div className={classes.root}>
                  <div>
                    {/* TRANSPORT */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability Transport Issue"
                      type="number"
                      value={state.mlt_risk_0}
                      onChange={handleChange("mlt_risk_0")}
                    />
                    {/* DEMAND */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability Demand Surge"
                      type="number"
                      value={state.mlt_risk_1}
                      onChange={handleChange("mlt_risk_1")}
                    />
                    {/* DESIGN */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability Product Design Change"
                      type="number"
                      value={state.mlt_risk_2}
                      onChange={handleChange("mlt_risk_2")}
                    />
                    {/* NO */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability No Lead Time Issues"
                      type="number"
                      value={state.mlt_risk_3}
                      onChange={handleChange("mlt_risk_3")}
                    />
                    <br />
                    {/* YIELD */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability Yield Issue"
                      type="number"
                      value={state.mqnt_risk_0}
                      onChange={handleChange("mqnt_risk_0")}
                    />
                    {/* SCRAP */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability Scrap due to ECO"
                      type="number"
                      value={state.mqnt_risk_1}
                      onChange={handleChange("mqnt_risk_1")}
                    />
                    {/* NO */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability No Quantity Issues"
                      type="number"
                      value={state.mqnt_risk_2}
                      onChange={handleChange("mqnt_risk_2")}
                    />
                    <br />
                    {/* MANUFACTURING */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability Manufacturing Issue"
                      type="number"
                      value={state.mqlt_risk_0}
                      onChange={handleChange("mqlt_risk_0")}
                    />
                    {/* DESIGN */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability Design Issue"
                      type="number"
                      value={state.mqlt_risk_1}
                      onChange={handleChange("mqlt_risk_1")}
                    />
                    {/* PROCESS */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability Process Issue"
                      type="number"
                      value={state.mqlt_risk_2}
                      onChange={handleChange("mqlt_risk_2")}
                    />
                    {/* TRAINING */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability Training Issue"
                      type="number"
                      value={state.mqlt_risk_3}
                      onChange={handleChange("mqlt_risk_3")}
                    />
                    {/* NO */}
                    <TextField
                      className={clsx(classes.margin, classes.textField)}
                      autoFocus
                      margin="normal"
                      label="Probability No Lead Time Issues"
                      type="number"
                      value={state.mqlt_risk_4}
                      onChange={handleChange("mqlt_risk_4")}
                    />
                    <br />
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <br />
          <Title>Data created: Lead Time Issues</Title>
          <br />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Type of Issue</TableCell>
                  <TableCell align="right">Number of Issues</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsLeadTime.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.num}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <Title>Data created: Quality Issues</Title>
          <br />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Type of Issue</TableCell>
                  <TableCell align="right">Number of Issues</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsQuality.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.num}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <Title>Data created: Quantity Issues</Title>
          <br />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Type of Issue</TableCell>
                  <TableCell align="right">Number of Issues</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsQuantity.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.num}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/** SIMULATION RESULTS */}
          <br />
          <br />
          <Title>Simulation Results</Title>
          <br />
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Week</TableCell>
                  <TableCell align="right">Issues MLT</TableCell>
                  <TableCell align="right">Issues MQNT</TableCell>
                  <TableCell align="right">Issues MQLT</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </div>
    );
  } else if (data === "Database") {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClick}>
          Change data
        </Button>
      </div>
    );
  }
}
