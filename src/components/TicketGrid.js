import React, { useState, useEffect, useContext } from "react";
import Report from "./Report";

import TicketContext from '../context/ticket/ticketContext';

export default function Tickets() {
  const ticketContext = useContext(TicketContext);

  const { tickets, getTickets, loading } = ticketContext;
  
  useEffect(() => {
    getTickets();
  }, []);
  
  if(loading){
    return ( <div>Loading...</div> );
  } else {
    return ( <Report tickets={tickets}/> );
  } 
  
}
