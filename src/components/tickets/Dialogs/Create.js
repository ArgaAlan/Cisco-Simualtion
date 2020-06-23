import React, { useState, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from "@material-ui/icons/Save";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import { useAuth0 } from "../../../react-auth0-spa";

import TicketContext from "../../../context/ticket/ticketContext";

import { issueCategories, components, subclasses, issueType } from './options';
import getRandomInt from '../../../utils/random';

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

  const ticketContext = useContext(TicketContext);

  const { postTicket, tickets } = ticketContext;

  

  const [numberIdError, setNumberIdError] = useState(false);
  const [open, setOpen] = useState(false);
  const [ticket, setTicket] = useState({
    numberId: "",
    impactedUser: user.email,
    inChargeUser: "5ee7deacd48f247d80de541a",
    component: "",
    subclass: "",
    category: "",
    state: "",
    summary: "",
    causingCI: "",
    openDate: new Date(),
    assignedDate: "",
    resolutionDate: "",
    closedDate: "",
    scalationDate: "",
    notes: "",
    issueCategory: "",
    issueReason: "",
    solved: false,
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
    console.log(ticket);
    console.log(tickets);
    let numberId = `ISSUE-${getRandomInt(1000,9999)}`;
    while (tickets.find(ticket => ticket.numberId === numberId)) {
      numberId = `ISSUE-${getRandomInt(1000,9999)}`;
    }
    postTicket({
      ...ticket,
      numberId,
      issueCategory: issueType(ticket.issueReason).type,
      issueCategory: issueType(ticket.issueReason).label,
      state: 'opened',
      causingCI: 'unknown',
      solved: false
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
      >
        <DialogTitle id="form-dialog-title">New Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out this form.</DialogContentText>
          <div className={classes.root}>
            <div>
              {/* COMPONENT */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Component"
                type="text"
                value={ticket.component}
                onChange={handleChange("component")}
                select
              >
                {components.map(component => 
                   <MenuItem key={component} value={component}>
                     {component}
                   </MenuItem>
                  )}
              </TextField>
              {/* SUBCLASS*/}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Subclass"
                type="text"
                value={ticket.subclass}
                onChange={handleChange("subclass")}
                select
              >
                {subclasses.map(subclass => 
                   <MenuItem key={subclass.value} value={subclass.value}>
                     {subclass.label}
                   </MenuItem>
                  )}
              </TextField>
              <br/>
              {/* SUMMARY */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Description of problem"
                type="text"
                value={ticket.summary}
                onChange={handleChange("summary")}
                multiline
                variant="outlined"
                rows={4}
              />
              {/* NOTES */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Additional notes"
                type="text"
                value={ticket.notes}
                onChange={handleChange("notes")}
                multiline
                variant="outlined"
                rows={4}
              />
              {/* ISSUE REASON */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                select
                helperText="Please select a reason"
                margin="normal"
                label="Issue Reason"
                type="text"
                value={ticket.issueReason}
                onChange={handleChange("issueReason")}
              >
                {issueCategories.map(issue => 
                   <MenuItem key={issue.value} value={issue.value}>
                     {issue.label}
                   </MenuItem>
                  )}
                <MenuItem key={'other'} value={'other'}>
                     {'Other'}
                   </MenuItem>
              </TextField>
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
