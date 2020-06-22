import React, { useContext } from "react";
import Title from "./Title";
import { Context } from "../context/user/userContext";
import { simulationContext } from "../context/simulation/simulationContext";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Simulation() {
  const classes = useStyles();

  const [privilege, setPrivilege] = useContext(Context);
  const [simulation, setSimulation] = useContext(simulationContext);

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
      values = bayesian(
        simulation.bayesian.mlt_risk,
        simulation.bayesian.mqnt_risk,
        simulation.bayesian.mqlt_risk
      );

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

  const bayesian = (mlt_risk_context, mqnt_risk_context, mqlt_risk_context) => {
    // Main simulation
    const mlt_risk = mlt_risk_context;
    const mqnt_risk = mqnt_risk_context;
    const mqlt_risk = mqlt_risk_context;

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

    console.log("CREATING DATA");
    console.log(mlt_count_ti_periods);
    console.log(mlt_count_ds_periods);
    console.log(mlt_count_pdc_periods);
    console.log(mqnt_count_yi_periods);
    console.log(mqnt_count_se_periods);
    console.log(mqlt_count_mi_periods);
    console.log(mqlt_count_di_periods);
    console.log(mqlt_count_pi_periods);
    console.log(mqlt_count_ti_periods);
    console.log("Lead Time");
    console.log(sumMaterialLeadTimeDemand);
    console.log(sumMaterialLeadTimeDesign);
    console.log(sumMaterialLeadTimeTransport);
    console.log("Quality");
    console.log(sumMaterialQualityManufaturing);
    console.log(sumMaterialQualityDesign);
    console.log(sumMaterialQualityProcess);
    console.log(sumMaterialQualityTraining);
    console.log("Quantity");
    console.log(sumMaterialQuantityYield);
    console.log(sumMaterialQuantityScrap);
    console.log("CREATING DATA");
    console.log("Lead Time");
    console.log(sumMaterialLeadTime);
    console.log("Quality");
    console.log(sumMaterialQuality);
    console.log("Quantity");
    console.log(sumMaterialQuantity);
  };

  createData();

  if (privilege != "Analyst" && privilege != "Admin") {
    return <Redirect to="" />;
  }

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

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
