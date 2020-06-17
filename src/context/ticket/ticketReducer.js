import { 
  GET_TICKETS, 
  GET_TICKET, 
  SET_LOADING,
  POST_TICKET,
  PUT_TICKET,
  DELETE_TICKET
} from '../types';  

export default (state, action) => {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false
      }
    
    case GET_TICKET:
      return {
        ...state,
        ticket: action.payload,
        loading: false
      }

    case POST_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
        loading: false
      }

    case PUT_TICKET:

      const updatedTicket = action.payload

      const updatedTickets = state.tickets.map(ticket => {
        if (ticket._id === updatedTicket._id) {
          return updatedTicket;
        }
        return ticket;
      });

      return {
        ...state,
        tickets: updatedTickets,
        ticket: updatedTicket,
        loading: false
      }

    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket._id !== action.payload),
        ticket: null,
        loading: false
      }
    
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    
    default:
      return state;
  }
}