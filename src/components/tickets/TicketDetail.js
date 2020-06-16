import React, { useState, useEffect, Fragment } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import { Typography, Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { NavLink } from 'react-router-dom';
import { red, yellow } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  // css query selector '&' means this, '*' means all, '& > *': select all elements where the parent is this (root)
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}));

const EditButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[700]),
    backgroundColor: yellow[700],
    '&:hover': {
      backgroundColor: yellow[700],
    },
  },
}))(Button);

const DeleteButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    '&:hover': {
      backgroundColor: red[900],
    },
  },
}))(Button);

export default function TicketDetail({ match }) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    try {
      const data = await fetch(
        `https://cisco-project.herokuapp.com/api/tickets/${match.params.id}`
      );
      const item = await data.json();
      console.log(item);
      setIsLoaded(true);
      setItem(item);
    } catch (err) {
      setIsLoaded(true);
      setError(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const {
      numberId,
      impactedUser,
      subclass,
      category,
      state,
      summary,
      causingCI,
      assignedTo,
      openDate,
      assignedDate,
      resolutionDate,
      closedDate,
      scalationDate,
      issueCategory,
      issueReason,
      notes,
    } = item;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={6} className={classes.button}>
            <Button variant="contained">Back</Button>
          </Grid>
          <Grid item container xs={6}  justify="flex-end">
            <Grid item xs={3} className={classes.button}>
              <EditButton variant="contained" fullWidth>Edit</EditButton>
            </Grid>
            <Grid item xs={3} className={classes.button}>
              <DeleteButton variant="contained" fullWidth>Delete</DeleteButton>
            </Grid>
          </Grid>
        </Grid>
        <Paper>
          <Grid
            container
            justify="center"
            spacing={1}
          >
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Ticket Number:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {numberId}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Impacted User:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {impactedUser}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Subclass:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {subclass}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Category
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {category}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                State:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {state}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Summary:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {summary}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Causing CI:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {causingCI}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Assigned To:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {assignedTo}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Open Date:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {openDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Assigned Date:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {assignedDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Resolution Date:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {resolutionDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Closed Date:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {closedDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Scalation Date:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {scalationDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Issue Category:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {issueCategory}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Issue Reason:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {issueReason}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' color='textPrimary' variant='body2'>
                Notes:
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='left' color='textPrimary' variant='body2'>
                {notes}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>

    );
  }
}
