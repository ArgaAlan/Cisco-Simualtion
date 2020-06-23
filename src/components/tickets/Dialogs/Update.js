import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import { Typography, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";
import { red, yellow } from "@material-ui/core/colors";

import TicketContext from '../../../context/ticket/ticketContext';

const EditButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[700]),
    backgroundColor: yellow[700],
    "&:hover": {
      backgroundColor: yellow[700],
    },
  },
}))(Button);

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

function Update(props) {
  const classes = useStyles();
  const [selectedTicket, setSelectedTicket] = useState({
    inChargeUser: {}
  });
  const [open, setOpen] = useState(false);
  
  const { putTicket } = useContext(TicketContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setSelectedTicket({ ...selectedTicket, [prop]: event.target.value });
  };

  useEffect(() => {
    setSelectedTicket(props.ticket);
    // eslint-disable-next-line
  }, []);

  const handleUpdate = () => {
    putTicket(selectedTicket);
    setOpen(false);
  };

  return (
    <div>
      <EditButton variant="contained" fullWidth onClick={handleClickOpen}>
        Edit
      </EditButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen
      >
        <DialogTitle id="form-dialog-title">Update Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out this form.</DialogContentText>
          <div className={classes.root}>
            <div>
              {/* ISSUE NUMBER */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Issue Number"
                type="text"
                InputProps={{
                  readOnly: true,
                }}
                value={selectedTicket.numberId}
              />
              {/* IMPACTED USER */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Impacted User"
                type="text"
                value={selectedTicket.impactedUser}
                onChange={handleChange("impactedUser")}
              />
              {/* USER IN CHARGE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="User In Charge"
                type="text"
                InputProps={{
                  readOnly: true,
                }}
                value={selectedTicket.inChargeUser.name}
                onChange={handleChange("inChargeUser")}
              />
              {/* COMPONENT */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Component"
                type="text"
                value={selectedTicket.component}
                onChange={handleChange("component")}
              />
              {/* SUBCLASS*/}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Subclass"
                type="text"
                value={selectedTicket.subclass}
                onChange={handleChange("subclass")}
              />
              {/* CATEGORY */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Category"
                type="text"
                value={selectedTicket.category}
                onChange={handleChange("category")}
              />
              {/* STATE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="State"
                type="text"
                value={selectedTicket.state}
                onChange={handleChange("state")}
              />
              {/* SUMMARY */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Summary"
                type="text"
                value={selectedTicket.summary}
                onChange={handleChange("summary")}
              />
              {/* CAUSING CI */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Causing CI"
                type="text"
                value={selectedTicket.causingCI}
                onChange={handleChange("causingCI")}
              />
              {/* ASSIGNED DATE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Assigned Date"
                type="text"
                value={selectedTicket.assignedDate ? selectedTicket.assignedDate : ''}
                onChange={handleChange("assignedDate")}
              />
              {/* RESOLUTION DATE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Resolution Date"
                type="text"
                value={selectedTicket.resolutionDate ? selectedTicket.resolutionDate : ''}
                onChange={handleChange("resolutionDate")}
              />
              {/* CLOSED DATE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Closed Date"
                type="text"
                value={selectedTicket.closedDate ? selectedTicket.closedDate : ''}
                onChange={handleChange("closedDate")}
              />
              {/* SCALATION DATE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Scalation Date"
                type="text"
                value={selectedTicket.scalationDate ? selectedTicket.scalationDate : ''}
                onChange={handleChange("scalationDate")}
              />
              {/* NOTES */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Notes"
                type="text"
                value={selectedTicket.notes}
                onChange={handleChange("notes")}
              />
              {/* ISSUE CATEGORY */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Issue Category"
                type="text"
                value={selectedTicket.issueCategory}
                onChange={handleChange("issueCategory")}
              />
              {/* ISSUE REASON */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Issue Reason"
                type="text"
                value={selectedTicket.issueReason}
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
            onClick={handleUpdate}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Update;