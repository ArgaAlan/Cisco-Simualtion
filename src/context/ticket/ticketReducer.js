import { GET_TICKETS, GET_TICKET, SET_LOADING } from '../types';  

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
        // user: action.payload.user
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