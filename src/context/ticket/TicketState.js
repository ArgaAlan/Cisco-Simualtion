import React, { useReducer } from 'react';
import axios from 'axios';

import TicketContext from './ticketContext';
import TicketReducer from './ticketReducer';

import { 
  GET_TICKETS, 
  GET_TICKET, 
  SET_LOADING,
  POST_TICKET,
  PUT_TICKET,
  DELETE_TICKET
} from '../types';

const TicketState = props => {
  const initialState = {
    tickets: [],
    ticket: {},
    loading: false,
    response: {}
  }

  const [state, dispatch] = useReducer(TicketReducer, initialState);

  // Submit a ticket
  const postTicket = async (ticket) => {
    console.log(JSON.stringify(ticket));
    setLoading();
    var url = "https://cisco-project.herokuapp.com/api/tickets";
    const post = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    dispatch({
      type: POST_TICKET,
      payload: post
    });
      
  }


  // Get all tickets
  const getTickets = async () => {

    setLoading(); // Sets loading to true

    const res = await axios.get('https://cisco-project.herokuapp.com/api/tickets');

    dispatch({
      type: GET_TICKETS,
      payload: res.data
    });
    

  }

  // Get single ticket
  const getTicket = async (ticketId) => {

    setLoading();
    const res = await axios.get(`https://cisco-project.herokuapp.com/api/tickets/${ticketId}`);

    console.log(res.data);

    dispatch({
      type: GET_TICKET,
      payload: res.data
    });
  }

  // Update Ticket

  // Delete Tickets

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return <TicketContext.Provider
    value={{
      tickets: state.tickets,
      ticket: state.ticket,
      loading: state.loading,
      response: state.response,
      getTickets,
      getTicket,
      postTicket,
    }}>
      {props.children}

    </TicketContext.Provider>
}

export default TicketState;