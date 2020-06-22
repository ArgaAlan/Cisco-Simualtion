import React, { useContext } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { Context } from "../../context/user/userContext";
import Loading from "../Loading";

import axios from "axios";

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
        productDesignChange: [],
      },
      materialQuantity: {
        yieldIssue: [],
        scrapDueToEco: [],
      },
      materialQuality: {
        manufacturingIssue: [],
        designIssue: [],
        processIssue: [],
        trainingIssue: [],
      },
    },
  });

  const [privilege, setPrivilege] = useContext(Context);

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
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (privilege == "Analyst" || privilege == "Admin") {
    return <Redirect to="" />;
  }

  const { regression } = rows;

  return <h1>Ticket Stats Here</h1>;
};

export default TableStats;
