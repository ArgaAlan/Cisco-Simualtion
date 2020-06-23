import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
export default function FormPropsTextFields({ match }) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [ticket, setTicket] = useState({
    numberID: null,
    impactedUser: "",
    subclass: "",
    category: "",
    state: "",
    summary: "",
    causingCI: "",
    assignedTo: "",
    openDate: "",
    assignedDate: "",
    resolutionDate: "",
    closedDate: "",
    scalationDate: "",
    notes: "",
  });

  const fetchTicket = async () => {
    try {
      const data = await fetch(
        `http://localhost:8000/api/tickets/${match.params.id}`
      );
      const item = await data.json();
      console.log(item);
      setTicket({
        numberID: item.numberID,
        impactedUser: item.impactedUser,
        subclass: item.subclass,
        category: item.category,
        state: item.state,
        summary: item.summary,
        causingCI: item.causingCI,
        assignedTo: item.assignedTo,
        openDate: item.openDate,
        assignedDate: item.assignedDate,
        resolutionDate: item.resolutionDate,
        closedDate: item.closedDate,
        scalationDate: item.scalationDate,
        notes: item.notes,
      });
      console.log(ticket);
    } catch (err) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ticket.numberID) return;

    console.log(JSON.stringify(ticket));

    var csrftoken = getCookie("csrftoken");
    var url = "";
    if (error) {
      url = "http://localhost:8000/api/tickets/";
    } else {
      url = `http://localhost:8000/api/tickets/${match.params.id}/`;
    }
    console.log(url);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(ticket),
    })
      .then((response) => {
        setTicket({});
        console.log(JSON.stringify(ticket));
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
    setTicket({
      numberID: null,
      impactedUser: "",
      subclass: "",
      category: "",
      state: "",
      summary: "",
      causingCI: "",
      assignedTo: "",
      openDate: "",
      assignedDate: "",
      resolutionDate: "",
      closedDate: "",
      scalationDate: "",
      notes: "",
    });
  };

  return (
    <React.Fragment>
      <Title>Store Ticket</Title>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            required
            id="number-id"
            label="Number ID"
            value={ticket.numberID}
            onChange={(e) => {
              setTicket({ ...ticket, numberID: e.target.value });
            }}
          />
          <TextField
            id="impactedUser"
            label="Impacted User"
            value={ticket.impactedUser}
            onChange={(e) => {
              setTicket({ ...ticket, impactedUser: e.target.value });
            }}
          />
          <TextField
            id="subclass"
            label="Subclass"
            value={ticket.subclass}
            onChange={(e) => {
              setTicket({ ...ticket, subclass: e.target.value });
            }}
          />
          <TextField
            id="category"
            label="Category"
            value={ticket.category}
            onChange={(e) => {
              setTicket({ ...ticket, category: e.target.value });
            }}
          />
          <TextField
            id="state"
            label="State"
            value={ticket.state}
            onChange={(e) => {
              setTicket({ ...ticket, state: e.target.value });
            }}
          />
          <TextField
            id="summary"
            label="Summary"
            value={ticket.summary}
            onChange={(e) => {
              setTicket({ ...ticket, summary: e.target.value });
            }}
          />
          <TextField
            id="causingCI"
            label="Causing CI"
            value={ticket.causingCI}
            onChange={(e) => {
              setTicket({ ...ticket, causingCI: e.target.value });
            }}
          />
          <TextField
            id="assignedTo"
            label="Assigned to"
            value={ticket.assignedTo}
            onChange={(e) => {
              setTicket({ ...ticket, assignedTo: e.target.value });
            }}
          />
          <TextField
            id="openDate"
            label="Open date"
            value={ticket.openDate}
            helperText="AAAA-MM-DD"
            onChange={(e) => {
              setTicket({ ...ticket, openDate: e.target.value });
            }}
          />
          <TextField
            id="assignedDate"
            label="Assigned date"
            value={ticket.assignedDate}
            helperText="AAAA-MM-DD"
            onChange={(e) => {
              setTicket({ ...ticket, assignedDate: e.target.value });
            }}
          />
          <TextField
            id="resolutionDate"
            label="Resolution date"
            value={ticket.resolutionDate}
            helperText="AAAA-MM-DD"
            onChange={(e) => {
              setTicket({ ...ticket, resolutionDate: e.target.value });
            }}
          />
          <TextField
            id="closedDate"
            label="Closed date"
            value={ticket.closedDate}
            helperText="AAAA-MM-DD"
            onChange={(e) => {
              setTicket({ ...ticket, closedDate: e.target.value });
            }}
          />
          <TextField
            id="scalationDate"
            label="Scalation date"
            value={ticket.scalationDate}
            helperText="AAAA-MM-DD"
            onChange={(e) => {
              setTicket({ ...ticket, scalationDate: e.target.value });
            }}
          />
          <TextField
            id="notes"
            label="Notes"
            value={ticket.notes}
            onChange={(e) => {
              setTicket({ ...ticket, notes: e.target.value });
            }}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}
