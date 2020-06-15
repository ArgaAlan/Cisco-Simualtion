import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { NavLink } from 'react-router-dom';

export default function TicketDetail({ match }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    try {
      const data = await fetch(
        `http://localhost:8000/api/tickets/${match.params.id}`
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
      numberID,
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
      <Paper>

        <Grid container>
          <Grid item xs={2}>
            <IconButton size='small' aria-label='go-back'>
              <NavLink to='/' className='nav-link-item'>
                <ArrowBackIcon />
              </NavLink>
            </IconButton>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={4}>
            <Typography variant='h6' display='inline'>Actions:</Typography>
            <IconButton edge='end' size='small' aria-label='edit'>
              <EditIcon />
            </IconButton>
            <IconButton edge='end' size='small' aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>

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
              {numberID}
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
    );
  }
}
