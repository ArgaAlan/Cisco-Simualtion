import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { red, yellow } from "@material-ui/core/colors";

export default function AlertDialog({ id }) {
  const DeleteButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[700]),
      backgroundColor: red[700],
      "&:hover": {
        backgroundColor: red[900],
      },
    },
  }))(Button);

  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ticket, setTicket] = useState([]);

  const fetchItem = async () => {
    try {
      console.log(id);
      const data = await fetch(
        `https://cisco-project.herokuapp.com/api/tickets/${id}`
      );
      const item = await data.json();
      console.log("DELETE FETCH");
      console.log(item);
      console.log("DELETE FETCH");
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log(JSON.stringify(ticket));
    var url = `https://cisco-project.herokuapp.com/api/tickets/${id}`;
    fetch(url, {
      method: "DELETE",
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
