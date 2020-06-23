import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function UpdateTicketModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [ticket, setTicket] = React.useState({
    numberID: null,
    impactedUser: "",
    subclass: "",
    category: "",
    state: "",
    summary: "",
    causingCI: "",
    assignedTo: "",
    openDate: "",
    assignedDate: "",
    resolutionDate: "",
    closedDate: "",
    scalationDate: "",
    notes: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Update Ticket</h2>
      <p id="simple-modal-description">
        This is a modal where you can update your ticket
      </p>
     <Grid container spacing={12}>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="NumberID" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Impacted User" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Subclass" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Category" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="State" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Summary" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Causing CI" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Assigned To" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Open Date" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Assigned Date" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Resolution Date" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Scalation Date" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Issue Category" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Issue Reason" />
            </div>
        </Grid>
        <Grid item xs={6}>
            <div>
                <TextField id="standard-basic" label="Notes" />
            </div>
        </Grid>
    </Grid>
    <UpdateTicketModal />
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Update Ticket
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}