import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

// Generate Order Data
function createData(numberID, sublcass, category, lifecycle, description, incorpDate, releaseDate, effectivityDate, complianceCalculatedDate, overallCompliance,  levelComplianceIndicator, complianceRollUp, productHierarchy, user) {
  return { numberID, sublcass, category, lifecycle, description, incorpDate, releaseDate, effectivityDate, complianceCalculatedDate, overallCompliance,  levelComplianceIndicator, complianceRollUp, productHierarchy, user};
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>numberID</TableCell>
            <TableCell>subclass</TableCell>
            <TableCell>category</TableCell>
            <TableCell>lifecycle</TableCell>
            <TableCell>description</TableCell>
            <TableCell>incorporation date</TableCell>
            <TableCell>release date</TableCell>
            <TableCell>effectivity date</TableCell>
            <TableCell>compliance calculated date</TableCell>
            <TableCell>overall compliance</TableCell>
            <TableCell>level compliance indicator</TableCell>
            <TableCell>compliance rolll up</TableCell>
            <TableCell>product hierarchy</TableCell>
            <TableCell>user</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.numberID}>
              <TableCell>{row.subclass}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.lifecycle}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.incorpDate}</TableCell>
              <TableCell>{row.releaseDate}</TableCell>
              <TableCell>{row.effectivityDate}</TableCell>
              <TableCell>{row.complianceCalculatedDate}</TableCell>
              <TableCell>{row.overallCompliance}</TableCell>
              <TableCell>{row.levelComplianceIndicator}</TableCell>
              <TableCell>{row.complianceRollUp}</TableCell>
              <TableCell>{row.productHierarchy}</TableCell>
              <TableCell>{row.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
