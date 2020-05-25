import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TableStats = () => {
  const classes = useStyles;

  const [rows, setRows] = useState({
    regression: {
      materialLeadTime: {
        transportIssue: [],
        demandSurge: [],
        productDesignChange: []
      },
      materialQuantity: {
        yieldIssue: [],
        scrapDueToEco: [],
      },
      materialQuality: {
        manufacturingIssue: [],
        designIssue: [],
        processIssue: [],
        trainingIssue: []
      }
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/simulation");
      console.log(res.data);
      setRows(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    fetchItems()
    
  }, []);

  if (loading) {
    return <h1>Loading...</h1>
  }

  const { regression } = rows;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Problem</TableCell>
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>4</TableCell>
            <TableCell>5</TableCell>
            <TableCell>6</TableCell>
            <TableCell>7</TableCell>
            <TableCell>8</TableCell>
            <TableCell>9</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover key={1}>
            <TableCell component="th" scope="row">Transport Issue</TableCell>
            <TableCell>{regression.materialLeadTime.transportIssue[0]}</TableCell>
            <TableCell>{regression.materialLeadTime.transportIssue[1]}</TableCell>
            <TableCell>{regression.materialLeadTime.transportIssue[2]}</TableCell>
            <TableCell>{regression.materialLeadTime.transportIssue[3]}</TableCell>
            <TableCell>{regression.materialLeadTime.transportIssue[4]}</TableCell>
            <TableCell>{regression.materialLeadTime.transportIssue[5]}</TableCell>
            <TableCell>{regression.materialLeadTime.transportIssue[6]}</TableCell>
            <TableCell>{regression.materialLeadTime.transportIssue[7]}</TableCell>
            <TableCell>{regression.materialLeadTime.transportIssue[8]}</TableCell>
            <TableCell>{regression.materialLeadTime.transportIssue[9]}</TableCell>
          </TableRow>
          <TableRow hover key={2}>
            <TableCell component="th" scope="row">Demand Surge</TableCell>
            <TableCell>{regression.materialLeadTime.demandSurge[0]}</TableCell>
            <TableCell>{regression.materialLeadTime.demandSurge[1]}</TableCell>
            <TableCell>{regression.materialLeadTime.demandSurge[2]}</TableCell>
            <TableCell>{regression.materialLeadTime.demandSurge[3]}</TableCell>
            <TableCell>{regression.materialLeadTime.demandSurge[4]}</TableCell>
            <TableCell>{regression.materialLeadTime.demandSurge[5]}</TableCell>
            <TableCell>{regression.materialLeadTime.demandSurge[6]}</TableCell>
            <TableCell>{regression.materialLeadTime.demandSurge[7]}</TableCell>
            <TableCell>{regression.materialLeadTime.demandSurge[8]}</TableCell>
            <TableCell>{regression.materialLeadTime.demandSurge[9]}</TableCell>
          </TableRow>
          <TableRow hover key={3}>
            <TableCell component="th" scope="row">Product Design Change</TableCell>
            <TableCell>{regression.materialLeadTime.productDesignChange[0]}</TableCell>
            <TableCell>{regression.materialLeadTime.productDesignChange[1]}</TableCell>
            <TableCell>{regression.materialLeadTime.productDesignChange[2]}</TableCell>
            <TableCell>{regression.materialLeadTime.productDesignChange[3]}</TableCell>
            <TableCell>{regression.materialLeadTime.productDesignChange[4]}</TableCell>
            <TableCell>{regression.materialLeadTime.productDesignChange[5]}</TableCell>
            <TableCell>{regression.materialLeadTime.productDesignChange[6]}</TableCell>
            <TableCell>{regression.materialLeadTime.productDesignChange[7]}</TableCell>
            <TableCell>{regression.materialLeadTime.productDesignChange[8]}</TableCell>
            <TableCell>{regression.materialLeadTime.productDesignChange[9]}</TableCell>
          </TableRow>
          <TableRow hover key={4}>
            <TableCell component="th" scope="row">Yield Issue</TableCell>
            <TableCell>{regression.materialQuantity.yieldIssue[0]}</TableCell>
            <TableCell>{regression.materialQuantity.yieldIssue[1]}</TableCell>
            <TableCell>{regression.materialQuantity.yieldIssue[2]}</TableCell>
            <TableCell>{regression.materialQuantity.yieldIssue[3]}</TableCell>
            <TableCell>{regression.materialQuantity.yieldIssue[4]}</TableCell>
            <TableCell>{regression.materialQuantity.yieldIssue[5]}</TableCell>
            <TableCell>{regression.materialQuantity.yieldIssue[6]}</TableCell>
            <TableCell>{regression.materialQuantity.yieldIssue[7]}</TableCell>
            <TableCell>{regression.materialQuantity.yieldIssue[8]}</TableCell>
            <TableCell>{regression.materialQuantity.yieldIssue[9]}</TableCell>
          </TableRow>
          <TableRow hover key={5}>
            <TableCell component="th" scope="row">Scrap Due to Eco</TableCell>
            <TableCell>{regression.materialQuantity.scrapDueToEco[0]}</TableCell>
            <TableCell>{regression.materialQuantity.scrapDueToEco[1]}</TableCell>
            <TableCell>{regression.materialQuantity.scrapDueToEco[2]}</TableCell>
            <TableCell>{regression.materialQuantity.scrapDueToEco[3]}</TableCell>
            <TableCell>{regression.materialQuantity.scrapDueToEco[4]}</TableCell>
            <TableCell>{regression.materialQuantity.scrapDueToEco[5]}</TableCell>
            <TableCell>{regression.materialQuantity.scrapDueToEco[6]}</TableCell>
            <TableCell>{regression.materialQuantity.scrapDueToEco[7]}</TableCell>
            <TableCell>{regression.materialQuantity.scrapDueToEco[8]}</TableCell>
            <TableCell>{regression.materialQuantity.scrapDueToEco[9]}</TableCell>
          </TableRow>
          <TableRow hover key={6}>
            <TableCell component="th" scope="row">Manufacturing Issue</TableCell>
            <TableCell>{regression.materialQuality.manufacturingIssue[0]}</TableCell>
            <TableCell>{regression.materialQuality.manufacturingIssue[1]}</TableCell>
            <TableCell>{regression.materialQuality.manufacturingIssue[2]}</TableCell>
            <TableCell>{regression.materialQuality.manufacturingIssue[3]}</TableCell>
            <TableCell>{regression.materialQuality.manufacturingIssue[4]}</TableCell>
            <TableCell>{regression.materialQuality.manufacturingIssue[5]}</TableCell>
            <TableCell>{regression.materialQuality.manufacturingIssue[6]}</TableCell>
            <TableCell>{regression.materialQuality.manufacturingIssue[7]}</TableCell>
            <TableCell>{regression.materialQuality.manufacturingIssue[8]}</TableCell>
            <TableCell>{regression.materialQuality.manufacturingIssue[9]}</TableCell>
          </TableRow>
          <TableRow hover key={7}>
            <TableCell component="th" scope="row">Design Issue</TableCell>
            <TableCell>{regression.materialQuality.designIssue[0]}</TableCell>
            <TableCell>{regression.materialQuality.designIssue[1]}</TableCell>
            <TableCell>{regression.materialQuality.designIssue[2]}</TableCell>
            <TableCell>{regression.materialQuality.designIssue[3]}</TableCell>
            <TableCell>{regression.materialQuality.designIssue[4]}</TableCell>
            <TableCell>{regression.materialQuality.designIssue[5]}</TableCell>
            <TableCell>{regression.materialQuality.designIssue[6]}</TableCell>
            <TableCell>{regression.materialQuality.designIssue[7]}</TableCell>
            <TableCell>{regression.materialQuality.designIssue[8]}</TableCell>
            <TableCell>{regression.materialQuality.designIssue[9]}</TableCell>
          </TableRow>
          <TableRow hover key={8}>
            <TableCell component="th" scope="row">Process Issue</TableCell>
            <TableCell>{regression.materialQuality.processIssue[0]}</TableCell>
            <TableCell>{regression.materialQuality.processIssue[1]}</TableCell>
            <TableCell>{regression.materialQuality.processIssue[2]}</TableCell>
            <TableCell>{regression.materialQuality.processIssue[3]}</TableCell>
            <TableCell>{regression.materialQuality.processIssue[4]}</TableCell>
            <TableCell>{regression.materialQuality.processIssue[5]}</TableCell>
            <TableCell>{regression.materialQuality.processIssue[6]}</TableCell>
            <TableCell>{regression.materialQuality.processIssue[7]}</TableCell>
            <TableCell>{regression.materialQuality.processIssue[8]}</TableCell>
            <TableCell>{regression.materialQuality.processIssue[9]}</TableCell>
          </TableRow>
          <TableRow hover key={9}>
            <TableCell component="th" scope="row">Training Issue</TableCell>
            <TableCell>{regression.materialQuality.trainingIssue[0]}</TableCell>
            <TableCell>{regression.materialQuality.trainingIssue[1]}</TableCell>
            <TableCell>{regression.materialQuality.trainingIssue[2]}</TableCell>
            <TableCell>{regression.materialQuality.trainingIssue[3]}</TableCell>
            <TableCell>{regression.materialQuality.trainingIssue[4]}</TableCell>
            <TableCell>{regression.materialQuality.trainingIssue[5]}</TableCell>
            <TableCell>{regression.materialQuality.trainingIssue[6]}</TableCell>
            <TableCell>{regression.materialQuality.trainingIssue[7]}</TableCell>
            <TableCell>{regression.materialQuality.trainingIssue[8]}</TableCell>
            <TableCell>{regression.materialQuality.trainingIssue[9]}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableStats;
