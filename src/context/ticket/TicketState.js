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
    setLoading();
    const url = "https://cisco-project.herokuapp.com/api/tickets";
    const res = await axios.post(url, ticket);

    dispatch({
      type: POST_TICKET,
      payload: res.data
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

    dispatch({
      type: GET_TICKET,
      payload: res.data
    });
  }

  // Update Ticket
  const putTicket = async (ticket) => {

    setLoading();
    const url = `https://cisco-project.herokuapp.com/api/tickets/${ticket._id}`;
    const updatedTicket = await axios.put(url, ticket);

    dispatch({
      type: PUT_TICKET,
      payload: ticket
    });
  }

  // Delete Tickets
  const deleteTicket = async (ticketId) => {
    setLoading();
    const url = `https://cisco-project.herokuapp.com/api/tickets/${ticketId}`;
    const deleted = await axios.delete(url);

    console.log(deleted);

    dispatch({
      type: DELETE_TICKET,
      payload: ticketId
    });

  }

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
      putTicket,
      deleteTicket
    }}>
      {props.children}

    </TicketContext.Provider>
}

export default TicketState;