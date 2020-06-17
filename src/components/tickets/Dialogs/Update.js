import React, { useState, useEffect } from "react";
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

function Update({ id }) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ticket, setTicket] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setTicket({ ...ticket, [prop]: event.target.value });
  };

  const fetchItem = async () => {
    try {
      console.log(id);
      const data = await fetch(
        `https://cisco-project.herokuapp.com/api/tickets/${id}`
      );
      const item = await data.json();
      console.log("//////////////////////////");
      console.log(item);
      console.log("//////////////////////////");
      setIsLoaded(true);
      setTicket(item);
    } catch (err) {
      setIsLoaded(true);
      setError(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const handleUpdate = () => {
    console.log(JSON.stringify(ticket));
    var url = `https://cisco-project.herokuapp.com/api/tickets/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
              />
              {/* USER IN CHARGE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="User In Charge"
                type="text"
                value="5ee7deacd48f247d80de541a"
                onChange={handleChange("inChargeUser")}
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
              {/* ASSIGNED DATE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Assigned Date"
                type="text"
                value={ticket.assignedDate}
                onChange={handleChange("assignedDate")}
              />
              {/* RESOLUTION DATE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Resolution Date"
                type="text"
                value={ticket.resolutionDate}
                onChange={handleChange("resolutionDate")}
              />
              {/* CLOSED DATE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Closed Date"
                type="text"
                value={ticket.closedDate}
                onChange={handleChange("closedDate")}
              />
              {/* SCALATION DATE */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Scalation Date"
                type="text"
                value={ticket.scalationDate}
                onChange={handleChange("scalationDate")}
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
