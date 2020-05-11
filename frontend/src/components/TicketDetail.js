import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

export default function TicketDetail({ match }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    try {
      const data = await fetch(`http://localhost:8000/api/ticket-detail/${match.params.id}/`);
      const item = await data.json();
      console.log(item);
      setIsLoaded(true);
      setItem(item);
    } catch(err) {
      setIsLoaded(true);
      setError(error);
    }
  }

  useEffect(() => {
    fetchItem()
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    const { numberID, impactedUser, subclass, category, state, summary, causingCI,
    assignedTo, openDate, assignedDate, resolutionDate, closedDate, scalationDate, notes } = item;

    return (
      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}>
        
        <Grid item xs={6} style={{textAlign: 'right'}}>
          ID:
        </Grid>
        <Grid item xs={6}>
          {numberID}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Impacted User:
        </Grid>
        <Grid item xs={6}>
          {impactedUser}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Subclass: 
        </Grid>
        <Grid item xs={6}>
          {subclass}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Category:
        </Grid>
        <Grid item xs={6}>
          {category}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          State:
        </Grid>
        <Grid item xs={6}>
          {state}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Summary:
        </Grid>
        <Grid item xs={6}>
          {summary}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Causing CI:
        </Grid>
        <Grid item xs={6}>
          {causingCI}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Assigned To:
        </Grid>
        <Grid item xs={6}>
          {assignedTo}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Open Date:
        </Grid>
        <Grid item xs={6}>
          {openDate}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Assigned Date:
        </Grid>
        <Grid item xs={6}>
          {assignedDate}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Resolution Date:
        </Grid>
        <Grid item xs={6}>
          {resolutionDate}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Closed Date:
        </Grid>
        <Grid item xs={6}>
          {closedDate}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Scalation Date:
        </Grid>
        <Grid item xs={6}>
          {scalationDate}
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          Notes:
        </Grid>
        <Grid item xs={6}>
          {notes}
        </Grid>

      </Grid>
    );
  }
  
}