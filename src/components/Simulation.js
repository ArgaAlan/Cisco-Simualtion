import React, { useContext, useEffect, useState } from "react";
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
import TicketContext from "../context/ticket/ticketContext";

import Row from "../components/simulation/Row";

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

  const ticketContext = useContext(TicketContext);

  const { tickets, getTickets, loading } = ticketContext;

  useEffect(() => {
    getTickets();
  }, []);

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

  const [data, setData] = useState("Database");

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
    mlt_risk = [
      [state.mlt_risk_0, state.mlt_risk_1, state.mlt_risk_2, state.mlt_risk_3],
      [],
    ];
    mqnt_risk = [
      [state.mqnt_risk_0, state.mqnt_risk_1, state.mqnt_risk_2],
      [0, 0, 1],
    ];
    mqlt_risk = [
      [
        state.mqlt_risk_0,
        state.mqlt_risk_1,
        state.mqlt_risk_2,
        state.mqlt_risk_3,
        state.mqlt_risk_4,
      ],
      [0, 0, 0, 0, 1],
    ];

    mlt_count_ti_periods = [];
    mlt_count_ds_periods = [];
    mlt_count_pdc_periods = [];
    mqnt_count_yi_periods = [];
    mqnt_count_se_periods = [];
    mqlt_count_mi_periods = [];
    mqlt_count_di_periods = [];
    mqlt_count_pi_periods = [];
    mqlt_count_ti_periods = [];

    sumMaterialLeadTimeDemand = 0;
    sumMaterialLeadTimeDesign = 0;
    sumMaterialLeadTimeTransport = 0;
    sumMaterialQualityManufaturing = 0;
    sumMaterialQualityDesign = 0;
    sumMaterialQualityProcess = 0;
    sumMaterialQualityTraining = 0;
    sumMaterialQuantityYield = 0;
    sumMaterialQuantityScrap = 0;

    sumMaterialLeadTime = 0;
    sumMaterialQuality = 0;
    sumMaterialQuantity = 0;

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

    //Getting periods of calculations
    mlt_count_ti_periods = [];
    mlt_count_ds_periods = [];
    mlt_count_pdc_periods = [];
    mqnt_count_yi_periods = [];
    mqnt_count_se_periods = [];
    mqlt_count_mi_periods = [];
    mqlt_count_di_periods = [];
    mqlt_count_pi_periods = [];
    mqlt_count_ti_periods = [];

    var mlt_risk_db = [
      [
        sumMaterialLeadTimeDemand / sumMaterialLeadTime - 0.0666,
        sumMaterialLeadTimeDesign / sumMaterialLeadTime - 0.0666,
        sumMaterialLeadTimeTransport / sumMaterialLeadTime - 0.0666,
        0.2,
      ],
      [],
    ];
    var mqnt_risk_db = [
      [
        sumMaterialQuantityYield / sumMaterialQuantity - 0.1666,
        sumMaterialQuantityScrap / sumMaterialQuantity - 0.1666,
        0.3333,
      ],
      [0, 0, 1],
    ];
    var mqlt_risk_db = [
      [
        sumMaterialQualityManufaturing / sumMaterialQuality - 0.05,
        sumMaterialQualityDesign / sumMaterialQuality - 0.05,
        sumMaterialQualityProcess / sumMaterialQuality - 0.05,
        sumMaterialQualityTraining / sumMaterialQuality - 0.05,
        0.2,
      ],
      [0, 0, 0, 0, 1],
    ];

    sumMaterialLeadTimeDemand = 0;
    sumMaterialLeadTimeDesign = 0;
    sumMaterialLeadTimeTransport = 0;
    sumMaterialQualityManufaturing = 0;
    sumMaterialQualityDesign = 0;
    sumMaterialQualityProcess = 0;
    sumMaterialQualityTraining = 0;
    sumMaterialQuantityYield = 0;
    sumMaterialQuantityScrap = 0;

    sumMaterialLeadTime = 0;
    sumMaterialQuality = 0;
    sumMaterialQuantity = 0;

    const bayesian2 = (mlt_risk_input, mqnt_risk_input, mqlt_risk_input) => {
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

    const dataPerPeriod2 = () => {
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
        values = bayesian2(mlt_risk_db, mqnt_risk_db, mqlt_risk_db);

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

    const createData2 = () => {
      for (let i = 0; i < months; i++) {
        var values = dataPerPeriod2();
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

    createData2();

    const createDataS = (month, numMlt, numMqnt, numMqlt, details) => {
      return {
        month,
        numMlt,
        numMqnt,
        numMqlt,
        total: numMlt + numMqnt + numMqlt,
        details, // tickets of week
      };
    };

    const createTicketData = (type, summary) => {
      return {
        type,
        summary,
      };
    };

    const rows = [
      createDataS(
        "Month 1",
        mlt_count_ti_periods[0] +
          mlt_count_ds_periods[0] +
          mlt_count_pdc_periods[0],
        mqnt_count_yi_periods[0] + mqnt_count_se_periods[0],
        mqlt_count_mi_periods[0] +
          mqlt_count_di_periods[0] +
          mqlt_count_pi_periods[0] +
          mqlt_count_ti_periods[0],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[0]),
          createTicketData("Demand Surge", mlt_count_ds_periods[0]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[0]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[0]),
          createTicketData("Design Issue", mqlt_count_di_periods[0]),
          createTicketData("Process Issue", mqlt_count_pi_periods[0]),
          createTicketData("Training Issue", mqlt_count_ti_periods[0]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[0]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[0]),
        ]
      ),
      createDataS(
        "Month 2",
        mlt_count_ti_periods[1] +
          mlt_count_ds_periods[1] +
          mlt_count_pdc_periods[1],
        mqnt_count_yi_periods[1] + mqnt_count_se_periods[1],
        mqlt_count_mi_periods[1] +
          mqlt_count_di_periods[1] +
          mqlt_count_pi_periods[1] +
          mqlt_count_ti_periods[1],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[1]),
          createTicketData("Demand Surge", mlt_count_ds_periods[1]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[1]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[1]),
          createTicketData("Design Issue", mqlt_count_di_periods[1]),
          createTicketData("Process Issue", mqlt_count_pi_periods[1]),
          createTicketData("Training Issue", mqlt_count_ti_periods[1]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[1]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[1]),
        ]
      ),
      createDataS(
        "Month 3",
        mlt_count_ti_periods[2] +
          mlt_count_ds_periods[2] +
          mlt_count_pdc_periods[2],
        mqnt_count_yi_periods[2] + mqnt_count_se_periods[2],
        mqlt_count_mi_periods[2] +
          mqlt_count_di_periods[2] +
          mqlt_count_pi_periods[2] +
          mqlt_count_ti_periods[2],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[2]),
          createTicketData("Demand Surge", mlt_count_ds_periods[2]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[2]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[2]),
          createTicketData("Design Issue", mqlt_count_di_periods[2]),
          createTicketData("Process Issue", mqlt_count_pi_periods[2]),
          createTicketData("Training Issue", mqlt_count_ti_periods[2]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[2]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[2]),
        ]
      ),
      createDataS(
        "Month 4",
        mlt_count_ti_periods[3] +
          mlt_count_ds_periods[3] +
          mlt_count_pdc_periods[3],
        mqnt_count_yi_periods[3] + mqnt_count_se_periods[3],
        mqlt_count_mi_periods[3] +
          mqlt_count_di_periods[3] +
          mqlt_count_pi_periods[3] +
          mqlt_count_ti_periods[3],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[3]),
          createTicketData("Demand Surge", mlt_count_ds_periods[3]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[3]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[3]),
          createTicketData("Design Issue", mqlt_count_di_periods[3]),
          createTicketData("Process Issue", mqlt_count_pi_periods[3]),
          createTicketData("Training Issue", mqlt_count_ti_periods[3]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[3]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[3]),
        ]
      ),
      createDataS(
        "Month 5",
        mlt_count_ti_periods[4] +
          mlt_count_ds_periods[4] +
          mlt_count_pdc_periods[4],
        mqnt_count_yi_periods[4] + mqnt_count_se_periods[4],
        mqlt_count_mi_periods[4] +
          mqlt_count_di_periods[4] +
          mqlt_count_pi_periods[4] +
          mqlt_count_ti_periods[4],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[4]),
          createTicketData("Demand Surge", mlt_count_ds_periods[4]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[4]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[4]),
          createTicketData("Design Issue", mqlt_count_di_periods[4]),
          createTicketData("Process Issue", mqlt_count_pi_periods[4]),
          createTicketData("Training Issue", mqlt_count_ti_periods[4]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[4]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[4]),
        ]
      ),
      createDataS(
        "Month 6",
        mlt_count_ti_periods[5] +
          mlt_count_ds_periods[5] +
          mlt_count_pdc_periods[5],
        mqnt_count_yi_periods[5] + mqnt_count_se_periods[5],
        mqlt_count_mi_periods[5] +
          mqlt_count_di_periods[5] +
          mqlt_count_pi_periods[5] +
          mqlt_count_ti_periods[5],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[5]),
          createTicketData("Demand Surge", mlt_count_ds_periods[5]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[5]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[5]),
          createTicketData("Design Issue", mqlt_count_di_periods[5]),
          createTicketData("Process Issue", mqlt_count_pi_periods[5]),
          createTicketData("Training Issue", mqlt_count_ti_periods[5]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[5]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[5]),
        ]
      ),
      createDataS(
        "Month 7",
        mlt_count_ti_periods[6] +
          mlt_count_ds_periods[6] +
          mlt_count_pdc_periods[6],
        mqnt_count_yi_periods[6] + mqnt_count_se_periods[6],
        mqlt_count_mi_periods[6] +
          mqlt_count_di_periods[6] +
          mqlt_count_pi_periods[6] +
          mqlt_count_ti_periods[6],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[6]),
          createTicketData("Demand Surge", mlt_count_ds_periods[6]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[6]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[6]),
          createTicketData("Design Issue", mqlt_count_di_periods[6]),
          createTicketData("Process Issue", mqlt_count_pi_periods[6]),
          createTicketData("Training Issue", mqlt_count_ti_periods[6]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[6]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[6]),
        ]
      ),
      createDataS(
        "Month 8",
        mlt_count_ti_periods[7] +
          mlt_count_ds_periods[7] +
          mlt_count_pdc_periods[7],
        mqnt_count_yi_periods[7] + mqnt_count_se_periods[7],
        mqlt_count_mi_periods[7] +
          mqlt_count_di_periods[7] +
          mqlt_count_pi_periods[7] +
          mqlt_count_ti_periods[7],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[7]),
          createTicketData("Demand Surge", mlt_count_ds_periods[7]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[7]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[7]),
          createTicketData("Design Issue", mqlt_count_di_periods[7]),
          createTicketData("Process Issue", mqlt_count_pi_periods[7]),
          createTicketData("Training Issue", mqlt_count_ti_periods[7]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[7]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[7]),
        ]
      ),
      createDataS(
        "Month 9",
        mlt_count_ti_periods[8] +
          mlt_count_ds_periods[8] +
          mlt_count_pdc_periods[8],
        mqnt_count_yi_periods[8] + mqnt_count_se_periods[8],
        mqlt_count_mi_periods[8] +
          mqlt_count_di_periods[8] +
          mqlt_count_pi_periods[8] +
          mqlt_count_ti_periods[8],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[8]),
          createTicketData("Demand Surge", mlt_count_ds_periods[8]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[8]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[8]),
          createTicketData("Design Issue", mqlt_count_di_periods[8]),
          createTicketData("Process Issue", mqlt_count_pi_periods[8]),
          createTicketData("Training Issue", mqlt_count_ti_periods[8]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[8]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[8]),
        ]
      ),
      createDataS(
        "Month 10",
        mlt_count_ti_periods[9] +
          mlt_count_ds_periods[9] +
          mlt_count_pdc_periods[9],
        mqnt_count_yi_periods[9] + mqnt_count_se_periods[9],
        mqlt_count_mi_periods[9] +
          mqlt_count_di_periods[9] +
          mqlt_count_pi_periods[9] +
          mqlt_count_ti_periods[9],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[9]),
          createTicketData("Demand Surge", mlt_count_ds_periods[9]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[9]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[9]),
          createTicketData("Design Issue", mqlt_count_di_periods[9]),
          createTicketData("Process Issue", mqlt_count_pi_periods[9]),
          createTicketData("Training Issue", mqlt_count_ti_periods[9]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[9]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[9]),
        ]
      ),
      createDataS(
        "Month 11",
        mlt_count_ti_periods[10] +
          mlt_count_ds_periods[10] +
          mlt_count_pdc_periods[10],
        mqnt_count_yi_periods[10] + mqnt_count_se_periods[10],
        mqlt_count_mi_periods[10] +
          mqlt_count_di_periods[10] +
          mqlt_count_pi_periods[10] +
          mqlt_count_ti_periods[10],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[10]),
          createTicketData("Demand Surge", mlt_count_ds_periods[10]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[10]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[10]),
          createTicketData("Design Issue", mqlt_count_di_periods[10]),
          createTicketData("Process Issue", mqlt_count_pi_periods[10]),
          createTicketData("Training Issue", mqlt_count_ti_periods[10]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[10]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[10]),
        ]
      ),
      createDataS(
        "Month 12",
        mlt_count_ti_periods[11] +
          mlt_count_ds_periods[11] +
          mlt_count_pdc_periods[11],
        mqnt_count_yi_periods[11] + mqnt_count_se_periods[11],
        mqlt_count_mi_periods[11] +
          mqlt_count_di_periods[11] +
          mqlt_count_pi_periods[11] +
          mqlt_count_ti_periods[11],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[11]),
          createTicketData("Demand Surge", mlt_count_ds_periods[11]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[11]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[11]),
          createTicketData("Design Issue", mqlt_count_di_periods[11]),
          createTicketData("Process Issue", mqlt_count_pi_periods[11]),
          createTicketData("Training Issue", mqlt_count_ti_periods[11]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[11]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[11]),
        ]
      ),
    ];

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
                  Change to real data
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
                  <TableRow>
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
                  <TableRow>
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
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.num}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* SIMULATION RESULTS */}
          <br />
          <br />
          <Title>Simulation Results</Title>
          <br />
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Month</TableCell>
                  <TableCell align="right">Issues MLT</TableCell>
                  <TableCell align="right">Issues MQNT</TableCell>
                  <TableCell align="right">Issues MQLT</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return <Row key={row.name} row={row} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </div>
    );
  } else if (data === "Database") {
    sumMaterialLeadTimeDemand = 0;
    sumMaterialLeadTimeDesign = 0;
    sumMaterialLeadTimeTransport = 0;
    sumMaterialQualityManufaturing = 0;
    sumMaterialQualityDesign = 0;
    sumMaterialQualityProcess = 0;
    sumMaterialQualityTraining = 0;
    sumMaterialQuantityYield = 0;
    sumMaterialQuantityScrap = 0;

    sumMaterialLeadTime = 0;
    sumMaterialQuality = 0;
    sumMaterialQuantity = 0;

    tickets.forEach(function (valor) {
      switch (valor.issueReason) {
        case "Transport Issue":
          sumMaterialLeadTimeTransport++;
          sumMaterialLeadTime++;
          break;
        case "Demand Surge":
          sumMaterialLeadTimeDemand++;
          sumMaterialLeadTime++;
          break;
        case "Product Design Change":
          sumMaterialLeadTimeDesign++;
          sumMaterialLeadTime++;
          break;
        case "Yield Issue":
          sumMaterialQuantityYield++;
          sumMaterialQuantity++;
          break;
        case "Scrap due to ECO":
          sumMaterialQuantityScrap++;
          sumMaterialQuantity++;
          break;
        case "Manufacturing Issue":
          sumMaterialQualityManufaturing++;
          sumMaterialQuality++;
          break;
        case "Design Issue":
          sumMaterialQualityDesign++;
          sumMaterialQuality++;
          break;
        case "Process Issue":
          sumMaterialQualityProcess++;
          sumMaterialQuality++;
          break;
        case "Training Issue":
          sumMaterialQualityTraining++;
          sumMaterialQuality++;
          break;
      }
    });

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

    //Getting periods of calculations
    mlt_count_ti_periods = [];
    mlt_count_ds_periods = [];
    mlt_count_pdc_periods = [];
    mqnt_count_yi_periods = [];
    mqnt_count_se_periods = [];
    mqlt_count_mi_periods = [];
    mqlt_count_di_periods = [];
    mqlt_count_pi_periods = [];
    mqlt_count_ti_periods = [];

    var mlt_risk_db = [
      [
        sumMaterialLeadTimeDemand / sumMaterialLeadTime - 0.0666,
        sumMaterialLeadTimeDesign / sumMaterialLeadTime - 0.0666,
        sumMaterialLeadTimeTransport / sumMaterialLeadTime - 0.0666,
        0.2,
      ],
      [],
    ];
    var mqnt_risk_db = [
      [
        sumMaterialQuantityYield / sumMaterialQuantity - 0.1666,
        sumMaterialQuantityScrap / sumMaterialQuantity - 0.1666,
        0.3333,
      ],
      [0, 0, 1],
    ];
    var mqlt_risk_db = [
      [
        sumMaterialQualityManufaturing / sumMaterialQuality - 0.05,
        sumMaterialQualityDesign / sumMaterialQuality - 0.05,
        sumMaterialQualityProcess / sumMaterialQuality - 0.05,
        sumMaterialQualityTraining / sumMaterialQuality - 0.05,
        0.2,
      ],
      [0, 0, 0, 0, 1],
    ];

    sumMaterialLeadTimeDemand = 0;
    sumMaterialLeadTimeDesign = 0;
    sumMaterialLeadTimeTransport = 0;
    sumMaterialQualityManufaturing = 0;
    sumMaterialQualityDesign = 0;
    sumMaterialQualityProcess = 0;
    sumMaterialQualityTraining = 0;
    sumMaterialQuantityYield = 0;
    sumMaterialQuantityScrap = 0;

    sumMaterialLeadTime = 0;
    sumMaterialQuality = 0;
    sumMaterialQuantity = 0;

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

      for (var i = 0; i < 250; i++) {
        var values = [];
        values = bayesian(mlt_risk_db, mqnt_risk_db, mqlt_risk_db);

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

    const createDataS = (month, numMlt, numMqnt, numMqlt, details) => {
      return {
        month,
        numMlt,
        numMqnt,
        numMqlt,
        total: numMlt + numMqnt + numMqlt,
        details, // tickets of week
      };
    };

    const createTicketData = (type, summary) => {
      return {
        type,
        summary,
      };
    };

    const rows = [
      createDataS(
        "Month 1",
        mlt_count_ti_periods[0] +
          mlt_count_ds_periods[0] +
          mlt_count_pdc_periods[0],
        mqnt_count_yi_periods[0] + mqnt_count_se_periods[0],
        mqlt_count_mi_periods[0] +
          mqlt_count_di_periods[0] +
          mqlt_count_pi_periods[0] +
          mqlt_count_ti_periods[0],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[0]),
          createTicketData("Demand Surge", mlt_count_ds_periods[0]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[0]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[0]),
          createTicketData("Design Issue", mqlt_count_di_periods[0]),
          createTicketData("Process Issue", mqlt_count_pi_periods[0]),
          createTicketData("Training Issue", mqlt_count_ti_periods[0]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[0]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[0]),
        ]
      ),
      createDataS(
        "Month 2",
        mlt_count_ti_periods[1] +
          mlt_count_ds_periods[1] +
          mlt_count_pdc_periods[1],
        mqnt_count_yi_periods[1] + mqnt_count_se_periods[1],
        mqlt_count_mi_periods[1] +
          mqlt_count_di_periods[1] +
          mqlt_count_pi_periods[1] +
          mqlt_count_ti_periods[1],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[1]),
          createTicketData("Demand Surge", mlt_count_ds_periods[1]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[1]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[1]),
          createTicketData("Design Issue", mqlt_count_di_periods[1]),
          createTicketData("Process Issue", mqlt_count_pi_periods[1]),
          createTicketData("Training Issue", mqlt_count_ti_periods[1]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[1]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[1]),
        ]
      ),
      createDataS(
        "Month 3",
        mlt_count_ti_periods[2] +
          mlt_count_ds_periods[2] +
          mlt_count_pdc_periods[2],
        mqnt_count_yi_periods[2] + mqnt_count_se_periods[2],
        mqlt_count_mi_periods[2] +
          mqlt_count_di_periods[2] +
          mqlt_count_pi_periods[2] +
          mqlt_count_ti_periods[2],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[2]),
          createTicketData("Demand Surge", mlt_count_ds_periods[2]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[2]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[2]),
          createTicketData("Design Issue", mqlt_count_di_periods[2]),
          createTicketData("Process Issue", mqlt_count_pi_periods[2]),
          createTicketData("Training Issue", mqlt_count_ti_periods[2]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[2]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[2]),
        ]
      ),
      createDataS(
        "Month 4",
        mlt_count_ti_periods[3] +
          mlt_count_ds_periods[3] +
          mlt_count_pdc_periods[3],
        mqnt_count_yi_periods[3] + mqnt_count_se_periods[3],
        mqlt_count_mi_periods[3] +
          mqlt_count_di_periods[3] +
          mqlt_count_pi_periods[3] +
          mqlt_count_ti_periods[3],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[3]),
          createTicketData("Demand Surge", mlt_count_ds_periods[3]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[3]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[3]),
          createTicketData("Design Issue", mqlt_count_di_periods[3]),
          createTicketData("Process Issue", mqlt_count_pi_periods[3]),
          createTicketData("Training Issue", mqlt_count_ti_periods[3]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[3]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[3]),
        ]
      ),
      createDataS(
        "Month 5",
        mlt_count_ti_periods[4] +
          mlt_count_ds_periods[4] +
          mlt_count_pdc_periods[4],
        mqnt_count_yi_periods[4] + mqnt_count_se_periods[4],
        mqlt_count_mi_periods[4] +
          mqlt_count_di_periods[4] +
          mqlt_count_pi_periods[4] +
          mqlt_count_ti_periods[4],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[4]),
          createTicketData("Demand Surge", mlt_count_ds_periods[4]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[4]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[4]),
          createTicketData("Design Issue", mqlt_count_di_periods[4]),
          createTicketData("Process Issue", mqlt_count_pi_periods[4]),
          createTicketData("Training Issue", mqlt_count_ti_periods[4]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[4]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[4]),
        ]
      ),
      createDataS(
        "Month 6",
        mlt_count_ti_periods[5] +
          mlt_count_ds_periods[5] +
          mlt_count_pdc_periods[5],
        mqnt_count_yi_periods[5] + mqnt_count_se_periods[5],
        mqlt_count_mi_periods[5] +
          mqlt_count_di_periods[5] +
          mqlt_count_pi_periods[5] +
          mqlt_count_ti_periods[5],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[5]),
          createTicketData("Demand Surge", mlt_count_ds_periods[5]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[5]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[5]),
          createTicketData("Design Issue", mqlt_count_di_periods[5]),
          createTicketData("Process Issue", mqlt_count_pi_periods[5]),
          createTicketData("Training Issue", mqlt_count_ti_periods[5]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[5]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[5]),
        ]
      ),
      createDataS(
        "Month 7",
        mlt_count_ti_periods[6] +
          mlt_count_ds_periods[6] +
          mlt_count_pdc_periods[6],
        mqnt_count_yi_periods[6] + mqnt_count_se_periods[6],
        mqlt_count_mi_periods[6] +
          mqlt_count_di_periods[6] +
          mqlt_count_pi_periods[6] +
          mqlt_count_ti_periods[6],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[6]),
          createTicketData("Demand Surge", mlt_count_ds_periods[6]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[6]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[6]),
          createTicketData("Design Issue", mqlt_count_di_periods[6]),
          createTicketData("Process Issue", mqlt_count_pi_periods[6]),
          createTicketData("Training Issue", mqlt_count_ti_periods[6]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[6]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[6]),
        ]
      ),
      createDataS(
        "Month 8",
        mlt_count_ti_periods[7] +
          mlt_count_ds_periods[7] +
          mlt_count_pdc_periods[7],
        mqnt_count_yi_periods[7] + mqnt_count_se_periods[7],
        mqlt_count_mi_periods[7] +
          mqlt_count_di_periods[7] +
          mqlt_count_pi_periods[7] +
          mqlt_count_ti_periods[7],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[7]),
          createTicketData("Demand Surge", mlt_count_ds_periods[7]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[7]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[7]),
          createTicketData("Design Issue", mqlt_count_di_periods[7]),
          createTicketData("Process Issue", mqlt_count_pi_periods[7]),
          createTicketData("Training Issue", mqlt_count_ti_periods[7]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[7]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[7]),
        ]
      ),
      createDataS(
        "Month 9",
        mlt_count_ti_periods[8] +
          mlt_count_ds_periods[8] +
          mlt_count_pdc_periods[8],
        mqnt_count_yi_periods[8] + mqnt_count_se_periods[8],
        mqlt_count_mi_periods[8] +
          mqlt_count_di_periods[8] +
          mqlt_count_pi_periods[8] +
          mqlt_count_ti_periods[8],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[8]),
          createTicketData("Demand Surge", mlt_count_ds_periods[8]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[8]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[8]),
          createTicketData("Design Issue", mqlt_count_di_periods[8]),
          createTicketData("Process Issue", mqlt_count_pi_periods[8]),
          createTicketData("Training Issue", mqlt_count_ti_periods[8]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[8]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[8]),
        ]
      ),
      createDataS(
        "Month 10",
        mlt_count_ti_periods[9] +
          mlt_count_ds_periods[9] +
          mlt_count_pdc_periods[9],
        mqnt_count_yi_periods[9] + mqnt_count_se_periods[9],
        mqlt_count_mi_periods[9] +
          mqlt_count_di_periods[9] +
          mqlt_count_pi_periods[9] +
          mqlt_count_ti_periods[9],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[9]),
          createTicketData("Demand Surge", mlt_count_ds_periods[9]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[9]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[9]),
          createTicketData("Design Issue", mqlt_count_di_periods[9]),
          createTicketData("Process Issue", mqlt_count_pi_periods[9]),
          createTicketData("Training Issue", mqlt_count_ti_periods[9]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[9]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[9]),
        ]
      ),
      createDataS(
        "Month 11",
        mlt_count_ti_periods[10] +
          mlt_count_ds_periods[10] +
          mlt_count_pdc_periods[10],
        mqnt_count_yi_periods[10] + mqnt_count_se_periods[10],
        mqlt_count_mi_periods[10] +
          mqlt_count_di_periods[10] +
          mqlt_count_pi_periods[10] +
          mqlt_count_ti_periods[10],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[10]),
          createTicketData("Demand Surge", mlt_count_ds_periods[10]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[10]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[10]),
          createTicketData("Design Issue", mqlt_count_di_periods[10]),
          createTicketData("Process Issue", mqlt_count_pi_periods[10]),
          createTicketData("Training Issue", mqlt_count_ti_periods[10]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[10]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[10]),
        ]
      ),
      createDataS(
        "Month 12",
        mlt_count_ti_periods[11] +
          mlt_count_ds_periods[11] +
          mlt_count_pdc_periods[11],
        mqnt_count_yi_periods[11] + mqnt_count_se_periods[11],
        mqlt_count_mi_periods[11] +
          mqlt_count_di_periods[11] +
          mqlt_count_pi_periods[11] +
          mqlt_count_ti_periods[11],
        [
          createTicketData("Transport Issue", mlt_count_ti_periods[11]),
          createTicketData("Demand Surge", mlt_count_ds_periods[11]),
          createTicketData("Product Design Change", mlt_count_pdc_periods[11]),
          createTicketData("Manufacturing Issue", mqlt_count_mi_periods[11]),
          createTicketData("Design Issue", mqlt_count_di_periods[11]),
          createTicketData("Process Issue", mqlt_count_pi_periods[11]),
          createTicketData("Training Issue", mqlt_count_ti_periods[11]),
          createTicketData("Yield Issue", mqnt_count_yi_periods[11]),
          createTicketData("Scrap due to ECO", mqnt_count_se_periods[11]),
        ]
      ),
    ];

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClick}>
          Change to simulated data
        </Button>
        <br />
        <br />
        <React.Fragment>
          <Title>Real data: Lead Time Issues</Title>
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
                  <TableRow>
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
          <Title>Real data: Quality Issues</Title>
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
                  <TableRow>
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
          <Title>Real data: Quantity Issues</Title>
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
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.num}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* SIMULATION RESULTS */}
          <br />
          <br />
          <Title>Simulation Results</Title>
          <br />
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Month</TableCell>
                  <TableCell align="right">Issues MLT</TableCell>
                  <TableCell align="right">Issues MQNT</TableCell>
                  <TableCell align="right">Issues MQLT</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return <Row key={row.name} row={row} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </div>
    );
  }
}
