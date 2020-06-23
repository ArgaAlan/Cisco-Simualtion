import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import { yellow } from "@material-ui/core/colors";

import TicketContext from "../../../context/ticket/ticketContext";
import { issueCategories, components, subclasses, issueCategory } from "./options";


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

function Update({ ticket }) {
  const classes = useStyles();
  const [selectedTicket, setSelectedTicket] = useState({
    inChargeUser: {},
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
    console.log(ticket);
    setSelectedTicket(ticket);
    // eslint-disable-next-line
  }, []);

  const handleUpdate = () => {
    putTicket({
      ...selectedTicket,
      issueCategory: issueCategory(selectedTicket.issueReason).type,
      issueReason: issueCategory(selectedTicket.issueReason).label
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
      >
        <DialogTitle id="form-dialog-title">Update Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out this form.</DialogContentText>
          <div className={classes.root}>
            <React.Fragment>
              {/* COMPONENT */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Component"
                type="text"
                value={selectedTicket.component}
                onChange={handleChange("component")}
                select
              >
                {components.map((component) => (
                  <MenuItem key={component} value={component}>
                    {component}
                  </MenuItem>
                ))}
              </TextField>
              {/* SUBCLASS*/}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                margin="normal"
                label="Subclass"
                type="text"
                value={selectedTicket.subclass}
                onChange={handleChange("subclass")}
                select
              >
                {subclasses.map((subclass) => (
                  <MenuItem key={subclass.value} value={subclass.value}>
                    {subclass.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              {/* SUMMARY */}
              <TextField
                className={clsx(classes.margin, classes.textField)}
                autoFocus
                margin="normal"
                label="Description of problem"
                type="text"
                value={selectedTicket.summary}
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
                value={selectedTicket.notes}
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
                value={selectedTicket.issueReason}
                onChange={handleChange("issueReason")}
              >
                {issueCategories.map((issue) => (
                  <MenuItem key={issue.value} value={issue.value}>
                    {issue.label}
                  </MenuItem>
                ))}
              </TextField>  
            </React.Fragment>              
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
