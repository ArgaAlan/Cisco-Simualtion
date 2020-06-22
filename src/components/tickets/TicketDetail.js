import React, { useState, useEffect, Fragment, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";
import Update from "./Dialogs/Update";
import Delete from "./Dialogs/Delete";
import { red, yellow } from "@material-ui/core/colors";
import { Context } from "../../context/user/userContext";
import Loading from "../Loading";

import TicketContext from "../../context/ticket/ticketContext";

const useStyles = makeStyles((theme) => ({
  // css query selector '&' means this, '*' means all, '& > *': select all elements where the parent is this (root)
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EditButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[700]),
    backgroundColor: yellow[700],
    "&:hover": {
      backgroundColor: yellow[700],
    },
  },
}))(Button);

const DeleteButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    "&:hover": {
      backgroundColor: red[900],
    },
  },
}))(Button);

export default function TicketDetail({ match, history }) {
  const classes = useStyles();

  const [privilege, setPrivilege] = useContext(Context);
  const { ticket, getTicket, loading } = useContext(TicketContext);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    getTicket(match.params.ticketId);
  }, []);

  if (!ticket) {
    console.log("aqui llega");
    history.push("/");
    return null;
  } else if (loading) {
    return <Loading />;
  } else {
    const {
      numberId,
      impactedUser,
      component,
      subclass,
      category,
      state,
      summary,
      causingCI,
      notes,
      issueCategory,
      issueReason,
      solved,
    } = ticket;

    var {
      openDate,
      assignedDate,
      resolutionDate,
      closedDate,
      scalationDate,
    } = ticket;

    if (openDate != null) {
      openDate = openDate.substring(0, 10);
    }
    if (assignedDate != null) {
      assignedDate = assignedDate.substring(0, 10);
    }
    if (resolutionDate != null) {
      resolutionDate = resolutionDate.substring(0, 10);
    }
    if (closedDate != null) {
      closedDate = closedDate.substring(0, 10);
    }
    if (scalationDate != null) {
      scalationDate = scalationDate.substring(0, 10);
    }

    var inChargeUser = "User not found";
    if (ticket.inChargeUser != null) {
      inChargeUser = ticket.inChargeUser.name;
    }

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Button variant="contained" onClick={goBack}>
              Back
            </Button>
          </Grid>
          <Grid item container xs={6} justify="flex-end" spacing={3}>
            {(privilege == "Solver" || privilege == "Admin") && (
              <Grid item xs={3}>
                <Update ticketId={ticket._id} ticket={ticket} />
              </Grid>
            )}
            <Grid item xs={3}>
              <Delete ticketId={ticket._id} ticket={ticket} history={history} />
            </Grid>
          </Grid>
        </Grid>
        <Paper>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Ticket Number:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {numberId}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Impacted User:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {impactedUser}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                In Charge User:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {inChargeUser}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Component:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {component}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Subclass:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {subclass}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Category
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {category}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                State:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {state}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Summary:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {summary}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Causing CI:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {causingCI}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Open Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {openDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Assigned Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {assignedDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Resolution Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {resolutionDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Closed Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {closedDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Scalation Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {scalationDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Issue Category:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {issueCategory}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Issue Reason:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {issueReason}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Solved:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {solved}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" color="textPrimary" variant="body2">
                Notes:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="left" color="textPrimary" variant="body2">
                {notes}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
