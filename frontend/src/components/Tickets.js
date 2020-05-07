import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Title from './Title';
import $ from 'jquery'

const rows = [];

$(document).ready(function() {
  $.ajax({
      type: "GET",
      url: "csvPrueba.csv",
      dataType: "text",
      success: function(data) {processData(data);}
   });
});


function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split(',');

  for (var i=1; i<allTextLines.length; i++) {
      var data = allTextLines[i].split(',');
      if (data.length === headers.length) {

          var tarr = [];
          for (var j=0; j<headers.length; j++) {
              tarr.push(headers[j]+":"+data[j]);
          }
          rows.push(tarr);
      }
  }
  // alert(lines);
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

function handleClick(e, item) {
  e.preventDefault();
  console.log('Item:', item);
}

export default function Orders() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8000/api/ticket-list/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('Result:', result);
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <Title>Recent Orders</Title>
        <TableContainer component={Paper}>
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
                    <Button color="primary" onClick={(e) => handleClick(e, item)}>
                      {item.numberID}
                    </Button>
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
        </TableContainer>
      </React.Fragment>
    );
  }
  
}
