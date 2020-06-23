import React, { useState, useEffect, useContext } from "react";
import Title from "../Title";
import Create from "./Dialogs/Create";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Icon from "@material-ui/core/Icon";

import TicketContext from '../../context/ticket/ticketContext';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Tickets() {
  const classes = useStyles();

  const ticketContext = useContext(TicketContext);

  const { tickets, getTickets, loading } = ticketContext;
  

  useEffect(() => {
    getTickets();
  }, []);
  
  
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <Title>Recent Tickets</Title>
        <Grid container justify="flex-end" spacing={3}>
          <Create />
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Ticket Number</TableCell>
                  <TableCell align="right">Subclass</TableCell>
                  <TableCell align="right">Impacted User</TableCell>
                  <TableCell align="right">Issue Category</TableCell>
                  <TableCell align="right">Issue Reason</TableCell>
                  <TableCell align="right">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow hover key={ticket.numberId}>
                    <TableCell component="th" scope="row">
                      {ticket.numberId}
                    </TableCell>
                    <TableCell align="right">{ticket.subclass}</TableCell>
                    <TableCell align="right">{ticket.impactedUser}</TableCell>
                    <TableCell align="right">{ticket.issueCategory}</TableCell>
                    <TableCell align="right">{ticket.issueReason}</TableCell>
                    <TableCell align="right">
                      <NavLink
                        className="nav-link-item"
                        to={`/ticket/${ticket._id}`}
                      >
                        <Icon>info</Icon>
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </React.Fragment>
    );
  }
}
