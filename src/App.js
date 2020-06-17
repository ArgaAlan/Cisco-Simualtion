import React from 'react';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './App.css';
import SignIn from "./components/SignIn"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TicketState from './context/ticket/TicketState';

function App() {
  return (
    <TicketState>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/signin/" component={SignIn}></Route>
            <Route path="/" component={Dashboard}></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </TicketState>
  );
}

export default App;
