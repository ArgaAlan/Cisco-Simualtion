import React, { useState, useEffect } from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Tickets() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [rows, setRows] = useState([]);

  const fetchItems = async () => {
    try {
      const data = await fetch(
        "https://cisco-project.herokuapp.com/api/tickets"
      );
      const items = await data.json();
      console.log(items);
      setIsLoaded(true);
      setRows(items);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
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
                {rows.map((row) => (
                  <TableRow hover key={row.numberId}>
                    <TableCell component="th" scope="row">
                      {row.numberId}
                    </TableCell>
                    <TableCell align="right">{row.subclass}</TableCell>
                    <TableCell align="right">{row.impactedUser}</TableCell>
                    <TableCell align="right">{row.issueCategory}</TableCell>
                    <TableCell align="right">{row.issueReason}</TableCell>
                    <TableCell align="right">
                      <NavLink
                        className="nav-link-item"
                        to={`/ticket/${row._id}`}
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
