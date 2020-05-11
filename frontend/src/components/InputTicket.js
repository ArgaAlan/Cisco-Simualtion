import React, { useState } from "react";
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

export default function FormPropsTextFields() {
  const classes = useStyles();

  const [id, setId] = useState("");
  const [impactedUser, setImpactedUser] = useState("");
  const [subclass, setSubclass] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [summary, setSummary] = useState("");
  const [causingCI, setCausingCI] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [resolutionDate, setResolutionDate] = useState("");
  const [closedDate, setClosedDate] = useState("");
  const [escalationDate, setEscalationDate] = useState("");
  const [notes, setNotes] = useState("");
  const [ticket, setTicket] = useState({
    numberID: null,
    impactedUser: "",
    subclass: "",
    category: "",
    state: "",
    summary: "",
    causingCI: "",
    assignadTo: "",
    openDate: "",
    assignedDate: "",
    resolutionDate: "",
    closedDate: "",
    escalationDate: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) return;

    console.log(JSON.stringify(ticket));

    var url = "http://localhost:8000/api/ticket-create/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
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

    setId("");
    setSubclass("");
    setCategory("");
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
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setTicket({ ...ticket, numberID: e.target.value });
            }}
          />
          <TextField
            id="impactedUser"
            label="Impacted User"
            value={impactedUser}
            onChange={(e) => {
              setImpactedUser(e.target.value);
              setTicket({ ...ticket, impactedUser: e.target.value });
            }}
          />
          <TextField
            id="subclass"
            label="Subclass"
            value={subclass}
            onChange={(e) => {
              setSubclass(e.target.value);
              setTicket({ ...ticket, subclass: e.target.value });
            }}
          />
          <TextField
            id="category"
            label="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setTicket({ ...ticket, category: e.target.value });
            }}
          />
          <TextField
            id="state"
            label="State"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setTicket({ ...ticket, state: e.target.value });
            }}
          />
          <TextField
            id="summary"
            label="Summary"
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
              setTicket({ ...ticket, summary: e.target.value });
            }}
          />
          <TextField
            id="causingCI"
            label="Causing CI"
            value={causingCI}
            onChange={(e) => {
              setCausingCI(e.target.value);
              setTicket({ ...ticket, causingCI: e.target.value });
            }}
          />
          <TextField
            id="assignedTo"
            label="Assigned to"
            value={assignedTo}
            onChange={(e) => {
              setAssignedTo(e.target.value);
              setTicket({ ...ticket, assignedTo: e.target.value });
            }}
          />
          <TextField
            id="openDate"
            label="Open date"
            value={openDate}
            onChange={(e) => {
              setOpenDate(e.target.value);
              setTicket({ ...ticket, openDate: e.target.value });
            }}
          />
          <TextField
            id="assignedDate"
            label="Assigned date"
            value={assignedDate}
            onChange={(e) => {
              setAssignedDate(e.target.value);
              setTicket({ ...ticket, assignedDate: e.target.value });
            }}
          />
          <TextField
            id="resolutionDate"
            label="Resolution date"
            value={resolutionDate}
            onChange={(e) => {
              setResolutionDate(e.target.value);
              setTicket({ ...ticket, resolutionDate: e.target.value });
            }}
          />
          <TextField
            id="closedDate"
            label="Closed date"
            value={closedDate}
            onChange={(e) => {
              setClosedDate(e.target.value);
              setTicket({ ...ticket, closedDate: e.target.value });
            }}
          />
          <TextField
            id="escalationDate"
            label="Escalation date"
            value={escalationDate}
            onChange={(e) => {
              setEscalationDate(e.target.value);
              setTicket({ ...ticket, escalationDate: e.target.value });
            }}
          />
          <TextField
            id="notes"
            label="Notes"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
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
