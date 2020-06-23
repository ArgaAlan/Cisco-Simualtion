import React, { useState, useEffect, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { red, yellow } from "@material-ui/core/colors";

import TicketContext from '../../../context/ticket/ticketContext';

const DeleteButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    "&:hover": {
      backgroundColor: red[900],
    },
  },
}))(Button);

export default function AlertDialog({ ticketId, history }) {

  const [open, setOpen] = React.useState(false);

  const { deleteTicket } = useContext(TicketContext); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteTicket(ticketId)
    setOpen(false);
    history.push('/');
  };

  return (
    <div>
      <DeleteButton variant="contained" fullWidth onClick={handleClickOpen}>
        Delete
      </DeleteButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"DANGER DELETING TICKET"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will permantly remove this ticket. Are you sure you
            would like to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            ACCEPT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
