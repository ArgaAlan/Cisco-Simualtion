import React, { useState, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { useAuth0 } from "../../../react-auth0-spa";

import TicketContext from "../../../context/ticket/ticketContext";
import { simulationContext } from "../../../context/simulation/simulationContext";

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
}));

const Create = () => {
  const classes = useStyles();
  const { loading, user } = useAuth0();
  const { simulation, setSimulation } = useContext(simulationContext);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    mlt_risk: [[0.2, 0.2, 0.1, 0.5], []],
    mqnt_risk: [
      [0.3, 0.3, 0.4],
      [0, 0, 1],
    ],
    mqlt_risk: [
      [0.1, 0.05, 0.25, 0.4, 0.2],
      [0, 0, 0, 0, 1],
    ],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setTicket({ ...ticket, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    postTicket({
      ...ticket,
      numberId: `ISSUE-${ticket.numberId}`,
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Ticket
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen
      >
        <DialogTitle id="form-dialog-title">New Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out this form.</DialogContentText>
          <div className={classes.root}>
            <div>
              {/* ISSUE NUMBER */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Issue Number"
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">ISSUE-</InputAdornment>
                  ),
                }}
                value={ticket.numberId}
                onChange={handleChange("numberId")}
              />
              {/* IMPACTED USER */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Impacted User"
                type="text"
                value={ticket.impactedUser}
                onChange={handleChange("impactedUser")}
                InputProps={{
                  readOnly: true,
                }}
              />
              {/* COMPONENT */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Component"
                type="text"
                value={ticket.component}
                onChange={handleChange("component")}
              />
              {/* SUBCLASS*/}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Subclass"
                type="text"
                value={ticket.subclass}
                onChange={handleChange("subclass")}
              />
              {/* CATEGORY */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Category"
                type="text"
                value={ticket.category}
                onChange={handleChange("category")}
              />
              {/* STATE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="State"
                type="text"
                value={ticket.state}
                onChange={handleChange("state")}
              />
              {/* SUMMARY */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Summary"
                type="text"
                value={ticket.summary}
                onChange={handleChange("summary")}
              />
              {/* CAUSING CI */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Causing CI"
                type="text"
                value={ticket.causingCI}
                onChange={handleChange("causingCI")}
              />
              {/* NOTES */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Notes"
                type="text"
                value={ticket.notes}
                onChange={handleChange("notes")}
              />
              {/* ISSUE CATEGORY */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Issue Category"
                type="text"
                value={ticket.issueCategory}
                onChange={handleChange("issueCategory")}
              />
              {/* ISSUE REASON */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Issue Reason"
                type="text"
                value={ticket.issueReason}
                onChange={handleChange("issueReason")}
              />
            </div>
            {/* div */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
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
  );
};

export default Create;
