import React, { useState, useEffect } from 'react';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function Tickets() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [rows, setRows] = useState([]);

  const fetchItems = async () => {
    try {
      const data = await fetch("http://localhost:8000/api/tickets");
      const items = await data.json();
      console.log(items);
      setIsLoaded(true);
      setRows(items);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }

  useEffect(() => {
    fetchItems()
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <Title>Recent Tickets</Title>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Ticket Number</TableCell>
                <TableCell align="right">Subclass</TableCell>
                <TableCell align="right">Impacted User</TableCell>
                <TableCell align="right">Issue Category</TableCell>
                <TableCell align="right">Issue Reason</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell component="th" scope="row">
                    <NavLink className='nav-link-item' to={`/ticket/${row.id}`}>
                      {row.numberID}
                    </NavLink>
                  </TableCell>
                  <TableCell align="right">{row.subclass}</TableCell>
                  <TableCell align="right">{row.impactedUser}</TableCell>
                  <TableCell align="right">{row.issueCategory}</TableCell>
                  <TableCell align="right">{row.issueReason}</TableCell>
                  <TableCell align="right">
                    <IconButton edge='end' size='small' aria-label='info'>
                      <NavLink to={`/ticket/${row.id}`} className='nav-link-item'>
                        <InfoIcon color='action' />
                      </NavLink>
                    </IconButton>
                    <IconButton edge='end' size='small' aria-label='edit'>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge='end' size='small' aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}
