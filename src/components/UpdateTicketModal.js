import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

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
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary
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
     <Grid container spacing={4}>
        <Grid item xs={4}>
                <TextField id="standard-basic" label="NumberID" />
                <p> </p>
            
        </Grid>
        <Grid item xs={6}>
          
                <TextField id="standard-basic" label="Impacted User" />
                <p> </p>
           
        </Grid>
        <Grid item xs={4}>
           
                <TextField id="standard-basic" label="Subclass" />
                <p> </p>
            
        </Grid>
        <Grid item xs={4}>
            
                <TextField id="standard-basic" label="Category" />
                <p> </p>
            
        </Grid>
        <Grid item xs={4}>
           
                <TextField id="standard-basic" label="State" />
                <p> </p>
            
        </Grid>
        <Grid item xs={4}>
            
                <TextField id="standard-basic" label="Summary" />
                <p> </p>
           
        </Grid>
        <Grid item xs={4}>
            
                <TextField id="standard-basic" label="Causing CI" />
                <p> </p>
            
        </Grid>
        <Grid item xs={4}>
            
                <TextField id="standard-basic" label="Assigned To" />
                <p> </p>
            
        </Grid>
        <Grid item xs={4}>
           
                <TextField id="standard-basic" label="Open Date" />
                <p> </p>
           
        </Grid>
        <Grid item xs={6}>
           
                <TextField id="standard-basic" label="Assigned Date" />
                <p> </p>
           
        </Grid>
        <Grid item xs={6}>
            
                <TextField id="standard-basic" label="Resolution Date" />
                <p> </p>
            
        </Grid>
        <Grid item xs={6}>
            
                <TextField id="standard-basic" label="Scalation Date" />
                <p> </p>
            
        </Grid>
        <Grid item xs={6}>
            
                <TextField id="standard-basic" label="Issue Category" />
                <p>  </p>
            
            
        </Grid>
        <Grid item xs={6}>
            
                <TextField id="standard-basic" label="Issue Reason" />
                <p> </p>
            
        </Grid>
        <Grid item xs={4}>
           
                <TextField id="standard-basic" label="Notes" />
                <p> </p>
            
        </Grid>
    </Grid>
    <UpdateTicketModal />
    </div>
  );

  return (
    <div>
      <Button type="button" onClick={handleOpen}
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Update Ticket
          </Button>
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