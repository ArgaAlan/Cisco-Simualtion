import React, { useReducer } from 'react';
import axios from 'axios';

import TicketContext from './ticketContext';
import TicketReducer from './ticketReducer';

import { GET_TICKETS, GET_TICKET, SET_LOADING } from '../types';

const TicketState = props => {
  const initialState = {
    tickets: [],
    ticket: {},
    loading: false
  }

  const [state, dispatch] = useReducer(TicketReducer, initialState);

  // Submit a ticket


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
      getTickets,
      getTicket
    }}>
      {props.children}

    </TicketContext.Provider>
}

export default TicketState;