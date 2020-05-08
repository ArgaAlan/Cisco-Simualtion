import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  navLink: {
    textDecoration: 'none',
  },
}));

export default function Tickets() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const data = await fetch("http://localhost:8000/api/ticket-list/");
      const items = await data.json();
      console.log(items);
      setIsLoaded(true);
      setItems(items);
    } catch(error) {
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
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>numberID</TableCell>
              <TableCell>subclass</TableCell>
              <TableCell>category</TableCell>
              <TableCell>lifecycle</TableCell>
              <TableCell>description</TableCell>
              {/* <TableCell>incorporation date</TableCell>
              <TableCell>release date</TableCell>
              <TableCell>effectivity date</TableCell>
              <TableCell>compliance calculated date</TableCell>
              <TableCell>overall compliance</TableCell>
              <TableCell>level compliance indicator</TableCell>
              <TableCell>compliance rolll up</TableCell>
              <TableCell>product hierarchy</TableCell>
              <TableCell>user</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.numberID}>
                <TableCell component="th" scope="row">
                  <NavLink className={classes.navLink} to={`/ticket/${item.numberID}`}>
                    <Button color="primary">
                      {item.numberID}
                    </Button>
                  </NavLink>
                </TableCell>
                <TableCell>{item.subclass}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.lifecycle}</TableCell>
                <TableCell>{item.description}</TableCell>
                {/* <TableCell>{item.incorpDate}</TableCell>
                <TableCell>{item.releaseDate}</TableCell>
                <TableCell>{item.effectivityDate}</TableCell>
                <TableCell>{item.complianceCalculatedDate}</TableCell>
                <TableCell>{item.overallCompliance}</TableCell>
                <TableCell>{item.levelComplianceIndicator}</TableCell>
                <TableCell>{item.complianceRollUp}</TableCell>
                <TableCell>{item.productHierarchy}</TableCell>
                <TableCell>{item.user}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
  
}
